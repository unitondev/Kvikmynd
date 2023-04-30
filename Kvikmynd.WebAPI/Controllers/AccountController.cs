using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.EmailTemplates;
using Kvikmynd.Application.Common.Enums;
using Kvikmynd.Application.Interfaces.Services;
using Kvikmynd.Application.Models;
using Kvikmynd.Application.ViewModels;
using Kvikmynd.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Kvikmynd.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly ITokenService _tokenService;
        private readonly IFileUploadService _fileUploadService;

        public AccountController(
            IAccountService accountService,
            UserManager<User> userManager,
            IEmailService emailService,
            IConfiguration configuration,
            ITokenService tokenService,
            IFileUploadService fileUploadService
            ) : base(accountService)
        {
            _accountService = accountService;
            _userManager = userManager;
            _emailService = emailService;
            _configuration = configuration;
            _tokenService = tokenService;
            _fileUploadService = fileUploadService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _accountService.FindByIdAsync(id);
            if (result == null) return CustomNotFound(ErrorCode.UserNotFound);

            return Ok(result);
        }
        
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegistrationModel model)
        {
            if (model.Password.Trim().Length != model.Password.Length)
            {
                return CustomBadRequest(ErrorCode.PasswordSpacesAtTheBeginningOrAtTheEnd);
            }

            var result = await _accountService.RegisterAsync(model);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }

            var confirmEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(result.Result);
            
            var clientUrl = _configuration["ClientUrl"] + "/confirmEmail";
            var queryParams = new Dictionary<string, string>
            {
                {"token", confirmEmailToken},
                {"email", result.Result.Email}
            };
            
            var url = new Uri(QueryHelpers.AddQueryString(clientUrl, queryParams));
            var email = new MailMessage()
            {
                To = { new MailAddress(result.Result.Email) },
                Subject = "Email confirmation",
                Body = EmailTemplates.GetConfirmEmailTemplate(result.Result.UserName, url.ToString())
            };
            
            var emailResult = await _emailService.SendMailAsync(email);
            if (!emailResult) return CustomBadRequest(ErrorCode.EmailWasNotSent);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("email/confirm")]
        public async Task<IActionResult>ConfirmEmail([FromBody] ConfirmEmailModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return CustomNotFound(ErrorCode.UserNotFound);
            var isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user); 
            if (isEmailConfirmed) return CustomBadRequest(ErrorCode.UserRegistrationAlreadyConfirmed);

            var token = Uri.UnescapeDataString(model.Token);
            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded) return CustomBadRequest(ErrorCode.RegisterConfirmationFailed);
            
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Convert.ToString(user.Id))
            };
            
            var jwtResponseModel = _tokenService.GetJwtResponseModel(claims);

            return Ok(jwtResponseModel);
        }

        [AllowAnonymous]
        [HttpPost("logout")]
        public async Task<IActionResult> LogOut()
        {
            var userId = await GetUserIdAsync();
            await _accountService.LogOutAsync(userId.ToString());

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UpdateUserModel user)
        {
            var result = await _accountService.UpdateUserAsync(user);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }

            return Ok(result.Result);
        } 

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            var user = await GetUserAsync();

            await _fileUploadService.DeleteImageFromFirebaseAsync(user.AvatarUrl, "avatars");
            
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return CustomBadRequest(ErrorCode.UserNotDeleted);
            }

            return Ok();
        }

        [HttpPost("token/revoke")]
        public async Task<IActionResult> RevokeTokenAsync()
        {
            var revokedToken = Request.Cookies["refresh_token"];
            var result = await _accountService.RevokeTokenAsync(revokedToken);
            if (!result.IsSucceeded)
            {
                return CustomBadRequest(result.Error);
            }

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetMe()
        {
            var user = await GetUserAsync();
            var userViewModel = new UserViewModel(user, "");

            return Ok(userViewModel);
        }

        [HttpPut("password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangeUserPasswordModel model)
        {
            if (model.NewPassword.Trim().Length != model.NewPassword.Length)
            {
                return CustomBadRequest(ErrorCode.PasswordSpacesAtTheBeginningOrAtTheEnd);
            }


            var user = await GetUserAsync();

            if (_userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash,
                    model.CurrentPassword) == PasswordVerificationResult.Failed)
            {
                return CustomBadRequest(ErrorCode.CurrentPasswordIncorrect);
            }
            
            if (_userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash,
                model.NewPassword) == PasswordVerificationResult.Success)
            {
                return CustomBadRequest(ErrorCode.NewPasswordCanNotMatсhCurrentPassword);
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return CustomBadRequest(ErrorCode.PasswordNotChanged);
            }

            return NoContent();
        }

        [AllowAnonymous]
        [HttpPut("password/forgot")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return CustomNotFound(ErrorCode.UserNotFound);

            var passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            var clientUrl = _configuration["ClientUrl"] + "/resetPassword";
            var queryParams = new Dictionary<string, string>
            {
                {"token", passwordResetToken},
                {"email", user.Email}
            };

            var url = new Uri(QueryHelpers.AddQueryString(clientUrl, queryParams));
            var email = new MailMessage()
            {
                To = { new MailAddress(user.Email) },
                Subject = "Reset password",
                Body = EmailTemplates.GetResetPasswordTemplate(user.UserName, url.ToString())
            };

            var emailResult = await _emailService.SendMailAsync(email);
            if (!emailResult) return CustomBadRequest(ErrorCode.EmailWasNotSent);
            
            return Ok();
        }

        [AllowAnonymous]
        [HttpPut("password/reset")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return CustomNotFound(ErrorCode.UserNotFound);

            var token = Uri.UnescapeDataString(model.Token);
            var result = await _userManager.ResetPasswordAsync(user, token, model.Password);
            if (!result.Succeeded) return CustomBadRequest(ErrorCode.PasswordWasNotReseted);
            
            return Ok();
        }

        private bool SetRefreshTokenCookie(string refreshToken)
        {
            try
            {
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTimeOffset.Now.AddDays(7),
                };
                Response.Cookies.Append("refresh_token", refreshToken, cookieOptions);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}