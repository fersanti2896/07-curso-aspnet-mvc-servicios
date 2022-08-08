using Dominio.IServicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Pedidos.Controllers {
    public class ReporteController : Controller {
        private readonly IConsultaGraficaService consultaGraficaService;

        public ReporteController(IConsultaGraficaService consultaGraficaService) {
        }
    }
}
