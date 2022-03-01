using Microsoft.EntityFrameworkCore.Migrations;

namespace Kvikmynd.Infrastructure.Migrations
{
    public partial class ChangedMovieRatingStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieRating_Ratings_RatingId",
                table: "MovieRating");

            migrationBuilder.DropTable(
                name: "UserRating");

            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieRating",
                table: "MovieRating");

            migrationBuilder.DropIndex(
                name: "IX_MovieRating_RatingId",
                table: "MovieRating");

            migrationBuilder.RenameColumn(
                name: "RatingId",
                table: "MovieRating",
                newName: "Value");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "MovieRating",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieRating",
                table: "MovieRating",
                columns: new[] { "MovieId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_MovieRating_UserId",
                table: "MovieRating",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRating_AspNetUsers_UserId",
                table: "MovieRating",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieRating_AspNetUsers_UserId",
                table: "MovieRating");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieRating",
                table: "MovieRating");

            migrationBuilder.DropIndex(
                name: "IX_MovieRating_UserId",
                table: "MovieRating");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MovieRating");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "MovieRating",
                newName: "RatingId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieRating",
                table: "MovieRating",
                columns: new[] { "MovieId", "RatingId" });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserRating",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RatingId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRating", x => new { x.UserId, x.RatingId });
                    table.ForeignKey(
                        name: "FK_UserRating_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRating_Ratings_RatingId",
                        column: x => x.RatingId,
                        principalTable: "Ratings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MovieRating_RatingId",
                table: "MovieRating",
                column: "RatingId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRating_RatingId",
                table: "UserRating",
                column: "RatingId");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRating_Ratings_RatingId",
                table: "MovieRating",
                column: "RatingId",
                principalTable: "Ratings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
