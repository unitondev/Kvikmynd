﻿namespace MovieSite.Application.Common.Enums
{
    public enum ErrorCode
    {
        #region General errors. Codes 1000-1099

        Unauthorized = 1000,
        NotFound = 1001,
        ModelInvalid = 1002,
        InternalServerError = 1003,
        EntityNotCreated = 1004,
        EntityNotUpdated = 1005,
        EntityNotDeleted = 1006,

        #endregion

        #region User errors. Codes 1100-1199

        UserNotFound = 1100,
        UserNotCreated = 1101,
        UserNotDeleted = 1102,
        UserNotUpdated = 1103,
        UserAlreadyExists = 1104,
        PasswordIsNotCorrect = 1105,
        AccessTokenNotFound = 1106,
        AccessTokenIsNotActive = 1107,
        PasswordSpacesAtTheBeginningOrAtTheEnd = 1108,
        RefreshTokenNotFound = 1109,
        ErrorWhileSettingRefreshToken = 1110,

        #endregion

        #region Movie errors. Codes 1200-1249

        MovieAlreadyExists = 1200,
        MovieNotFound = 1201,
        MovieNotDeleted = 1202,

        #endregion

        #region Genre errors. Codes 1250-1299

        GenreNotFound = 1250,

        #endregion

        #region Movie rating errors. Codes 1300-1349

        MovieRatingNotFound = 1300,
        UserRatingNotFound = 1301,

        #endregion

    }
}