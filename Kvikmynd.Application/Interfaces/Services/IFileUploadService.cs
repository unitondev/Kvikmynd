using System.IO;
using System.Threading.Tasks;

namespace Kvikmynd.Application.Interfaces.Services
{
    public interface IFileUploadService
    {
        Task<string> UploadImageToFirebaseAsync(string base64ImageString, string bucketStorageName);
    }
}