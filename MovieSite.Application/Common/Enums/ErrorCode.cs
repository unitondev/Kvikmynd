namespace MovieSite.Application.Common.Enums
{
    public enum ErrorCode
    {
        EntityNotCreated = 1000,
        EntityNotUpdated = 1001,
        EntityNotDeleted = 1002,
        UserAlreadyExists = 1003,
        UserNotFound = 1004,
        UserNotCreated = 1005,
        UserNotDeleted = 1006,
        UserNotUpdated = 1007,
        PasswordIsNotCorrect = 1008,
        AccessTokenNotFound = 1009,
        AccessTokenIsNotActive = 1010,
        
        MovieAlreadyExists = 1011,
        MovieNotFound = 1012,
        GenreNotFound = 1013,
        MovieRatingNotFound = 1014,
        MovieNotDeleted = 1015,
        PasswordSpacesAtTheBeginningOrAtTheEnd = 1016,
        ErrorWhileSettingRefreshToken = 1017,
        RefreshTokenNotFound = 1018,
        UserRatingNotFound = 1019,
    }
}