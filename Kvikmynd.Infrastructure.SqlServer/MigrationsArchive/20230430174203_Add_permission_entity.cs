using System.Collections.Generic;
using Kvikmynd.Domain;
using Kvikmynd.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Kvikmynd.Infrastructure.SqlServer.Migrations
{
    /// <inheritdoc />
    public partial class Add_permission_entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationPermissionEntityApplicationRole",
                columns: table => new
                {
                    PermissionsId = table.Column<int>(type: "int", nullable: false),
                    RolesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationPermissionEntityApplicationRole", x => new { x.PermissionsId, x.RolesId });
                    table.ForeignKey(
                        name: "FK_ApplicationPermissionEntityApplicationRole_AspNetRoles_RolesId",
                        column: x => x.RolesId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApplicationPermissionEntityApplicationRole_Permissions_PermissionsId",
                        column: x => x.PermissionsId,
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationPermissionEntityApplicationRole_RolesId",
                table: "ApplicationPermissionEntityApplicationRole",
                column: "RolesId");

            migrationBuilder.CreatePermissionsRange(new List<ApplicationPermission>()
                { ApplicationPermission.All, ApplicationPermission.AddMovie, ApplicationPermission.EditMovie });
            
            migrationBuilder.GrantPermission(ApplicationPermission.All, Role.SystemAdmin);
            migrationBuilder.GrantPermissionsRange(
                new List<ApplicationPermission>() { ApplicationPermission.AddMovie, ApplicationPermission.EditMovie },
                Role.Admin);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationPermissionEntityApplicationRole");

            migrationBuilder.DropTable(
                name: "Permissions");
        }
    }
}
