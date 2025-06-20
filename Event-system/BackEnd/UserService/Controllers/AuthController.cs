using Microsoft.AspNetCore.Mvc;

using UserService.Services;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _userService.RegisterAsync(request.name, request.Email, request.Password);
            return Ok(new { message = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _userService.LoginAsync(request.Email, request.Password);
            if (token == null) return Unauthorized(new { message = "Invalid credentials or email not verified." });
            return Ok(new { token });
        }

        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string token)
        {
            var verified = await _userService.VerifyEmailAsync(token);
            if (!verified) return BadRequest("Invalid token");
            return Ok("Email verified successfully");
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Clear authentication cookies or tokens
            return Ok(new { message = "Logged out successfully." });
        }

        [HttpPost("forget-password")]
        public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordRequest request)
        {
            var result = await _userService.ForgetPasswordAsync(request.Email);
            if (!result) return BadRequest(new { message = "Failed to send reset password email." });
            return Ok(new { message = "Reset password email sent successfully." });
        }
    }

    public record RegisterRequest(string name, string Email, string Password);
    public record LoginRequest(string Email, string Password);
    public record ForgetPasswordRequest(string Email);
}
