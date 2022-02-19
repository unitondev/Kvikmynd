using Microsoft.EntityFrameworkCore.Migrations;

namespace MovieSite.Infrastructure.Migrations
{
    public partial class Deleted_ReplacedBy_Field_In_RefreshToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReplacedByToken",
                table: "RefreshToken");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReplacedByToken",
                table: "RefreshToken",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
