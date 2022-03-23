using System;
using System.IO;
using System.Threading.Tasks;
using Firebase.Auth;
using Firebase.Storage;
using Kvikmynd.Application.Common.Models;
using Kvikmynd.Application.Interfaces.Services;
using Microsoft.Extensions.Options;

namespace Kvikmynd.Application.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly FirebaseSettings _settings;

        public FileUploadService(IOptions<FirebaseSettings> settings)
        {
            _settings = settings.Value;
        }
        
        public async Task<string> UploadImageToFirebaseAsync(string base64ImageString, string bucketStorageName)
        {
            var base64ImageStringWithoutHeaders = base64ImageString.Substring(base64ImageString.LastIndexOf(',') + 1); 
            var authProvider = new FirebaseAuthProvider(new FirebaseConfig(_settings.ApiKey));
            var authLink = await authProvider.SignInWithEmailAndPasswordAsync(_settings.Email, _settings.Password);

            return await new FirebaseStorage(_settings.StorageBucket, new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(authLink.FirebaseToken),
                    ThrowOnCancel = true
                })
                .Child(bucketStorageName)
                .Child(Guid.NewGuid().ToString())
                .PutAsync(new MemoryStream(Convert.FromBase64String(base64ImageStringWithoutHeaders)));
        }
    }
}