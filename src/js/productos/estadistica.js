import { Dropdown } from "bootstrap";
import Chart from 'chart.js/auto';
import { getEntrySpanEnd } from "fullcalendar";

const canvas = document.getElementById('chartVentas');
const ctx = canvas.getContext('2d');
const btnActualizar = document.getElementById('actualizar');

const data = {
    labels: [],
    datasets: [{
        label: 'Ventas',
        data: [],
        borderWidth: 5,
        backgroudColor: []
    }]
}

const chartProductos = new Chart(ctx, {
    type: 'bar',
    data: data,
});


const getEstadisticas = async () => {
    const url = `/chart_js/API/detalle/estadistica`
    const config = {method : "GET"}
    const response = await fetch(url, config)
    const data = await response.json()

    if(data){
        if(chartProductos.data.datasets[0]) {
            chartProductos.data.labels = data.labels
            chartProductos.data.datasets[0].data = [];
            chartProductos.data.datasets[0].backgroundColor = [];

            data.forEach(r => {
                chartProductos.data.labels.push(r.producto);
                chartProductos.data.datasets[0].data.push(r.cantidad);
                chartProductos.data.datasets[0].backgroundColor.push(generateRandomColor());
            });
        }
    }

    chartProductos.update();
}

const generateRandomColor = () => {
    const r = Math.floor(Math.random() *256);
    const g = Math.floor(Math.random() *256);
    const b = Math.floor(Math.random() *256);

    const rgbColor = `rgb(${r}), ${g}, ${b}`;
    return rgbColor;
}

btnActualizar.addEventListener('click', getEstadisticas);