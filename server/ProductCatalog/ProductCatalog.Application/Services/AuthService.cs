using ProductCatalog.Domain.Entities;
using ProductCatalog.Domain.Interfaces;

namespace ProductCatalog.Application.Services
{
    public class AuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly TokenService _tokenService;

        public AuthService(IAuthRepository authRepository, TokenService tokenService)
        {
            _authRepository = authRepository;
            _tokenService = tokenService;
        }

        public async Task<bool> Register(User user)
        {
            try
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                await _authRepository.Register(user);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<string> Login(User user)
        {
            var existingUser = await _authRepository.Login(user);

            if (existingUser == null)
            {
                throw new Exception("Invalid username or password");
            }

            if (!BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password))
            {
                throw new Exception("Invalid username or password");
            }

            var token = _tokenService.GenerateToken(existingUser);

            return token;
        }
    }
}
