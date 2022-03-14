using System.ComponentModel.DataAnnotations;
using Kvikmynd.Application.Common.Enums;

namespace Kvikmynd.Application.Common.Models
{
    public class Error
    {
        [Required]
        public int Code { get; set; }
        [Required]
        public string Message { get; set; }
        
        public Error(ErrorCode code)
        {
            Code = (int)code;
            Message = GetDefaultMessageForErrorCode(code);
        }
        
        public static string GetDefaultMessageForErrorCode(ErrorCode errorCode)
        {
            return errorCode switch
            {
                #region General errors. Codes 1000-1099
                
                ErrorCode.Unspecified => "An unspecified error occurred.",
                ErrorCode.Unauthorized => "Unauthorized.",
                ErrorCode.NotFound => "Resource not found.",
                ErrorCode.ModelInvalid => "Invalid request model.",
                ErrorCode.InternalServerError => "An unhandled exception thrown.",
                ErrorCode.EntityNotCreated => "Entity wasn't created.",
                ErrorCode.EntityNotUpdated => "Entity wasn't updated.",
                ErrorCode.EntityNotDeleted => "Entity wasn't deleted.",
                ErrorCode.SearchQueryIsEmpty => "Search query is empty.",
                ErrorCode.EmailWasNotSent => "Email was not sent",
                
                #endregion
                
                #region User errors. Codes 1100-1199
                
                ErrorCode.UserNotFound => "User not found.",
                ErrorCode.UserNotCreated => "User wasn't created.",
                ErrorCode.UserNotDeleted => "User wasn't deleted.",
                ErrorCode.UserNotUpdated => "User wasn't updated.",
                ErrorCode.UserAlreadyExists => "User already exists.",
                ErrorCode.PasswordIsNotCorrect => "User password is incorrect.",
                ErrorCode.AccessTokenNotFound => "Access token not found.",
                ErrorCode.AccessTokenIsNotActive => "Access token isn't active.",
                ErrorCode.PasswordSpacesAtTheBeginningOrAtTheEnd => "There should be no spaces at the beginning and at the end of the password.",
                ErrorCode.RefreshTokenNotFound => "Refresh token not found.",
                ErrorCode.ErrorWhileSettingRefreshToken => "An error occurred while refresh token setting.",
                ErrorCode.CredentialsInvalid => "User credentials are invalid.",
                ErrorCode.CurrentPasswordIncorrect => "Current password incorrect.",
                ErrorCode.NewPasswordCanNotMatсhCurrentPassword => "New password can't matсh current password.",
                ErrorCode.PasswordNotChanged => "Password wasn't changed.",
                ErrorCode.PasswordWasNotReseted => "Password wasn't reseted.",
                ErrorCode.UserRegistrationAlreadyConfirmed => "User registration already confirmed.",
                ErrorCode.RegisterConfirmationFailed => "Register confirmation failed.",
                
                #endregion
                
                #region Movie errors. Codes 1200-1249
                
                ErrorCode.MovieAlreadyExists => "Movie already exists.",
                ErrorCode.MovieNotFound => "Movie not found.",
                ErrorCode.MovieNotDeleted => "Movie wasn't deleted.",
                
                #endregion
                
                #region Genre errors. Codes 1250-1299
                
                ErrorCode.GenreNotFound => "Genre not found.",
                
                #endregion
                
                #region Movie rating errors. Codes 1300-1349
                
                ErrorCode.MovieRatingNotFound => "Movie rating not found.",
                ErrorCode.UserRatingNotFound => "User rating not found.",
                
                #endregion
                
                #region Comment errors. Codes 1350-1399

                ErrorCode.CommentNotCreated => "Comment wasn't created.",
                ErrorCode.CommentNotDeleted => "Comment wasn't deleted.",
                ErrorCode.CommentNotFound => "Comment not found.",

                #endregion

                _ => ""
            };
        }
    }
}