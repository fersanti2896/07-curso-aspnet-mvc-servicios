// Se obtiene el foco de la barra
function synchronizedMouseOver() {
	var barra = d3.select(this);
	d3.select(this).style("fill", "Maroon");
	var mensaje =
		"Region: " + barra.attr("unidad") + "<br/>Estado: " + barra.attr("estado") +
		"<br/>Cantidad: " + barra.attr("cantidad");
	tooltip.show(mensaje);
}

// Se pierde el foco de la barra
function synchronizedMouseOut() {
	var barra = d3.select(this);
	barra.style("fill", barra.attr("color_value"));
	tooltip.hide();
}

// Renderizado
function draw(data) {

	var fill = obtenerColor(2);

	d3.select("svg").remove();

	var vis = d3.select("#chart").append("svg")
		.attr("width", width + 45).attr("height", height + margin);

	// numGrupos = data[0].length;

	my = d3.max(data, function (d) {
		return d3.max(d, function (d) {
			return d.y0 + d.y;
		});
	}),

		mz = d3.max(data, function (d) {
			return d3.max(d, function (d) {
				return d.y;
			});
		}),

		x = function (d) { return parseFloat(d.x) * width / numGrupos },
		y0 = function (d) { return height - parseFloat(d.y0) * (height - 15) / my; },
		y1 = function (d) { return height - (parseFloat(d.y) + parseFloat(d.y0)) * (height - 15) / my; },
		y2 = function (d) { return parseFloat(d.y) * (height - 15) / mz; }; // or `my` to not rescale

	var layers = vis.selectAll("g.layer")
		.data(data)
		.enter().append("g")
		.style("fill", function (d, i) {
			return fill(i);
		})
		.attr("class", "layer")
		.attr("color_value", function (d, i) {
			return fill(i);
		});

	var bars = layers.selectAll("g.bar")
		.data(function (d) { return d; })
		.enter().append("g")
		.attr("class", "bar")
		.attr("transform", function (d) { return "translate(" + x(d) + ",0)"; })

	bars.append("rect")
		.attr("width", x({ x: .9 }))
		.attr("x", 0)
		.attr("y", height)
		.attr("height", 0)
		.attr("unidad", function (d, i) { return d.grupo })
		.attr("cantidad", function (d, i) { return d.cantidad })
		.attr("estado", function (d, i) { return d.piso })
		.attr("id", function (d, i) { return "id" + d.pos; })
		.on('mouseover', synchronizedMouseOver)
		.on('mouseout', synchronizedMouseOut)
		.transition()
		.delay(function (d, i) { return i * 10; })
		.attr("y", y1)
		.attr("height", function (d) { return y0(d) - y1(d); });

	// ETIQUETAS AL EJE DE LAS X
	vis.selectAll("text.label")
		.data(data[0])
		.enter().append("text")
		.attr("class", "label")
		.attr("x", x)
		.attr("y", height + 6)
		.attr("dx", x({ x: .45 }) + 40)
		.attr("dy", ".82em")
		.attr("text-anchor", "middle")
		.text(function (d, i) { return d.grupo; })
		.style("fill", "Black");

	// EL EJE DE LAS X's
	vis.append("line")
		.attr("x1", 0)
		.attr("x2", width - x({ x: .1 }))
		.attr("y1", height)
		.attr("y2", height);

	var yScala = d3.scale.linear().range([margin, ((height + margin) - 15)]);

	// Creando las líneas indicadoras sobre el eje Y
	var regla = vis.selectAll("g.rule")
		.data(yScala.ticks(segmentos))
		.enter().append("svg:g")
		.attr("class", "rule")
		.attr("transform", function (d) {
			return "translate(0," + ((height + margin) - yScala(d)) + ")";
		});

	// Definiendo el estilo
	regla.append("svg:line")
		.attr("x2", width)
		.style("stroke", function (d) { return d ? "#800000" : "#000"; })
		.style("stroke-dasharray", "5, 5")
		.style("stroke-opacity", function (d) { return d ? .7 : null; });

	// Agregando estado correspondiente a cada línea indicadora
	regla.append("svg:text")
		.data(yScala.ticks(segmentos))
		.attr("x", width)
		.attr("dy", ".82em")
		.attr("id", function (d, i) { return "lineaHor_" + i; })
		.text(
			function (d, i) {
				val = ((i * my) / segmentos);
				return (val);
			}
		);
}

/*
* Transformación de un query con 3 columnas (unidad, estado, cantidad)
* a una estructura json para graficar las barras
*/
function RenderizadoGrafica() {

	envioGenericos("/Reporte/ConsultaTotalesPorRegion", null, LlenadoData);
	//LlenadoData();

	var arregloAuxiliar = [];

	var pisos = data.map(item => item.piso)
		.filter((value, index, self) => self.indexOf(value) === index)

	var grupos = data.map(item => item.grupo)
		.filter((value, index, self) => self.indexOf(value) === index)

	const auxiliarCartesiano = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
	const funcionCartesiano = (a, b, ...c) => (b ? funcionCartesiano(auxiliarCartesiano(a, b), ...c) : a);
	let productoCartesiano = funcionCartesiano(grupos, pisos);

	for (var i = 0; i < productoCartesiano.length; i++) {

		var elem = productoCartesiano[i];
		var elemento = {};
		elemento.cantidad = 0;
		elemento.pos = i;
		elemento.piso = elem[1];
		elemento.grupo = elem[0];
		elemento.x = grupos.indexOf(elemento.grupo);

		const resultado = data.find(pos => pos.piso === elemento.piso &&
			pos.grupo === elemento.grupo);

		if (resultado != undefined) {
			elemento.cantidad = resultado.cantidad;
		}

		if (elemento.piso != undefined && elemento.grupo != undefined) {
			arregloAuxiliar[i] = elemento;
		}
	}

	// número de pisos y barras
	numGrupos = grupos.length;
	numPisos = pisos.length;
	var cantidad = arregloAuxiliar.length;

	// Cálculo de las coordenadas asociadas a cada elemento del arreglo
	// para su representación gráfica
	for (var i = 0; i < cantidad; i++) {

		var y0 = 0;
		var y = 0;

		if (i % numPisos != 0) {
			y0 = parseFloat(arregloAuxiliar[i - 1].y0);
			y = parseFloat(arregloAuxiliar[i - 1].y);
		}

		arregloAuxiliar[i].y0 = y0 + y;
		arregloAuxiliar[i].y = parseFloat(arregloAuxiliar[i].cantidad);
	}

	// Segmentación del arreglo
	// en un arreglo de objetos agrupados por pisos.
	var gruposPisos = [];
	for (var j = 0; j < numPisos; j++) {

		var grupoIndividual = arregloAuxiliar.filter(function (task) {
			return task.piso == pisos[j];
		});
		gruposPisos[j] = grupoIndividual;
	}
	draw(gruposPisos);
}

/*
* Conversión de gráfica a columnas independientes
*/
function transicionGrupo() {

	var grupo = d3.selectAll("#chart");

	valoresRegla(mz);

	grupo.selectAll("g.layer rect")
		.transition()
		.duration(100)
		.delay(function (d, i) { return (i % numGrupos) * 10; })
		.attr("x", function (d, i) { return x({ x: .9 * ~~(i / numGrupos) / numPisos }); })
		.attr("width", x({ x: .9 / numPisos }))
		.each("end", transitionEnd);

	function transitionEnd() {
		d3.select(this)
			.transition()
			.duration(500)
			.attr("y", function (d) {
				return height - y2(d);
			})
			.attr("height", y2)
			.attr("alto", y2);
	}
}

function valoresRegla(factor) {

	for (var w = 0; w < 6; w++) {
		var val = ((w * factor) / segmentos);
		d3.select("#chart").selectAll("#lineaHor_" + w).text(val);
	}
}

/*
* Conversión de gráfica a columnas estibadas
*/
function transicionPila() {

	// define orden de selección
	var pila = d3.selectAll("#chart");

	valoresRegla(my);

	// .duration(500) -> periodo en milisegundos de renderizado
	pila.selectAll("g.layer rect")
		.transition()
		.duration(500)
		.delay(function (d, i) { return (i % numGrupos) * 10; })
		.attr("y", y1)
		.attr("height", function (d) { return y0(d) - y1(d); })
		.each("end", transitionEnd);

	function transitionEnd() {
		d3.select(this)
			.transition()
			.duration(500)
			.attr("x", 0)
			.attr("width", x({ x: .9 }));
	}
}

