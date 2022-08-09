// Generar paletas a partir de una imagen:
// https://pinetools.com/es/obtener-colores-imagen

// Crear paleta de colores a partir de los códigos hexadecimales
// https://htmlcolorcodes.com/es/tabla-de-colores/

// Crear paletas
// https://encycolorpedia.es/b2ffff

var d3_royal_red = ["#a3bef5", "#dcd7f1", "#361e1a", "#603427", "#784b48", "#000000", "#240b07", "#544052", "#bacbef", "#6f5a71", "#87696d", "#453143", "#897891", "#4a2316", "#835948", "#a397b3", "#908c86", "#a76f67", "#c7b9c5", "#c1a4b2", "#703e2e", "#bd867e", "#a3574f", "#e9bfb5"];
var d3_firenze = ["#f6f6f6", "#dedede", "#66241f", "#f1b7a8", "#868686", "#989898", "#18c5aa", "#a9161a", "#843334", "#bb3066", "#f62c28", "#ee6765", "#cccccc", "#cd5330", "#c8b18d", "#dd3771", "#13d5c1", "#a7a7a7", "#b83c2f", "#e39195", "#6b6b6b", "#ab1f52", "#fa8a1d"];
var paletaPersonalizada = ["#dedede", "#66241f", "#868686", "#989898", "#a9161a", "#843334", "#f62c28", "#ee6765", "#cccccc", "#cd5330", "#c8b18d", "#dd3771", "#13d5c1", "#a7a7a7", "#b83c2f", "#e39195", "#6b6b6b"];
var d3_orange_olive = ["#f6f6f6", "#ece2e1", "#bebdbe", "#d9b07c", "#e58c49", "#ad9fa6", "#6e5955", "#4a4544", "#515354", "#ecd0d1", "#2a6f59", "#d77e3e", "#a08f97", "#897c82", "#80bc9e", "#7b686f", "#a7584f", "#c79f7b", "#b06d61", "#c56e36", "#e8a2a8", "#7f633e", "#867459", "#869e86"];
var d3_industry_standard = ["#e8e8e8", "#9f9f9f", "#031558", "#383838", "#d7d7d7", "#d1c3b7", "#76716f", "#1f1d1a", "#5d5771", "#f95e01", "#f9f8a8", "#524945", "#32251c", "#aa9f07", "#fff8ee", "#22214a", "#f7e268", "#323b6d", "#548d75", "#cc2c3d"];

royal_red = function () {
    return d3.scale.ordinal().range(d3_royal_red);
};
firenze = function () {
    return d3.scale.ordinal().range(d3_firenze);
};
orange_olive = function () {
    return d3.scale.ordinal().range(d3_orange_olive);
};
industry_standard = function () {
    return d3.scale.ordinal().range(d3_industry_standard);
};

paletaNueva = function () {
    return d3.scale.ordinal().range(paletaPersonalizada);
};

function obtenerColor(color) {

    pColor = (color != null && color != undefined) ? parseInt(color) : 1;

    if (pColor < 1 || pColor > 9) { pColor = 1; }

    switch (parseFloat(pColor)) {

        case 1: color = d3.scale.category10(); break;
        case 2: color = d3.scale.category20(); break;
        case 3: color = d3.scale.category20b(); break;
        case 4: color = d3.scale.category20c(); break;

        // Paletas personalizadas
        case 5: color = royal_red(); break;
        case 6: color = firenze(); break;
        case 7: color = orange_olive(); break;
        case 8: color = industry_standard(); break;
        case 9: color = paletaNueva(); break;

    }
    return color;
}
