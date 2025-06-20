using UserService.Models;

namespace UserService.Services
{
    public interface IUserService
    {
        Task<string> RegisterAsync(string name, string email, string password);
        Task<string?> LoginAsync(string email, string password);
        Task<bool> VerifyEmailAsync(string token);
        Task<bool> ForgetPasswordAsync(string email);
    }
}
