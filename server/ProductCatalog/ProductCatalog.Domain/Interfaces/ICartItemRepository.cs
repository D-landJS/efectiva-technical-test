using ProductCatalog.Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ProductCatalog.Domain.Interfaces
{
    public interface ICartItemRepository : IRepository<CartItem>
    {
        Task<List<CartItem>> GetAllForUser(int userId);
        Task<CartItem> GetById(int id);

        Task<CartItem> GetByProductAndUser(int userId, int productId);

        Task Create(CartItem entity);
        Task Remove(int id);
        Task Update(CartItem entity);
        Task Save();
    }
}
