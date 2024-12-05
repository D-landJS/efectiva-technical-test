using Microsoft.AspNetCore.Mvc;
using ProductCatalog.API.Requests;
using ProductCatalog.Application.Services;
using ProductCatalog.Domain.Entities;
using System.Net;

namespace ProductCatalog.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private APIResponse _apiResponse;

        public AuthController(AuthService authService)
        {
            _authService = authService;
            _apiResponse = new APIResponse();
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = new User
                {
                    Username = request.Username,
                    Password = request.Password
                };

                var token = await _authService.Login(user);

                if (string.IsNullOrEmpty(token))
                {
                    _apiResponse.StatusCode = HttpStatusCode.Unauthorized;
                    _apiResponse.IsSuccessfull = false;
                    _apiResponse.ErrorMessages = new List<string> { "Invalid credentials" };
                    return Unauthorized(_apiResponse);
                }

                _apiResponse.StatusCode = HttpStatusCode.OK;
                _apiResponse.IsSuccessfull = true;
                _apiResponse.Result = new { Token = token }; 
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

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var user = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    Password = request.Password
                };

                var result = await _authService.Register(user);

                if (!result)
                {
                    _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                    _apiResponse.IsSuccessfull = false;
                    _apiResponse.ErrorMessages = new List<string> { "Registration failed" };
                    return BadRequest(_apiResponse);
                }

                _apiResponse.StatusCode = HttpStatusCode.Created;
                _apiResponse.IsSuccessfull = true;
                return CreatedAtAction(nameof(Register), _apiResponse);
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
