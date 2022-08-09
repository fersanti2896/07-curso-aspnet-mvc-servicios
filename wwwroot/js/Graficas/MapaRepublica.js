function selectoresEstadoPedido() {
    envioGenericos('/Mapas/ConsultaEstadosPedido', null, 'selectoresEstadoPedido');
}

// Ejemplos que vale la pena revisar:
// http://bl.ocks.org/KoGor/5685876
// https://gist.github.com/diegovalle/5129746

var width = 780,
    height = 750;
var data = [];

function LlenadoData(datos) {
    data = datos;
}

function RenderizaMapa() {
    d3.select("svg").remove();

    $("#chart").html("");

    var modelo = {
        CatEstadoPedidoId: $("#selectorEstadoPedido").val()
    }

    envioGenericos("/Reporte/ConsultaTotalesPorEstadoPedido", modelo, LlenadoData);

    var projection = d3.geo.albers()
        .center([101.4, 21.7])
        .rotate([195, 30])
        .parallels([13, 30])
        .scale(1200 * 1.3)
        .translate([width / 3, height / 3.5]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#chart").append("svg")
        .attr("id", "MapaMexico")
        .attr("width", width)
        .attr("height", height - 300);

    svg.selectAll(".subunit")
        .data(topojson.object(mx, mx.objects.subunitsM).geometries)
        .enter().append("path")
        .attr("class", function (d) { return "subunit " + d.id; })
        .attr("stroke-width", ".5")
        .attr("stroke", "black")
        .attr("d", path)
        .attr("fill", function (d) {
            return colorEstadoRelleno(d.id);
        })
        .attr("opacity", function (d) {
            return colorEstadoOpacidad(d.id);
        })
        .on("mouseover", function (d) {
            d3.select(this).attr("fill", "#1E605A");
            var mensaje = valorEstado(d.id);
            tooltip.show(mensaje);
        })
        .on('click', function (d, i) {
            tooltip.hide();
            alert("Aquí pudieses hacer lo que tu quisieras (desplegar un modal, redirigir a otra página, etc. etc. etc.");
        })
        .on("mouseout", function (d) {
            tooltip.hide();
            d3.select(this).attr("fill", colorEstadoRelleno(d.id));
        })

}

function valorEstado(siglaEstado) {

    var mensaje = "";
    console.log(siglaEstado);
    console.log(data);
    const resultado = data.find(pos => pos.sigla === siglaEstado);

    if (resultado != null && resultado != undefined) {

        mensaje = "Estado: " + resultado.estadoRepublica +
            ", Cantidad: " + resultado.cantidad;
        return mensaje;
    }
    mensaje = "Estado: " + siglaEstado +
        ", Cantidad: 0";
    return mensaje;
}

function colorEstadoRelleno(siglaEstado) {

    const resultado = data.find(pos => pos.sigla === siglaEstado);
    if (resultado != null && resultado != undefined) {
        var cantidad = parseInt(resultado.cantidad);
        if (cantidad == 0) {
            return "white";
        }
    }
    return "maroon";
}

function colorEstadoOpacidad(siglaEstado) {

    var maximo = Math.max.apply(Math, data.map(function (o) { return parseInt(o.cantidad); }))
    const resultado = data.find(pos => pos.sigla === siglaEstado);

    if (resultado != null && resultado != undefined) {
        var cantidad = parseInt(resultado.cantidad);
        if (cantidad == 0) {
            return 1;
        }
        var opacidad = (cantidad / maximo);
        return opacidad;
    }
    return 0;
}

function GenerarVisorPDF() {
    var divId = "panel";
    let myWindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150')
    myWindow.document.write($("#" + divId).html());
    myWindow.document.close();
    myWindow.focus();
    myWindow.print();
    myWindow.close();
    return true;
}

function GenerarPDF() {
    getImgFromSVG(function (img) {
        generatePDF(img)
    })
}

function generatePDF(img) {
    var doc = new jsPDF();

    //var imgData='data:image/jpeg;base64,'+Base64.encode('Koala.jpeg');
    var imgData = img;
    doc.setFontSize(40);
    doc.text(30, 20, $("#tituloGrafica").html());
    doc.addImage(imgData, 'JPEG', 0, 40, 170, 160);
    doc.save($("#panel").data("prefix"));
}

function getImgFromSVG(callback) {
    var node = document.getElementById('chart');
    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            img.onload = function () {
                callback(img)
            }
        })
        .catch(function (error) {
            alert("ups");
        })
}
