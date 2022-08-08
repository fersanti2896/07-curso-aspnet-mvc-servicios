using Microsoft.AspNetCore.Mvc;
using Pedidos.Models;
using System.Diagnostics;

namespace Pedidos.Controllers {
    public class HomeController : Controller {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger) {
            _logger = logger;
        }

        public IActionResult Index() {
            TempData["Llave1"] = "La llave 1";
            ViewData["Llave2"] = "La llave 2";

            ViewBag.Llave3 = "La llave 3";

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}