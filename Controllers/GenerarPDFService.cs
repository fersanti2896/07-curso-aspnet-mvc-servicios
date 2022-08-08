using Microsoft.Extensions.Configuration;
using System.Diagnostics;

namespace Pedidos.Controllers {
    public class GenerarPDFService {
        public static void GenerarPDF(string html, IConfiguration config, string sesion) {
            string folderJob = @config["Parametros:Path"];
            string folderTemp = @config["Parametros:PathPDF"];

            var ejecutable = System.IO.Path.Combine(folderJob, "wkhtmltopdf.exe");
            var destino = System.IO.Path.Combine(folderTemp, sesion + ".pdf");
            var origen = System.IO.Path.Combine(folderTemp, sesion + ".html");

            creacionHTML(html, origen);
            generacionPDF(origen, destino, ejecutable);
        }

        private static void creacionHTML(string html, string origen) {
            System.IO.File.WriteAllText(origen, html);    
        }

        private static void generacionPDF(string origen, string destino, string ejecutable) { 
            using var compiler = new Process { 
                StartInfo = { 
                    Arguments = origen + " " + destino,
                    FileName  = ejecutable,
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    RedirectStandardError = true,
                    CreateNoWindow = true
                }
            };

            compiler.Start();
            compiler.WaitForExit();
        }

        public static byte[] LecturaPDF(IConfiguration config, string sesion) {
            string folderTemp = @config["Parametros:PathPDF"];

            var destino = System.IO.Path.Combine(folderTemp, sesion + ".pdf");
            var existe = System.IO.File.Exists(destino);

            if (existe) {
                var contenido = System.IO.File.ReadAllBytes(destino);
                System.IO.File.Delete(destino);

                return contenido;
            }

            return null;
        }
    }
}
