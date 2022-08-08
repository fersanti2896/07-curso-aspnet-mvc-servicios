using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Pedidos.Controllers {
    public class MapasController : Controller {
        public ActionResult EstadosRepublicas() {
            return View();
        }

        public ActionResult ERPastel() {
            return View();
        }

        public ActionResult TotalesEstadoRep(){
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
    }
}
