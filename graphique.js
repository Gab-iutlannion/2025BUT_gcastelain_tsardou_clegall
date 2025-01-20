// graphique
const graphicSection = document.getElementById('graphic-section');
const gameSection = document.getElementById('game-section');
const chronoSection = document.getElementById('chrono');
const showGraphicButton = document.getElementById('show-graphic');
const showGameButton = document.getElementById('show-game');

showGraphicButton.addEventListener('click', () => {
    graphicSection.style.display = 'block';
    gameSection.style.display = 'none';
    chronoSection.style.display = 'none';
});

showGameButton.addEventListener('click', () => {
    graphicSection.style.display = 'none';
    gameSection.style.display = 'block';
    chronoSection.style.display = 'block';
});

document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('play-section').style.display = 'block';
});



const Data = [
    { year: 1991, value: 3.2 },
    { year: 1992, value: 2.4 },
    { year: 1993, value: 2.1 },
    { year: 1994, value: 1.6 },
    { year: 1995, value: 1.8 },
    { year: 1996, value: 2 },
    { year: 1997, value: 1.2 },
    { year: 1998, value: 0.6 },
    { year: 1999, value: 0.5 },
    { year: 2000, value: 1.7 },
    { year: 2001, value: 1.6 },
    { year: 2002, value: 1.9 },
    { year: 2003, value: 2.1 },
    { year: 2004, value: 2.1 },
    { year: 2005, value: 1.7 },
    { year: 2006, value: 1.6 },
    { year: 2007, value: 1.5 },
    { year: 2008, value: 2.8 },
    { year: 2009, value: 0.1 },
    { year: 2010, value: 1.5 },
    { year: 2011, value: 2.1 },
    { year: 2012, value: 2 },
    { year: 2013, value: 0.9 },
    { year: 2014, value: 0.5 },
    { year: 2015, value: 0 },
    { year: 2016, value: 0.2 },
    { year: 2017, value: 1 },
    { year: 2018, value: 1.8 },
    { year: 2019, value: 1.1 },
    { year: 2020, value: 0.5 },
    { year: 2021, value: 1.6 },
    { year: 2022, value: 5.2 },
    { year: 2023, value: 4.9 },
];

// Function to filter data by year range
function filterDataByYear(startYear, endYear) {
return Data.filter(item => {
    return item.year >= startYear && item.year <= endYear;
});
}

// Function to extract labels and data points
function extractChartData(data) {
return {
    labels: data.map(item => item.year.toString()),
    data: data.map(item => item.value)
};
}

// Initial chart data
const initialData = extractChartData(Data);

// Create Chart.js instance
const ctx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctx, {
type: 'line',
data: {
    labels: initialData.labels,
    datasets: [{
        label: ' Taux d inflation',
        data: initialData.data,
        borderColor: '#FFD166',
        backgroundColor: '#FFD166',
        borderWidth: 3,
        tension: 0.2,
        pointRadius : 1.5,
    }]
},
options: {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Années'
            }
        },
        y: {
            title: {
                display: true,
                text: 'aux d inflation (en %)'
            }
        }
    }
}
});

const ctx2 = document.getElementById('lineChart2').getContext('2d');
const lineChart2 = new Chart(ctx2, {
type: 'line',
data: {
    labels: initialData.labels,
    datasets: [{
        label: ' Taux d inflation',
        data: initialData.data,
        borderColor: '#FFD166',
        backgroundColor: '#FFD166',
        borderWidth: 3,
        tension: 0.2,
        pointRadius : 1.5,
    }]
},
options: {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Années'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Taux d inflation (en %)'
            }
        }
    }
}
});

// Update chart on button click
document.getElementById('updateChart').addEventListener('click', () => {
const startYear = parseInt(document.getElementById('startYear').value, 10);
const endYear = parseInt(document.getElementById('endYear').value, 10);

if (isNaN(startYear) || isNaN(endYear)) {
    alert('Please enter both start and end years.');
    return;
}

const filteredData = filterDataByYear(startYear, endYear);
const chartData = extractChartData(filteredData);

lineChart.data.labels = chartData.labels;
lineChart.data.datasets[0].data = chartData.data;
lineChart.update();
});