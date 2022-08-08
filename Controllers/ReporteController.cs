using Dominio.IServicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Pedidos.Controllers {
    public class ReporteController : Controller {
        private readonly IConsultaGraficaService _IConsultaGraficaService;

        public ReporteController(IConsultaGraficaService iConsultaGraficaService) {
            _IConsultaGraficaService = iConsultaGraficaService;
        }

        [HttpPost]
        public async Task<JsonResult> estadosRepublica() {
            var lista = await _IConsultaGraficaService.ConsultaEstadosRepublica();

            return Json(lista);
        }
    }
}
