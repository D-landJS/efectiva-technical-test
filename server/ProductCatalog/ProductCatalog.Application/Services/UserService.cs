using Microsoft.AspNetCore.Http;
using System.Security.Claims;

public class UserService : IUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int GetCurrentUserId()
    {
        var claim = _httpContextAccessor.HttpContext.User.Claims
                    .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

        if (claim != null && int.TryParse(claim.Value, out int userId))
        {
            return userId;
        }

 
        throw new Exception("User ID not found or is invalid.");
    }
}
