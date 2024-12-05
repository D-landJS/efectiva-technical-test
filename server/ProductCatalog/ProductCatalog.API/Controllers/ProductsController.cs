using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Application.Services;
using ProductCatalog.Domain.Entities;
using System.Net;

namespace ProductCatalog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;
        private APIResponse _apiResponse;

        public ProductsController(ProductService productService)
        {
            _productService = productService;
            _apiResponse = new APIResponse();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await _productService.GetAllProducts();
                _apiResponse.StatusCode = HttpStatusCode.OK;
                _apiResponse.IsSuccessfull = true;
                _apiResponse.Result = products;

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
    }
}
