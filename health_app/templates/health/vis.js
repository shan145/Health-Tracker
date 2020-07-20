var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');
// Use this function to get the start of this current week
function getSundayDate(d) {
    d = new Date(d);
    let day = d.getDay();
    let diff = d.getDate()-day;
    return new Date(d.setDate(diff))
};

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
        lineTension: 0,
        label: "Weight",
        borderColor: "#3e95cd",
        fill: false
    }],
    ids: [
        {% for health in health_data %}
            "{{ health['health_id'] }}",
        {% endfor %}
    ]
};

// Used to get this weeks' dates
let maxDate = new Date();
let minDate = getSundayDate(new Date());
maxDate.setDate(minDate.getDate() + 6); 
let maxDateOnly = (maxDate.getMonth()+1) + "/" + maxDate.getDate() + "/" + maxDate.getFullYear();
let minDateOnly = (minDate.getMonth()+1) + "/" + minDate.getDate() + "/" + minDate.getFullYear();
console.log(maxDateOnly);
console.log(minDateOnly);


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
                    "day": "MM/DD (dddd)"
                },
                min: minDateOnly,
                max: maxDateOnly
            },
            scaleLabel: {
                display: true,
                labelString: 'Date'
            }
        }]
    },
    legend: {
        display: false,
        position: "right",
        align: "end",
    }
}

// Creates chart data in HTML canvas
var chart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions
});

// Registers click event for line graph
canvas.onclick = function(evt) {
    var activePoint = chart.getElementAtEvent(evt);
    // Ensures point on graph is clicked before opening modal
    if(Object.keys(activePoint).length !== 0) {
        // Gets info on clicked point
        let clickedID = chartData.ids[activePoint[0]._index];
        let clickedWeight = chartData.datasets[activePoint[0]._datasetIndex].data[activePoint[0]._index];
        let clickedDate = chartData.labels[activePoint[0]._index];
        //Shows modal box through jquery
        $(document).ready(function(){
            $("#exampleModal").modal('show');
        });

        //Creates links for buttons in dashboard
        $("#saveFormID").attr("action", "/dashboard/edit/"+clickedID.toString());
        $('#delete').attr("href", "/dashboard/delete/"+clickedID.toString());
        
        //Assigns values to modal box via clicked point
        $("#weightForm").val(clickedWeight);
        $("#dateForm").val(clickedDate);
    }
};