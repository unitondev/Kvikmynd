using System.Net.Mail;
using System.Threading.Tasks;
using Kvikmynd.Application.Common.Models;
using Kvikmynd.Application.Interfaces.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Kvikmynd.Application.Services
{
    public class SendGridEmailService : IEmailService
    {
        private readonly SendGridSettings _settings;

        public SendGridEmailService(IOptions<SendGridSettings> settings)
        {
            _settings = settings.Value;
        }
        
        public async Task<bool> SendMailAsync(MailMessage message)
        {
            var email = new SendGridMessage()
            {
                From = new EmailAddress(_settings.FromAddress, "Kvikmynd"),
                Subject = message.Subject,
                HtmlContent = $"<html>{message.Body}</html>"
            };
            
            email.AddTo(message.To.ToString());

            var client = new SendGridClient(_settings.ClientSecret);
            var result = await client.SendEmailAsync(email);

            return result.IsSuccessStatusCode;
        }
    }
}