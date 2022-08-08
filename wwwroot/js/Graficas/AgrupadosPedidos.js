﻿/* Renombra las propiedades */
function LlenadoData() {
	data = data.map(function (obj) {
		obj.estado = obj.estadoPedido;
		obj.cantidad = obj.cantidad;

		return obj;
	});
};

function RenderizadoGrafica() {

	//datos = d3.range(10).map(Math.random),
	//datos = ["1", "2", "3", "4", "5", "6", "7"],
	datos = data.map(function (obj) {
		return obj.cantidad;
	});

	var width = 400, height = 400,
		outerRadius = Math.min(width, height) / 2,
		innerRadius = 0,
		color = obtenerColor(4);
	donut = d3.layout.pie(),
		arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

	var vis = d3.select("#chart")
		.append("svg").data([datos])
		.attr("width", width).attr("height", height);

	var arcs = vis.selectAll("g.arc")
		.data(donut).enter().append("g")
		.attr("class", "arc")
		.attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

	arcs.append("path")
		.attr("id", function (d, i) {
			return "id_" + i;
		})
		.attr("color_value", function (d, i) {
			return color(i);
		})
		.attr("fill", function (d, i) { return color(i); })
		.on('mouseover', synchronizedMouseOver)
		.on('mouseout', synchronizedMouseOut)
		.transition()
		.duration(100).delay(function (d, i) { return i * 50; })
		.attr("d", arc);

	arcs.append("text")
		.attr("transform", function (d) { return "translate(" + (arc.centroid(d)) + ")"; })
		.attr("dy", ".35em")
		.attr("text-anchor", "middle")
		.on('mouseover', synchronizedMouseOver)
		.on('mouseout', synchronizedMouseOut)
		.attr("display", function (d) { return d.value > .15 ? null : "none"; })
		.style("opacity", "0")
		.transition()
		.duration(1000).delay(function (d, i) { return i * 100; })
		.text(function (d, i) { return d.value })
		.attr("id", function (d, i) {
			return "id___" + i;
		})
		.attr("text-anchor", "middle")
		.style("opacity", "1")

	crearTabla();
}

function crearTabla() {
	data.forEach((element, i) => {

		var color = $("#id_" + i).attr("fill");
		var contenido = '<tr>';
		contenido += '<th scope="row" onmouseover="synchronizedMouseOver(this)" onmouseout="synchronizedMouseOut(this)" '
			+ ' style="background-color:' + color + '" id="id__' + i + '"></th>';
		contenido += '<td>' + element.estado + '</td>';
		contenido += '<td>' + element.cantidad + '</td>';
		contenido += '</tr>';

		$("#CuerpoTabla").append(contenido);
	});
}

/* Selecciona el campo */
function synchronizedMouseOver(elemento) {

	var id = $(elemento).attr("id");

	// no paso por encima de la tabla
	// paso por un arco de la gráfica
	if (id == undefined) {
		var barra = d3.select(this);
		id = barra.attr("id");
	}

	id = id.replace(/id/g, "").replace(/_/g, "");

	$("#id_" + id).css("fill", "Maroon");
	$("#id__" + id).css("background-color", "Maroon");

	var elemento = data[parseInt(id)];
	var mensaje = "Estado del pedido: " + elemento.estado + "<br/>Cantidad: " + elemento.cantidad;

	tooltip.show(mensaje);
}

/* Deselecciona el campo */
function synchronizedMouseOut(elemento) {

	var id = $(elemento).attr("id");

	// No pasí por encima de la tabla
	if (id == undefined) {
		var barra = d3.select(this);
		id = barra.attr("id");
	}

	id = id.replace(/id/g, "").replace(/_/g, "");

	var color = $("#id_" + id).attr("color_value");

	$("#id_" + id).css("fill", color);
	$("#id__" + id).css("background-color", color);

	tooltip.hide();
}