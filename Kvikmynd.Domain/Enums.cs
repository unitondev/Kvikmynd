namespace Kvikmynd.Domain
{
    public enum Role
    {
        SystemAdmin = 1,
        Admin,
        User,
    }

    public enum ApplicationPermission
    {
        All = 1,
        AddMovie,
        EditMovie,
    }
}