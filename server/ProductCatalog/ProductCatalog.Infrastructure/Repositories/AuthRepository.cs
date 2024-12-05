using ProductCatalog.Infrastructure.Data;
using ProductCatalog.Domain.Interfaces;
using ProductCatalog.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ProductCatalog.Infrastructure.Repositories
{
    public class AuthRepository : IAuthRepository
    {

        private readonly ApplicationDbContext _dbContext;


        public AuthRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> Login(User user)
        {
            return await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Username == user.Username || u.Email == user.Username);
        }

        public async Task Register(User user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
        }

    }
}