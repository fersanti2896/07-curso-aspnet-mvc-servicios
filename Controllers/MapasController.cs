using Dominio.IServicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Pedidos.Controllers {
    public class MapasController : Controller {
        private readonly IConsultaGraficaService _IConsultaGraficaService;

        public MapasController(IConsultaGraficaService iConsultaGraficaService) {
            _IConsultaGraficaService = iConsultaGraficaService;
        }
        public ActionResult EstadosRepublicas() {
            return View();
        }

        public async Task<ActionResult> ERPastelAsync() {
            var lista = await _IConsultaGraficaService.ConsultaPedidosAgrupados();
            ViewBag.Modelo = lista;

            return View();
        }

        public async Task<ActionResult> TotalesEstadoRep(){
            var lista = await _IConsultaGraficaService.ConsultaPedidosEstadosRepublica();
            ViewBag.Modelo = lista;

            return View();
        }

        public ActionResult TotalesEstadosRegion() {
            return View();
        }

        public ActionResult TotalesEstadosGrupos() {
            return View();
        }

        public ActionResult MapaMexico() {
            return View();
        }

        public async Task<IActionResult> ConsultaEstadosPedido() {
            var lista = await _IConsultaGraficaService.ConsultaEstadosPedido();

            /* Vista parcial */
            return PartialView(lista);
        }
    }
}
