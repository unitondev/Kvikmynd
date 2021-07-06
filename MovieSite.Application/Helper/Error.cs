namespace MovieSite.Application.Helper
{
    public static class Error
    {
        public static readonly string UserNotFound = "User not found";
        public static readonly string UserAlreadyExists  = "User already exists";
        public static readonly string ModelIsInvalid  = "Model is invalid";
        public static readonly string TokenNotFound= "Token not found";
        public static readonly string TokenIsNotActive= "Token is not active";
        public static readonly string ErrorWhileSettingRefreshToken = "Error while setting refresh token";
        public static readonly string PasswordIsNotCorrect = "Password is not correct";
    }
}