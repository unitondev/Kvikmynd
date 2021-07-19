using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MovieSite.Application.DTO.Requests;
using MovieSite.Application.Helper;
using MovieSite.Application.Interfaces.Repositories;
using MovieSite.Application.Interfaces.Services;
using MovieSite.Domain.Models;

namespace MovieSite.Application.Services
{
    public class CommentService : ICommentService, IDisposable, IAsyncDisposable
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public CommentService(IUnitOfWork unitOfWork, IMapper mapper, UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }
        
        public async Task<IEnumerable<Comment>> GetCommentsAsync()
        {
            return await _unitOfWork.CommentRepository.GetAllAsync();
        }
        
        public async Task<Result<Comment>> CreateCommentAsync(CommentRequest commentRequest)
        {
            var user = await _userManager.FindByIdAsync(Convert.ToString(commentRequest.UserId));
            if(user == null)
                return Result<Comment>.NotFound();
            var movie = await _unitOfWork.MovieRepository.GetByIdOrDefaultAsync(commentRequest.MovieId);
            if(movie == null)
                return Result<Comment>.NotFound();

            var createdComment = _mapper.Map<CommentRequest, Comment>(commentRequest);
            await _unitOfWork.CommentRepository.AddAsync(createdComment);
            await _unitOfWork.CommitAsync();
            return Result<Comment>.Success(createdComment);
        }

        public async Task DeleteCommentByIdAsync(int commentId)
        {
            await _unitOfWork.CommentRepository.DeleteByIdAsync(commentId);
            await _unitOfWork.CommitAsync();
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