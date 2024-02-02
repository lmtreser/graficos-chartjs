let ui = function(p) {

    let p5Logo;
    let chartLogo;
    let deslizador;
    let accion = false;
    let press = false;

    p.preload = function() {
        p5Logo = p.loadImage('assets/p5js.svg');
        chartLogo = p.loadImage('assets/chartjs.svg');
    };

    p.setup = function() {
        let contenedor = document.getElementById("pie");
        p.createCanvas(contenedor.clientWidth, contenedor.clientHeight);

        // botón #1
        let boton1 = p.createButton("INICIAR SISTEMA");
        boton1.parent('pie');
        boton1.position(20, 30);
        boton1.size(80, 40);
        boton1.mousePressed(p.press1);

        // botón #1
        let boton2 = p.createButton("ENCENDER LED");
        boton2.parent('pie');
        boton2.position(105, 30);
        boton2.size(80, 40);
        boton2.mousePressed(p.press2);

        // slider
        deslizador = p.createSlider(1, 80, 0);
        deslizador.parent('pie');
        deslizador.position(205, 30);
        deslizador.size(100, 40);
    };

    p.draw = function() {
        p.background('#BACCD9');

        // obtener hora actual
        let horas = p.hour();
        let minutos = p.minute();
        let horaCompleta;

        if (minutos < 10) {
            horaCompleta = horas + ':0' + minutos;
        } else {
            horaCompleta = horas + ':' + minutos;
        }

        // dibujar los logos svg
        p.image(p5Logo, 850, 25, 125, 57);
        p.image(chartLogo, 745, 5, 90, 90);

        // interacción con el slider
        let datosSlider = deslizador.value();
        p.fill('#5f9ea0');
        p.textSize(datosSlider);
        p.text(horaCompleta, 400, 80);

    };

    p.press1 = function() {
        accion = !accion;
        console.log(accion);
    };

    p.press2 = function() {
        press = !press;
        console.log(press);
    };

};

let interface = new p5(ui, 'pie');