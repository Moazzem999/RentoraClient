using Microsoft.AspNetCore.Mvc;

namespace RentoraClient.Controllers;

public class AccountController : Controller
{
    private readonly IConfiguration _configuration;

    public AccountController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet]
    public IActionResult Login(string? returnUrl = null)
    {
        ViewBag.ReturnUrl = returnUrl;
        ViewBag.ApiBaseUrl = _configuration["ApiSettings:BaseUrl"] ?? "https://localhost:7148/api";
        return View();
    }

    [HttpGet]
    public IActionResult Register()
    {
        ViewBag.ApiBaseUrl = _configuration["ApiSettings:BaseUrl"] ?? "https://localhost:7148/api";
        return View();
    }

    [HttpGet]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("rentora_auth_token");
        return RedirectToAction("Index", "Home");
    }
}
