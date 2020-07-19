// health_app/templates/health/vis.js

/**
 * Creates visualizations for weight data using Chart.js
 */

// Chart data from DB (passed via render_template)
let chartData = {
    labels: [
        {% for health in health_data %}
            "{{ health['date'] }}",
        {% endfor %}
    ],
    datasets: [{
        data: [
            {% for health in health_data %}
                {{ health['weight'] }},
            {% endfor %}
        ],
        label: "Weight",
        borderColor: "#3e95cd",
        fill: true
    }]
};

// Used to get this weeks' dates
let maxDate = new Date();
let minDate = new Date();
const numberOfDays = 3;
maxDate.setDate(maxDate.getDate() + numberOfDays); 
minDate.setDate(minDate.getDate() - numberOfDays);
console.log(maxDate);
console.log(minDate);


// Chart options for pretty display
let chartOptions = {
    scales: {
        yAxes: [{
            ticks: {
                suggestedMin: 100,
                suggestedMax: 200
            },
            scaleLabel: {
                display: true,
                labelString: 'Weight (lbs)'
            }
        }],
        xAxes: [{
            type: "time",
            time: {
                parser: "MM/DD/YYYY",
                tooltipFormat: "ll",
                unit: "day",
                displayFormats: {
                    "day": "MM/DD/YYYY"
                },
                min: minDate,
                max: maxDate
            },
            scaleLabel: {
                display: true,
                labelString: 'Date'
            }
        }]
    },
    legend: {
        display: true,
        position: "right",
        align: "end",
    }
}
// Creates chart data in HTML canvas
new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: chartData,
    options: chartOptions
});
