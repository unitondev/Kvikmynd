using System;
using System.Collections.Generic;
using System.Linq;
using Kvikmynd.Domain;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Kvikmynd.Infrastructure.SqlServer.Extensions;

public static class MigrationBuilderExtensions
{
    public static void CreatePermission(this MigrationBuilder builder,
        ApplicationPermission permissionId)
    {
        builder.InsertData(
            table: "Permissions",
            columns: new[] { "Id", "Name" },
            values: new object[,]
            {
                { Convert.ToInt32(permissionId), permissionId.ToString() },
            });
    }
    
    public static void DeletePermission(this MigrationBuilder builder,
        ApplicationPermission permissionId)
    {
        builder.DeleteData(table: "Permissions", keyColumn: "Id", keyValue: Convert.ToInt32(permissionId));
    }
    
    public static void CreatePermissionsRange(this MigrationBuilder builder,
        IList<ApplicationPermission> permissionIds)
    {
        var values = new object[permissionIds.Count, 2];
        for (var i = 0; i < permissionIds.Count; i++)
        {
            values[i, 0] = Convert.ToInt32(permissionIds[i]);
            values[i, 1] = permissionIds[i].ToString();
        }
        
        builder.InsertData(
            table: "Permissions",
            columns: new[] { "Id", "Name" },
            values: values);
    }
    
    public static void DeletePermissionsRange(this MigrationBuilder builder,
        IEnumerable<ApplicationPermission> permissionIds)
    {
        builder.DeleteData(table: "Permissions", keyColumn: "Id", keyValues: permissionIds.Cast<object>().ToArray());
    }

    public static void GrantPermission(this MigrationBuilder builder, ApplicationPermission permissionId, Role roleId)
    {
        builder.InsertData(
            table: "ApplicationPermissionEntityApplicationRole",
            columns: new[] { "PermissionsId", "RolesId" },
            values: new object[,]
            {
                { Convert.ToInt32(permissionId), Convert.ToInt32(roleId) }
            });
    }
    
    public static void GrantPermission(this MigrationBuilder builder, ApplicationPermission permissionId, IList<Role> roleIds)
    {
        var values = new object[roleIds.Count, 2];
        for (var i = 0; i < roleIds.Count; i++)
        {
            values[i, 0] = Convert.ToInt32(permissionId);
            values[i, 1] = Convert.ToInt32(roleIds[i]);
        }
        
        builder.InsertData(
            table: "ApplicationPermissionEntityApplicationRole",
            columns: new[] { "PermissionsId", "RolesId" },
            values: values);
    }

    public static void GrantPermissionsRange(this MigrationBuilder builder, IList<ApplicationPermission> permissionIds,
        Role roleId)

    {
        var values = new object[permissionIds.Count, 2];
        for (var i = 0; i < permissionIds.Count; i++)
        {
            values[i, 0] = Convert.ToInt32(permissionIds[i]);
            values[i, 1] = Convert.ToInt32(roleId);
        }
        
        builder.InsertData(
            table: "ApplicationPermissionEntityApplicationRole",
            columns: new[] { "PermissionsId", "RolesId" },
            values: values);
    }
}