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
        private readonly FirebaseAuthProvider _authProvider;
        private FirebaseAuthLink _authLink;

        public FileUploadService(IOptions<FirebaseSettings> settings)
        {
            _settings = settings.Value;
            _authProvider = new FirebaseAuthProvider(new FirebaseConfig(_settings.ApiKey));
        }
        
        public async Task<string> UploadImageToFirebaseAsync(string base64ImageString, string bucketStorageName)
        {
            var base64ImageStringWithoutHeaders = base64ImageString.Substring(base64ImageString.LastIndexOf(',') + 1);
            var authLink = await GetTokenOrSignInAsync();

            return await new FirebaseStorage(_settings.StorageBucket, new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(authLink.FirebaseToken),
                    ThrowOnCancel = true
                })
                .Child(bucketStorageName)
                .Child(Guid.NewGuid().ToString())
                .PutAsync(new MemoryStream(Convert.FromBase64String(base64ImageStringWithoutHeaders)));
        }

        public async Task DeleteImageFromFirebaseAsync(string imageUrl, string bucketStorageName)
        {
            imageUrl = Uri.UnescapeDataString(imageUrl);
            var startIndex = imageUrl.IndexOf($"{bucketStorageName}/", StringComparison.Ordinal) + "avatars/".Length;
            var endIndex = imageUrl.IndexOf("?alt", StringComparison.Ordinal);
            var imageId = imageUrl.Substring(startIndex, endIndex - startIndex);

            var authLink = await GetTokenOrSignInAsync();
            await new FirebaseStorage(_settings.StorageBucket, new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(authLink.FirebaseToken),
                    ThrowOnCancel = true
                })
                .Child(bucketStorageName)
                .Child(imageId)
                .DeleteAsync();
        }


        private async Task<FirebaseAuthLink> GetTokenOrSignInAsync()
        {
            if (_authLink == null || _authLink.IsExpired())
            {
                _authLink = await _authProvider.SignInWithEmailAndPasswordAsync(_settings.Email, _settings.Password);
            }

            return _authLink;
        }
    }
}