using Microsoft.EntityFrameworkCore;
using ProductCatalog.Domain.Entities;
using ProductCatalog.Domain.Interfaces;
using ProductCatalog.Infrastructure.Data;

namespace ProductCatalog.Infrastructure.Repositories
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public CartItemRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<CartItem>> GetAll()
        {
            return await _dbContext.CartItems.ToListAsync();
        }

        public async Task<List<CartItem>> GetAllForUser(int userId)
        {
            return await _dbContext.CartItems.Where(ci => ci.UserId == userId).ToListAsync();
        }
        public async Task<CartItem> GetById(int id)
        {
            return await _dbContext.CartItems.FirstOrDefaultAsync(ci => ci.Id == id);
        }


        public async Task Create(CartItem entity)
        {
            await _dbContext.CartItems.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Remove(int id)
        {
            var cartItem = await _dbContext.CartItems.FirstOrDefaultAsync(ci => ci.Id == id);

            if (cartItem != null)
            {
                _dbContext.CartItems.Remove(cartItem);
                await Save();
            }
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<CartItem> GetByProductAndUser(int userId, int productId)
        {
            return await _dbContext.CartItems
                .FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ProductId == productId);
        }


        public async Task Update(CartItem entity)
        {
            _dbContext.CartItems.Update(entity);
            await Save();
        }
    }
}