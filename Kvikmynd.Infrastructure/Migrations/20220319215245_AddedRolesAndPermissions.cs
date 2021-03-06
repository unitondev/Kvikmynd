using System.Collections.Generic;
using Kvikmynd.Domain;
using Kvikmynd.Domain.Models;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Kvikmynd.Infrastructure.Migrations
{
    public partial class AddedRolesAndPermissions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var applicationRoles = new List<Roles>
            {
                Roles.SystemAdmin,
                Roles.Admin,
                Roles.User,
            };

            foreach (var applicationRole in applicationRoles)
            {
                migrationBuilder.Sql(@$"SET IDENTITY_INSERT AspNetRoles ON
                insert into AspNetRoles (Id, Name, NormalizedName) values ({(int) applicationRole}, '{applicationRole.ToString()}', '{applicationRole.ToString().ToUpper()}')
                SET IDENTITY_INSERT AspNetRoles OFF");
            }

            var applicationRolesClaims = new Dictionary<Roles, ApplicationPermissions[]>
            {
                { Roles.SystemAdmin, new [] {
                    ApplicationPermissions.All,
                } },
                { Roles.Admin, new [] {
                    ApplicationPermissions.AddMovie,
                    ApplicationPermissions.EditMovie,
                } },
            };

            foreach (var (role, permissions) in applicationRolesClaims)
            {
                foreach (var permission in permissions)
                {
                    migrationBuilder.Sql($"insert into AspNetRoleClaims (RoleId, ClaimType, ClaimValue) values ('{(int) role}', 'Permission', '{permission.ToString()}')");
                }
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var applicationRoles = new List<Roles>
            {
                Roles.SystemAdmin,
                Roles.Admin,
                Roles.User,
            };

            foreach (var applicationRole in applicationRoles)
            {
                migrationBuilder.Sql($"delete from AspNetRoles where Id = {(int) applicationRole}");
            }
            
            var applicationRolesClaims = new Dictionary<Roles, ApplicationPermissions[]>
            {
                { Roles.SystemAdmin, new [] {
                    ApplicationPermissions.All,
                } },
                { Roles.Admin, new [] {
                    ApplicationPermissions.AddMovie,
                    ApplicationPermissions.EditMovie,
                } },
            };
            
            foreach (var (role, permissions) in applicationRolesClaims)
            {
                foreach (var permission in permissions)
                {
                    migrationBuilder.Sql(@$"delete from AspNetRoleClaims where RoleId = {(int) role} and ClaimValue = '{permission.ToString()}'");
                }
            }
        }
    }
}
