using Microsoft.EntityFrameworkCore.Migrations;

namespace MovieSite.Infrastructure.Migrations
{
    public partial class Deleted_replacedBy_field_in_refreshToken : Migration
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
