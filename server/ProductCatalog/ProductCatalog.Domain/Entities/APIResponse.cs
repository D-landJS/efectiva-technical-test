using System.Net;

namespace ProductCatalog.Domain.Entities
{
    public class APIResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccessfull { get; set; } = true;

        public List<string>? ErrorMessages { get; set; }

        public object? Result { get; set; }
    }
}
