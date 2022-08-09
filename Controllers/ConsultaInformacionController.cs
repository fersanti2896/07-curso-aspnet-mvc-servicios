using Dominio.IServicios;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Pedidos.Controllers {
    public class ConsultaInformacionController : Controller {
        private readonly IConsultaPedidoService _IConsultaPedidoService;

        public ConsultaInformacionController(IConsultaPedidoService iConsultaPedidoService) {
            _IConsultaPedidoService = iConsultaPedidoService;
        }

        [HttpPost]
        public async Task<ActionResult> ConsultaPedidosGeneral() {
            var lista = await _IConsultaPedidoService.ConsultaPedidosGeneral();

            return PartialView(lista);
        }
    }
}
