using Dominio.IServicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Transporte;

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

        [HttpPost]
        public async Task<JsonResult> ConsultaTotalesPorRegion(){
            var lista = await _IConsultaGraficaService.ConsultaTotalesPorRegion();

            return Json(lista);
        }

        [HttpPost]
        public async Task<JsonResult> ConsultaTotalesPorEstadoPedido(PedidoEdoDTO modelo) { 
            var lista = await _IConsultaGraficaService.ConsultaTotalesPorEstadoPedido(modelo);
            return Json(lista);
        }
    }
}
