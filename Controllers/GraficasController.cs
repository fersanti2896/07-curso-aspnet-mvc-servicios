using Dominio.IServicios;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pedidos.Controllers {
    public class GraficasController : Controller {

        public IActionResult Lineas() {
            ViewBag.xValues = new List<int> { 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150 };
            ViewBag.yValues = new List<int> { 7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15 };

            return View();
        }

        public IActionResult Barras() {
            return View();
        }

        public async Task<IActionResult> Pastel() {
            return View();
        }

        [HttpPost]
        public JsonResult Datos() {
            var xValues = new List<string> { "Italy", "France", "Spain", "USA", "Argentina" };
            var yValues = new List<int> { 55, 49, 44, 24, 15 };
            var barColors = new List<string> {
              "#b91d47",
              "#00aba9",
              "brown",
              "#e8c3b9",
              "#1e7145"
            };
            var lista = new {
                xValues,
                yValues,
                barColors
            };

            return Json(lista);
        }

        /* Ejemplo para descargar PDF */
        public FileResult DescargarPDF() {
            var fileBytes = System.IO.File.ReadAllBytes(@"C:\Prueba.pdf");
            string filename = "Grafica.pdf";

            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, filename);
        }
    }
}
