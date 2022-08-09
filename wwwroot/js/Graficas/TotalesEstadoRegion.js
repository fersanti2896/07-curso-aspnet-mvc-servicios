function ObtenerRegiones(elementos) {
	// Regiones = elementos;
	Regiones = data.map(item => item.region)
		.filter((value, index, self) => self.indexOf(value) === index)
};

function ObtenerEstados(elementos) {
	// Estados = elementos;
	Estados = data.map(item => item.estadoPedido)
		.filter((value, index, self) => self.indexOf(value) === index)
	console.log(Estados);
};


function RenderizadoGrafica() {
	envioGenericos("/Reporte/ConsultaTotalesPorRegion", null, ObtenerDatos);

	ObtenerRegiones();
	ObtenerEstados();
	LlenadoData();

	var color = obtenerColor(6);
	var width = 820, height = 300;

	var x = d3.scale.ordinal().domain(Estados).rangeRoundBands([0, width]);
	var y = d3.scale.ordinal().domain(Regiones).rangeRoundBands([0, height]);

	// Define container
	var svg = d3.select("#chart-container")
		.append("svg")
		.attr("class", "chart")
		.attr("width", width + 100)
		.attr("height", height + 60)
		.append("g")
		.attr("transform", "translate(140,40)");

	var xAxis = d3.svg.axis().scale(x).orient('top');
	var yAxis = d3.svg.axis().scale(y).orient('left');

	svg.append('g').attr("class", "axis").call(xAxis);
	svg.append('g').attr("class", "axis").attr("id", "yAxis").call(yAxis);

	var dataFiltered = [];

	var llave = "cantidad";
	var categoriaFiltrada = d3.keys(data[0]).filter(function (key) { return key === llave; });

	data.forEach(function (d) {
		categoriaFiltrada.map(function (name) {
			dataFiltered.push({
				llave: name, value: +d[llave],
				Unidad: d.region, Estado: d.estadoPedido
			})
		});
	});

	svg.selectAll("circle")
		.data(dataFiltered)
		.enter().append("circle")
		.attr("class", "mCircle")
		.attr("cx", function (cx) { return x(cx.Estado) + 61; })
		.attr("cy", function (cx) { return y(cx.Unidad) + 25; })
		.attr("r", 0)
		.style("fill", function (cx) { return color(getIndiceRegion(cx.Unidad)); })
		.style("opacity", .7)
		.attr("color_value", function (cx, i) {
			return color(getIndiceRegion(cx.Unidad));
		})
		.attr("mensaje", function (cx) { return getMensaje(cx); })
		.on('mouseover', synchronizedMouseOver)
		.on("mouseout", synchronizedMouseOut)
		.style("stroke", "black")
		.transition().delay(500).duration(2500)
		.attr("r", function (cx) { return getRadio(cx); })

	function getMensaje(cx) {
		return "Region: " + cx.Unidad + "<br/>Estado: " + cx.Estado + "<br/>Cantidad: " + cx.value;
	}

	function synchronizedMouseOver() {
		var barra = d3.select(this);
		var mensaje = barra.attr("mensaje");

		barra.style("fill", "Maroon");
		tooltip.show(mensaje);
	}

	function synchronizedMouseOut() {
		var rebanada = d3.select(this);

		rebanada.style("fill", rebanada.attr("color_value"));
		tooltip.hide();
	}

	//nombre de la categoria
	svg.selectAll(".titulo")
		.data(dataFiltered)
		.enter().append("g");

	function getRadio(d) {
		var ldata = dataFiltered.filter(function (r) { return r.Unidad == d.Unidad; })
		var lmax = d3.max(ldata, function (r) { return r.value; });
		var r = 20 * (parseFloat(d.value) / lmax);

		if (0 < r && r < 2) r = 2;

		return r;
	};

	function getIndiceRegion(name) {
		var index = 0

		for (i = 0; i < Regiones.length; i++) if (name == Regiones[i]) return i;

		return index;
	}

	$(".domain").css("stroke-width", ".5px");
	$(".domain").css("fill", "none");
	$(".domain").css("stroke-linecap", "round");
	$(".domain").css("stroke-linejoin", "round");
	$(".domain").css("stroke", "black");
}