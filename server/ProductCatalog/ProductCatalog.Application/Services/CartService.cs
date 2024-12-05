using ProductCatalog.Application.DTOs;
using ProductCatalog.Domain.Entities;
using ProductCatalog.Domain.Interfaces;

public class CartService
{
    private readonly ICartItemRepository _cartItemRepository;
    private readonly IProductRepository _productRepository;
    private readonly IUserService _userService;

    public CartService(ICartItemRepository cartItemRepository, IProductRepository productRepository, IUserService userService)
    {
        _cartItemRepository = cartItemRepository;
        _productRepository = productRepository;
        _userService = userService;
    }

    public async Task<List<CartItemDto>> GetCartItems()
    {
        var userId = _userService.GetCurrentUserId();

        var cartItems = await _cartItemRepository.GetAllForUser(userId);

        var cartItemDtos = new List<CartItemDto>();

        foreach (var cartItem in cartItems)
        {
            var product = await _productRepository.GetById(cartItem.ProductId);

            if (product != null)
            {
                cartItemDtos.Add(new CartItemDto
                {
                    Id = cartItem.Id,
                    ProductId = cartItem.ProductId,
                    Quantity = cartItem.Quantity,
                    TotalPrice = cartItem.TotalPrice,
                    ProductName = product.Name,
                    ProductDescription = product.Description,  
                    ProductPrice = product.Price,
                    ProductImageUrl = product.ImageUrl
                });
            }
        }

        return cartItemDtos;
    }


    public async Task AddCartItem(int productId, int quantity)
    {
        var userId = _userService.GetCurrentUserId();
        var product = await _productRepository.GetById(productId);

        if (product == null)
        {
            throw new Exception("Product not found.");
        }

        var existingCartItem = await _cartItemRepository.GetByProductAndUser(userId, productId);

        if (existingCartItem != null)
        {
            existingCartItem.Quantity += quantity;
            existingCartItem.TotalPrice = existingCartItem.Quantity * product.Price;

            await _cartItemRepository.Update(existingCartItem); 
        }
        else
        {
            var cartItem = new CartItem
            {
                ProductId = productId,
                Quantity = quantity,
                TotalPrice = quantity * product.Price,
                UserId = userId
            };

            await _cartItemRepository.Create(cartItem);
        }
    }


    public async Task RemoveCartItem(int id)
    {
        var userId = _userService.GetCurrentUserId(); 
        var cartItem = await _cartItemRepository.GetById(id);

        if (cartItem == null || cartItem.UserId != userId)
        {
            throw new Exception("Cart item not found.");
        }

        await _cartItemRepository.Remove(id);
    }
}
