﻿using System.ComponentModel.DataAnnotations;

namespace ProductCatalog.Domain.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }

        public ICollection<CartItem> CartItems { get; set; }
    }
}
