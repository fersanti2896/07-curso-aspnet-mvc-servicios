
function envioGenericos( controlador, modelo, callback ) {
    $.ajax({
        type: 'POST',
        url: controlador,
        data: modelo,
        async: false,
        cache: false,
        success: function (resultado) {
            // Obtengo el tipo de dato del argumento callback
            tipoCallback = typeof (callback);

            if (tipoCallback === "function") {
                // Ejecuta la función callback teniendo como arg lo que respondio el server(resultado)
                callback(resultado);
            } else {
                $("#" + callback).html(resultado);
            }
        },
        error: function (errorHTML) {
            alert(controlador + ":" + JSON.stringify(errorHTML));
        },
        complete: function () {
        }
    });
}

function SetupDescarga() {
    $("#descargaPDF").click(function () {
        html2canvas($("#myChart"), {
            onrendered: function (canvas) {
                var imgData = canvas.toDataURL("image/png");
                var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'PNG', 5, 20);

                var nombrePDF = document.getElementById("panel").getAttribute("data-pdf");
                var tituloGrafica = document.getElementById("panel").getAttribute("data-title");

                doc.text(30, 20, tituloGrafica);
                doc.save(nombrePDF);
            }
        })
    })
}

function GetModeloPDF() {
    var modelo = {
        html: $("#panel").html()
    }
    return modelo;
}

function GenerarPDF() {
    var namePDF = $("#panel").data("prefix");
    $.ajax({
        type: 'POST',
        url: "/GeneradorPDF/GenerarPDF",
        data: GetModeloPDF(),
        async: false,
        cache: false,
        success: function (resultado) {
            if (resultado.success) {
                window.location = "/GeneradorPDF/DownloadPDF?namePDF=" + namePDF;
            }
        },
        error: function (errorHtml) {
            alert(controlador + ":" + JSON.stringify(errorHtml));
        },
        complete: function () {

        }
    });
}

function GenerarVisorPDF() {
    $.ajax({
        type: 'POST',
        url: "/GeneradorPDF/GeneradorVisorPDF",
        data: GetModeloPDF(),
        dataType: "json",
        async: false,
        cache: false,
        success: function (resultado) {
            if (resultado.success) {
                var arrayBuffer = base64ToArrayBuffer(resultado.content);

                function base64ToArrayBuffer(base64) {
                    var binaryString = window.atob(base64);
                    var binaryLen = binaryString.length;
                    var bytes = new Uint8Array(binaryLen);

                    for (var i = 0; i < binaryLen; i++) {
                        var ascii = binaryString.charCodeAt(i);
                        bytes[i] = ascii;
                    }

                    return bytes;
                }

                var blob = new Blob([arrayBuffer], { type: "application/pdf" });
                var link = window.URL.createObjectURL(blob);

                window.open(link, '', 'height=650,width=840');
            }
        },
        error: function (errorHtml) {
            alert(controlador + ":" + JSON.stringify(errorHtml));
        },
        complete: function () {

        }
    });
}