function graficar() {
	var max = Math.max(...datos);
	var fill = obtenerColor(4);

	var w = 1100;
	var h = 300;
	var anchoBarra = 30;

	var svg = d3.select('#panelBarras')
		.append('svg')
		.attr("width", w)
		.attr("height", h + 30);

	svg.selectAll("rect")
		.data(datos)
		.enter()
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", anchoBarra)
		.attr("height", 100)
		.style("fill", function (d, i) { return fill(i); })
		.attr("x", function (d, i) {
			return i * (anchoBarra + 1) + 30 // Ancho de barras de 20 más 1 de espacio
		})
		.attr("height", function (d) {
			return (d * h / max) + 13;
		})
		.attr("y", function (d) {
			return h - (d * h / max) + 13; // Altura menos el dato
		})
		.on('mouseover', function (d, i) {
			tooltip.show(estadoRepublica[i] + ": " + d);
		})
		.on('mouseout', function (d) {
			tooltip.hide();
		})

	svg.selectAll("text")
		.data(datos)
		.enter()
		.append("text")
		.text(function (d) {
			return d;
		})
		.attr("x", function (d, i) {
			return i * (anchoBarra + 1) + 40 // + 5
		})
		.attr("y", function (d) {
			return h - (d * h / max) + 12; // + 15
		})
}