let chart1 = document.getElementById('cizq').getContext('2d');
let chart2 = document.getElementById('cder').getContext('2d');

// Gráfico #1, con datasets estáticos
let temperaturas = new Chart(chart1, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
        ],
        datasets: [{
                label: 'T. Media',
                data: [20, 20, 20, 15, 12, 9, 7, 9, 10, 12, 17, 19],
                borderWidth: 2,
                borderColor: 'rgb(0,100,0)',
                backgroundColor: 'rgb(0,100,0)',
            },
            {
                label: 'T. Máx',
                data: [34, 33, 32, 26, 26, 19, 17, 24, 24, 28, 30, 34],
                borderWidth: 2,
                borderColor: 'rgb(255,69,0)',
                backgroundColor: 'rgb(255,69,0)',
            },
            {
                label: 'T. Mín',
                data: [6, 9, 6, 5, 0, -2, -1, -2, -1, 1, 4, 5],
                borderWidth: 2,
                borderColor: 'rgb(30,144,255)',
                backgroundColor: 'rgb(30,144,255)',
            }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'TEMPERATURA MEDIA, MÁXIMA Y MÍNIMA (°C)',
                font: {
                    weight: 'bold',
                    size: 16
                },
            },
            subtitle: {
                display: true,
                text: 'Mar del Plata - 2020',
                font: {
                    weight: 'italic',
                    size: 14
                },
            },
            legend: {
                position: 'bottom',
                align: 'center'
            },
            responsive: true
        }
    }
});

// Conexión al puerto serie
// Ejecutar el servidor que se encuentra con "node /libraries/serial_server/startserver.js"
serial = new p5.SerialPort();
serial.open("/dev/ttyACM0");

let datosArduino;

// Función que trae los datos
function getValues() {
    if (serial.available() > 0) {
        datosArduino = serial.readStringUntil("\r\n");
        console.log(datosArduino);
    }
    return datosArduino;
}

// Gráfico #2, datos en tiempo real desde el puerto serie (Arduino)
let tiempoReal = new Chart(chart2, {
    type: 'line', // tipos 'line', 'bar', 'bubble' y 'scatter' soportados
    data: {
        datasets: [{
            data: [],
            label: 'Sensor de temperatura',
            borderWidth: 2,
            borderColor: 'rgb(0,100,0)',
            backgroundColor: 'rgb(0,100,0)',
        }]
    },
    options: {
        scales: {
            x: {
                type: 'realtime', // x axis will auto-scroll from right to left
                realtime: { // per-axis options
                    duration: 20000, // data in the past 20000 ms will be displayed
                    refresh: 1000, // onRefresh callback will be called every 1000 ms
                    delay: 1000, // delay of 1000 ms, so upcoming values are known before plotting a line
                    pause: false, // chart is not paused
                    ttl: undefined, // data will be automatically deleted as it disappears off the chart
                    frameRate: 30, // data points are drawn 30 times every second

                    // a callback to update datasets
                    onRefresh: chart2 => {
                        let valorX = Date.now();
                        let valorY = getValues();
                        // query your data source and get the array of {x: timestamp, y: value} objects
                        var date = { x: valorX, y: valorY };
                        // append the new data array to the existing chart data
                        chart2.data.datasets[0].data.push(date);
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperatura'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'SENSORES',
                font: {
                    weight: 'bold',
                    size: 16
                },
            },
            subtitle: {
                display: true,
                text: 'Datos en tiempo real',
                font: {
                    weight: 'italic',
                    size: 14
                },
            },
            legend: {
                position: 'bottom',
                align: 'center'
            },
            responsive: true
        }

    }
});