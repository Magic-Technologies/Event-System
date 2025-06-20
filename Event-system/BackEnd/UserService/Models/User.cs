namespace UserService.Models
{
    public class User
    {
        public string Name { get; set; } = string.Empty;
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
        public bool IsEmailVerified { get; set; } = false;
        public string? VerificationToken { get; set; }

    }
}