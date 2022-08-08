
// Aquí empieza la magia
function RenderizadoPalabras() {

	d3.layout.cloud().size([width, height])
		.words(words.map(function (d) {
			return { text: d, size: 10 + Math.random() * 40 };
		}))
		.rotate(function () { return ~~(Math.random() * 2) * 90; })
		.font("Impact")
		.fontSize(function (d) { return d.size; })
		.on("end", draw)
		.start();
}

// Renderizado de palabras
function draw(words) {
	var fill = obtenerColor(1);

	d3.select("#panelLetras").append("svg")
		.attr("width", width)
		.attr("height", height)
		.style("margin-top", 20)
		.append("g")
		.attr("transform", "translate(170,150)")
		.selectAll("text")
		.data(words)
		.enter().append("text")
		.style("font-size", function (d) { return d.size + "px"; })
		.style("font-family", "Impact")
		.style("fill", function (d, i) { return fill(i); })
		.attr("text-anchor", "middle")
		.attr("transform", function (d) {
			console.log(d);
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		.text(function (d) { return d.text; });
}