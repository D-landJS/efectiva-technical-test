using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ProductCatalog.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class newfores2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CartItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartItems_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Disco duro externo portátil de 4TB compatible con PlayStation 4. Ideal para almacenar juegos y contenido multimedia.", "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg", "Disco Duro Externo WD 4TB para PS4", 119.99m },
                    { 2, "Monitor curvado de 49 pulgadas con pantalla ultrapanorámica y frecuencia de actualización de 144Hz, ideal para juegos y productividad.", "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", "Monitor Curvo Samsung 49' QLED para Juegos", 999.99m },
                    { 3, "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", 109.95m },
                    { 4, "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "Mens Casual Premium Slim Fit T-Shirts", 22.30m },
                    { 5, "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions like hiking, camping, and more.", "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", "Mens Cotton Jacket", 55.99m },
                    { 6, "The color could be slightly different between on the screen and in practice.", "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", "Mens Casual Slim Fit", 15.99m },
                    { 7, "Inspired by the mythical water dragon that protects the ocean's pearl.", "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg", "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet", 695.00m },
                    { 8, "Satisfaction Guaranteed. Return or exchange any order within 30 days.", "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg", "Solid Gold Petite Micropave", 168.00m },
                    { 9, "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.", "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", "White Gold Plated Princess", 9.99m },
                    { 10, "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel.", "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg", "Pierced Owl Rose Gold Plated Stainless Steel Double", 10.99m },
                    { 11, "USB 3.0 and USB 2.0 Compatibility. Fast data transfers and high capacity.", "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg", "WD 2TB Elements Portable External Hard Drive - USB 3.0", 64.00m },
                    { 12, "Easy upgrade for faster boot up, shutdown, application load and response.", "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg", "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s", 109.00m },
                    { 13, "Remarkable transfer speeds and improved overall system performance.", "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg", "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5", 109.00m },
                    { 14, "Expand your PS4 gaming experience with high capacity and fast setup.", "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg", "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive", 114.00m },
                    { 15, "Full HD widescreen IPS display with Radeon FreeSync technology.", "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg", "Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin Monitor", 599.00m },
                    { 16, "144Hz curved super ultrawide monitor with QLED technology.", "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", "Samsung 49-Inch Curved Gaming Monitor", 999.99m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_ProductId",
                table: "CartItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_UserId",
                table: "CartItems",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartItems");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
