using Microsoft.EntityFrameworkCore;
using ProductCatalog.Domain.Entities;

namespace ProductCatalog.Infrastructure.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
           .Property(p => p.Price)
           .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<CartItem>()
                .Property(c => c.TotalPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<CartItem>()
            .HasOne(c => c.Product)
            .WithMany(p => p.CartItems)
            .HasForeignKey(c => c.ProductId);

            modelBuilder.Entity<CartItem>()
                .HasOne(c => c.User)
                .WithMany(u => u.CartItems)
                .HasForeignKey(c => c.UserId);


            modelBuilder.Entity<Product>().HasData(
                new Product()
                {
                    Id = 1,
                    Name = "Disco Duro Externo WD 4TB para PS4",
                    Description = "Disco duro externo portátil de 4TB compatible con PlayStation 4. Ideal para almacenar juegos y contenido multimedia.",
                    Price = 119.99m,
                    ImageUrl = "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg"
                },
                new Product()
                {
                    Id = 2,
                    Name = "Monitor Curvo Samsung 49' QLED para Juegos",
                    Description = "Monitor curvado de 49 pulgadas con pantalla ultrapanorámica y frecuencia de actualización de 144Hz, ideal para juegos y productividad.",
                    Price = 999.99m,
                    ImageUrl = "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
                },

                new Product()
                {
                    Id = 3,
                    Name = "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    Description = "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    Price = 109.95m,
                    ImageUrl = "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                },
                new Product()
                {
                    Id = 4,
                    Name = "Mens Casual Premium Slim Fit T-Shirts",
                    Description = "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
                    Price = 22.30m,
                    ImageUrl = "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                },
                new Product()
                {
                    Id = 5,
                    Name = "Mens Cotton Jacket",
                    Description = "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions like hiking, camping, and more.",
                    Price = 55.99m,
                    ImageUrl = "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
                },
                new Product()
                {
                    Id = 6,
                    Name = "Mens Casual Slim Fit",
                    Description = "The color could be slightly different between on the screen and in practice.",
                    Price = 15.99m,
                    ImageUrl = "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
                },
                new Product()
                {
                    Id = 7,
                    Name = "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
                    Description = "Inspired by the mythical water dragon that protects the ocean's pearl.",
                    Price = 695.00m,
                    ImageUrl = "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
                },
                new Product()
                {
                    Id = 8,
                    Name = "Solid Gold Petite Micropave",
                    Description = "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
                    Price = 168.00m,
                    ImageUrl = "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
                },
                new Product()
                {
                    Id = 9,
                    Name = "White Gold Plated Princess",
                    Description = "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.",
                    Price = 9.99m,
                    ImageUrl = "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
                },
                new Product()
                {
                    Id = 10,
                    Name = "Pierced Owl Rose Gold Plated Stainless Steel Double",
                    Description = "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel.",
                    Price = 10.99m,
                    ImageUrl = "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
                },
                new Product()
                {
                    Id = 11,
                    Name = "WD 2TB Elements Portable External Hard Drive - USB 3.0",
                    Description = "USB 3.0 and USB 2.0 Compatibility. Fast data transfers and high capacity.",
                    Price = 64.00m,
                    ImageUrl = "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
                },
                new Product()
                {
                    Id = 12,
                    Name = "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
                    Description = "Easy upgrade for faster boot up, shutdown, application load and response.",
                    Price = 109.00m,
                    ImageUrl = "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
                },
                new Product()
                {
                    Id = 13,
                    Name = "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
                    Description = "Remarkable transfer speeds and improved overall system performance.",
                    Price = 109.00m,
                    ImageUrl = "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg"
                },
                new Product()
                {
                    Id = 14,
                    Name = "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
                    Description = "Expand your PS4 gaming experience with high capacity and fast setup.",
                    Price = 114.00m,
                    ImageUrl = "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg"
                },
                new Product()
                {
                    Id = 15,
                    Name = "Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin Monitor",
                    Description = "Full HD widescreen IPS display with Radeon FreeSync technology.",
                    Price = 599.00m,
                    ImageUrl = "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
                },
                new Product()
                {
                    Id = 16,
                    Name = "Samsung 49-Inch Curved Gaming Monitor",
                    Description = "144Hz curved super ultrawide monitor with QLED technology.",
                    Price = 999.99m,
                    ImageUrl = "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
                }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
