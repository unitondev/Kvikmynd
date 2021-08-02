using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace MovieSite.Hubs
{
    public class SignalRHub : Hub
    {
        public async Task JoinMoviePage(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.MovieId);
        }

        public async Task UserHasChangedComment(UserConnection userConnection)
        {
            await Clients.Group(userConnection.MovieId).SendAsync("CommentsHasChanged");
        }
        
        public async Task UserHasChangedRating(UserConnection userConnection)
        {
            await Clients.Group(userConnection.MovieId).SendAsync("RatingHasChanged");
        }
    }
}