using Microsoft.AspNetCore.Mvc;
using ProductCatalog.API.Requests;
using ProductCatalog.Domain.Entities;
using System.Net;

namespace ProductCatalog.API.Controllers
{
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;
        private APIResponse _apiResponse;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
            _apiResponse = new APIResponse();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ServiceFilter(typeof(CustomAuthorizeFilter))]
        public async Task<IActionResult> GetCartItems()
        {
            try
            {
                var cartItems = await _cartService.GetCartItems();
                _apiResponse.StatusCode = HttpStatusCode.OK;
                _apiResponse.IsSuccessfull = true;
                _apiResponse.Result = cartItems;

                return Ok(_apiResponse);
            }
            catch (Exception ex)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.IsSuccessfull = false;
                _apiResponse.ErrorMessages = new List<string> { ex.Message };

                return BadRequest(_apiResponse);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ServiceFilter(typeof(CustomAuthorizeFilter))]

        public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
        {
            try
            {
                await _cartService.AddCartItem(request.ProductId, request.Quantity);
                _apiResponse.StatusCode = HttpStatusCode.Created;
                _apiResponse.IsSuccessfull = true;
                _apiResponse.Result = request;

                return CreatedAtAction(nameof(GetCartItems), new { }, _apiResponse);
            }
            catch (Exception ex)
            {
                _apiResponse.StatusCode = HttpStatusCode.InternalServerError;
                _apiResponse.IsSuccessfull = false;
                _apiResponse.ErrorMessages = new List<string> { ex.Message };

                return StatusCode((int)HttpStatusCode.InternalServerError, _apiResponse);
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ServiceFilter(typeof(CustomAuthorizeFilter))]
        public async Task<IActionResult> RemoveCartItem(int id)
        {
            try
            {
                await _cartService.RemoveCartItem(id);

                _apiResponse.StatusCode = HttpStatusCode.OK;
                _apiResponse.IsSuccessfull = true;

                return Ok(_apiResponse);
            }
            catch (Exception ex)
            {
                _apiResponse.StatusCode = HttpStatusCode.InternalServerError;
                _apiResponse.IsSuccessfull = false;
                _apiResponse.ErrorMessages = new List<string> { ex.Message };

                return StatusCode((int)HttpStatusCode.InternalServerError, _apiResponse);
            }
        }

    }
}
