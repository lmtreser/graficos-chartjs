let ui = function(p) {

    let tipografia;

    p.preload = function() {
        fuente = p.loadFont('fonts/FiraSans-SemiBold.ttf');
    };

    p.setup = function() {
        let contenedor = document.getElementById("pie");
        p.createCanvas(contenedor.clientWidth, contenedor.clientHeight);
        p.textFont(fuente);

    };

    p.draw = function() {
        p.background('#292929');
        p.fill('#39ff14');
        p.textSize(14);
        p.text("> INTERFAZ WEB - HTML * CSS * JS * P5.JS * CHART.JS * ARDUINO", 10, 25);
        p.text("> Sensor #1: " + datosArduino + " °C", 10, 45);
        p.text("> Sensor #2: " + datosArduino + " °F", 10, 65);
        p.text("> Sensor #3: " + datosArduino + " %", 10, 85);
    };

};

let interface = new p5(ui, 'pie');