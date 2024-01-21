using System.Collections.Generic;
using Kvikmynd.Domain;
using Kvikmynd.Domain.Models;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Kvikmynd.Infrastructure.SqlServer.Migrations
{
    public partial class AddedRolesAndPermissions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var applicationRoles = new List<Role>
            {
                Role.SystemAdmin,
                Role.Admin,
                Role.User,
            };

            foreach (var applicationRole in applicationRoles)
            {
                migrationBuilder.Sql(@$"SET IDENTITY_INSERT AspNetRoles ON
                insert into AspNetRoles (Id, Name, NormalizedName) values ({(int) applicationRole}, '{applicationRole.ToString()}', '{applicationRole.ToString().ToUpper()}')
                SET IDENTITY_INSERT AspNetRoles OFF");
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var applicationRoles = new List<Role>
            {
                Role.SystemAdmin,
                Role.Admin,
                Role.User,
            };

            foreach (var applicationRole in applicationRoles)
            {
                migrationBuilder.Sql($"delete from AspNetRoles where Id = {(int) applicationRole}");
            }
        }
    }
}
