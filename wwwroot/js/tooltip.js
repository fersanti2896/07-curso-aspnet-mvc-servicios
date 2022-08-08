/*
<input type="submit" value="Ingresar" class="btn btn-primary" onmouseover="tooltip.show('Mensaje')" onmouseout="tooltip.hide();" onclick="tooltip.hide();" onclick="tooltip.hide();" />
*/
var tooltip = function () {
    var id = '_tt';
    var top = 3;
    var maxw = 380;
    var speed = 10;
    var timer = 10; // velocidad para desaparecer el  tooltip
    var endalpha = 95;
    var alpha = 0;
    var tt, t, c, b, h;
    var ie = document.all ? true : false;
    return {
        show: function (mensaje, color) {

            color = "white";
            $("#_tt").css("background-color", color);
            $("#_ttcont").css("background-color", color);

            if (tt == null) {
                tt = document.createElement('div');
                tt.setAttribute('id', id);
                t = document.createElement('div');
                t.setAttribute('id', id + 'top');
                c = document.createElement('div');
                c.setAttribute('id', id + 'cont');
                b = document.createElement('div');
                b.setAttribute('id', id + 'bot');
                tt.appendChild(t);
                tt.appendChild(c);
                tt.appendChild(b);
                document.body.appendChild(tt);
                tt.style.opacity = 0;
                tt.style.filter = 'alpha(opacity=0)';
                document.onmousemove = this.pos;
            }
            tt.style.zIndex = 9999;
            tt.style.display = 'block';

            // Aquí esta la tabla que se muestra con el mensaje del tooltip
            mensaje =
                '<table>' +
                '   <tr><td><center><div id="colorToolTip" style="background-color:' + color + '">' + mensaje.trim() + '</div></center></td></tr>' +
                '</table>';
            c.innerHTML = mensaje;
            tt.style.width = 'auto';

            //w ? w + 'px' : 'auto';
            //if (!w && ie) {
            if (ie) {
                t.style.display = 'none';
                b.style.display = 'none';
                tt.style.width = tt.offsetWidth;
                t.style.display = 'block';
                b.style.display = 'block';
            }
            if (tt.offsetWidth > maxw) {
                tt.style.width = maxw + 'px';
            }
            h = parseInt(tt.offsetHeight) + top;
            clearInterval(tt.timer);
            tt.timer = setInterval(function () { tooltip.fade(1) }, timer);
        },
        pos: function (e) {

            var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;

            // Condicionales para mostrar del lado izquierdo o derecho el tooltip dependiendo la posición en pantalla

            var left, topper;
            try {
                left = (event.clientX == undefined) ? e.clientX : event.clientX;
            }
            catch (ex) {
                left = e.clientX;
            }
            try {
                topper = (event.clientY == undefined) ? e.clientY : event.clientY;
            }
            catch (ex) {
                topper = e.clientY;
            }

            // Separación del tooltip (top)
            var altura = (u - h - 30);
            if (topper <= (h + 50)) altura = altura + h + 50;
            tt.style.top = altura + 'px';

            if (left > 800) left = left - tt.offsetWidth;
            tt.style.left = (parseInt(left) + 'px');
        },
        fade: function (d) {
            var a = alpha;
            if ((a != endalpha && d == 1) || (a != 0 && d == -1)) {
                var i = speed;
                if (endalpha - a < speed && d == 1) {
                    i = endalpha - a;
                } else if (alpha < speed && d == -1) {
                    i = a;
                }
                alpha = a + (i * d);
                tt.style.opacity = alpha * .01;
                tt.style.filter = 'alpha(opacity=' + alpha + ')';
            } else {
                clearInterval(tt.timer);
                if (d == -1) {
                    tt.style.display = 'none';
                }
            }
        },
        hide: function () {
            clearInterval(tt.timer);
            tt.timer = setInterval(function () { tooltip.fade(-1) }, timer);
        }
    };
}();