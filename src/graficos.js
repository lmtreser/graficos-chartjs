let chart1 = document.getElementById('cizq').getContext('2d');
let chart2 = document.getElementById('cder').getContext('2d');

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

let realtime = new Chart(chart2, {
    type: 'line',
    data: {
        datasets: [{
            data: [60, 18, 10, 8, 4],
            borderWidth: 2,
            borderColor: 'rgb(165,42,42)',
            backgroundColor: 'rgb(165,42,42)',
            label: 'DHT11'
        }],
        labels: ['10:00', '11:00', '12:00', '13:00', '14:00']
    },
    options: {
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