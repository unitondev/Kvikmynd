using System.Net.Mail;
using System.Threading.Tasks;

namespace Kvikmynd.Application.Interfaces.Services
{
    public interface IEmailService
    {
        Task<bool> SendMailAsync(MailMessage message);
    }
}