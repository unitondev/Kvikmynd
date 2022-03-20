namespace Kvikmynd.Domain
{
    public enum Roles
    {
        SystemAdmin = 1,
        Admin,
        User,
    }

    public enum ApplicationPermissions
    {
        All = 1,
        AddMovie,
        EditMovie,
    }
}