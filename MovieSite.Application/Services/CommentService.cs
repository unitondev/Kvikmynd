using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Services
{
    public class CommentService : ICommentService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CommentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<Comment>> GetCommentsAsync()
        {
            return await _unitOfWork.CommentRepository.GetAllAsync();
        }

        public async Task<Comment> CreateCommentAsync(Comment comment)
        {
            await _unitOfWork.CommentRepository.AddAsync(comment);
            await _unitOfWork.CommitAsync();
            return comment;
        }

        public async Task<Comment> UpdateCommentAsync(Comment comment)
        {
            await _unitOfWork.CommentRepository.UpdateAsync(comment);
            await _unitOfWork.CommitAsync();
            return comment;
        }

        public async Task<bool> DeleteCommentByIdAsync(int commentId)
        {
            await _unitOfWork.CommentRepository.DeleteByIdAsync(commentId);
            await _unitOfWork.CommitAsync();
            return true;
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }

        public async ValueTask DisposeAsync()
        {
            await _unitOfWork.DisposeAsync();
        }
    }
}