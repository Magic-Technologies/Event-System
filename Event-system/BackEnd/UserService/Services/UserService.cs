using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BCrypt.Net;
using UserService.Data;
using UserService.Models;

namespace UserService.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public UserService(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        public async Task<string> RegisterAsync(string name, string email, string password)
        {
            if (await _db.Users.AnyAsync(u => u.Email == email))
                return "User already exists.";

            var user = new User
            {
                Name = name,
                Email = email,
                // PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                PasswordHash = password,
                IsEmailVerified=true,
                VerificationToken = Guid.NewGuid().ToString()
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            // TODO: Send verification email with token
            return "User registered. Please verify your email.";
        }
        public async Task<string?> LoginAsync(string email, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == password);
            //if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            if (user == null)
                return null;
            if (!user.IsEmailVerified)
                return "Email not verified.";
            return GenerateJwtToken(user);
        }

        public async Task<bool> VerifyEmailAsync(string token)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.VerificationToken == token);
            if (user == null) return false;
            user.IsEmailVerified = true;
            user.VerificationToken = null;
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ForgetPasswordAsync(string email)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return false;

            // Generate a reset password token
            //user.ResetPasswordToken = Guid.NewGuid().ToString();
            //user.ResetPasswordTokenExpiry = DateTime.UtcNow.AddHours(1);

            _db.Users.Update(user);
            await _db.SaveChangesAsync();

            // TODO: Send reset password email with the token
            return true;
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["Jwt:Key"] ?? "supersecretkey"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
