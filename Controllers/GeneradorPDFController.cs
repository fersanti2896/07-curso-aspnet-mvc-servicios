using Microsoft.AspNetCore.Mvc;

namespace Pedidos.Controllers {
    public class GeneradorPDFController : Controller {
        /* Hace referencia a IConfiguration para leer a appsettings */
        private readonly IConfiguration _config;

        public GeneradorPDFController(IConfiguration config) {
            _config = config;
        }

        [HttpPost]
        public JsonResult GenerarPDF(string html) { 
            var success = false;

            try {
                if (!string.IsNullOrEmpty(html)) {
                    /* Valor Facticio Posteriormente se tomará de BD */
                    var idUsuario = 2;
                    string sesion = "" + idUsuario;

                    html = "<meta charset='UTF-8'/><link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>" + html;
                    GenerarPDFService.GenerarPDF(html, _config, sesion);

                    success = true;
                }
            } catch(Exception e) { }

            return Json(new { success });
        }

        public ActionResult DownloadPDF(string namePDF) {
            /* Valor Facticio Posteriormente se tomará de BD */
            var idUsuario = 2;
            var session = "" + idUsuario;
            var ms = GenerarPDFService.LecturaPDF(_config, session);

            if (ms == null) { 
                return new EmptyResult();
            }

            return File(ms, "application/octet-stream", namePDF);
        }

        [HttpPost]
        public JsonResult GeneradorVisorPDF(string html) {
            var success = false;
            var encodedString = "";

            try {
                if (!string.IsNullOrEmpty(html)) {
                    /* Valor Facticio Posteriormente se tomará de BD */
                    var idUsuario = 2;
                    string sesion = "" + idUsuario;

                    html = "<meta charset='UTF-8'/><link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>" + html;
                    GenerarPDFService.GenerarPDF(html, _config, sesion);
                    
                    success = true;
                    var ms = GenerarPDFService.LecturaPDF(_config, sesion);
                    encodedString = Convert.ToBase64String(ms);
                }
            }
            catch (Exception) { }

            return Json(new { success, content = encodedString });
        }
    }
}
