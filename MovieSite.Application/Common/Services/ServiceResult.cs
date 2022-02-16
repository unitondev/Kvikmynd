using MovieSite.Application.Common.Enums;

namespace MovieSite.Application.Common.Services
{
    public class ServiceResult
    {
        private bool _isSucceeded = true;
        private ErrorCode? _error;

        public ServiceResult() { }

        public ServiceResult(ErrorCode? errorCode)
        {
            Error = errorCode;
        }

        public bool IsSucceeded => _isSucceeded;

        public ErrorCode? Error
        {
            get => _error;
            set
            {
                _error = value;
                if (_error.HasValue) _isSucceeded = false;
            }
        }
    }

    public class ServiceResult<T> : ServiceResult where T : class
    {
        public T Result { get; set; }
        public ServiceResult() : base() { }

        public ServiceResult(ErrorCode? errorCode) : base() { }

        public ServiceResult(T result)
        {
            Result = result;
        }
    }
}