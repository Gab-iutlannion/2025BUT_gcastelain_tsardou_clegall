// Annaelle : 1min10 - 2100 pts
// Mael : 49sec - 700pts
// Youna et Cylea : 2min 11sec - 700pts
// Antonin : 50sec - -200pts
// Elijah : 1min15 - -300pts


// Graphique
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
    { year: 2003, value: 2.2 },
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




//Jeu


let index = 0;
let score = 0;
let visibleData = [initialData.data[0]];

const ctx2 = document.getElementById('lineChart2').getContext('2d');
const lineChart2 = new Chart(ctx2, {
type: 'line',
data: {
    labels: initialData.labels.map((_, i) => (i <= index ? initialData.labels[i] : '')),
    datasets: [{
        label: ' Taux d inflation',
        data: visibleData,
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

// Paramétrage du graphiqe 
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

// Restart du graphiqe 
document.getElementById('restartChart').addEventListener('click', () => {
    lineChart.data.labels = initialData.labels;
    lineChart.data.datasets[0].data = initialData.data;
    lineChart.update();
})


function verifyData(prediction){
    let instantValue = initialData.data[index];
    let nextValue = initialData.data[index + 1];

    if ((index +2) == Data.length){
        stop();
        document.getElementById('stop').style.display = 'none';
    }
    else{

        let gain = 500 / instantValue;
        const arrondi = Math.round(gain);
        document.getElementById('gain-perte').innerText = `${arrondi} €`;
    
        if (instantValue < nextValue && prediction === 'up'){
            score+= 100;
            index++;
        }
        else if (instantValue > nextValue && prediction === 'down'){
            score+= 100;
            index++;
        }
        else{
            score-= 100;
            index++;
        }
    
    }


    visibleData.push(nextValue);
    updateChart();
    document.getElementById('points').innerText = `Score : ${score}`;
}


const up = document.getElementById('upButton');
const down = document.getElementById('downButton');
up.addEventListener('click', () => verifyData('up'));
down.addEventListener('click', () => verifyData('down'));

// mise à jour du graphique
function updateChart() {
    lineChart2.data.datasets[0].data = visibleData;
    lineChart2.data.labels = initialData.labels.map((_, i) => (i <= index ? initialData.labels[i] : ''));
    lineChart2.update();
}


// reset du temps et du score
function reset() {
    score = 0;
    index = 0;
    visibleData = [initialData.data[0]];
    document.getElementById('stop').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
    updateChart();
    document.getElementById('points').innerText = `Score : ${score}`;
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById('time').textContent = "00:00:00";
    document.getElementById('start-section').style.display = 'block';
    document.getElementById('interface-jeu').style.display = 'none';
    
}

// Stop le chronomètre
function stop() {
    clearInterval(timerInterval);
}

document.getElementById('stop').addEventListener('click', stop);
document.getElementById('stop').style.display = 'none';
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('reset').style.display = 'none';





