using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Domain.Entities;
using System.Net;

public class CustomAuthorizeFilter : IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;
        if (user == null || !user.Identity.IsAuthenticated)
        {
            var apiResponse = new APIResponse
            {
                StatusCode = HttpStatusCode.Unauthorized,
                IsSuccessfull = false,
                Result = new
                {
                    message = "You are not authorized. Please provide a valid token."
                }
            };

            context.Result = new JsonResult(apiResponse)
            {
                StatusCode = 401
            };
        }
    }
}
