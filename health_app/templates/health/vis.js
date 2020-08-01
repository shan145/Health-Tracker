var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');

/*
 * Used to get start of the current week
 */
function getSundayDate(d) {
    d = new Date(d);
    let day = d.getDay();
    let diff = d.getDate()-day;
    return new Date(d.setDate(diff))
};

/*
 * Used to store cookies for website usage
 */
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}

/*
 * Creates visualization charts
 */
function createChart() {
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

    // Used to get this weeks' dates, and sets week option format
    let minDate = getSundayDate(new Date());
    let minDateOnly = (minDate.getMonth()+1) + "/" + minDate.getDate() + "/" + minDate.getFullYear();
    minDate.setDate(minDate.getDate() + 6); 
    let maxDateOnly = (minDate.getMonth()+1) + "/" + minDate.getDate() + "/" + minDate.getFullYear();
    let weekOption = [{
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
    }];

    // Calculates this month's dates, and sets month option format
    let date = new Date();
    let minMonthDate = new Date();
    let maxMonthDate = new Date();
    minMonthDate.setFullYear(date.getFullYear(), date.getMonth(), 1);
    maxMonthDate.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);
    let minMonthDateOnly = (minMonthDate.getMonth()+1) + "/" + minMonthDate.getDate() + "/" + minMonthDate.getFullYear();
    let maxMonthDateOnly = (maxMonthDate.getMonth()+1) + "/" + maxMonthDate.getDate() + "/" + maxMonthDate.getFullYear();
    let monthOption = [{
        type: "time",
        time: {
            parser: "MM/DD/YYYY",
            tooltipFormat: "ll",
            unit: "day",
            displayFormats: {
                "day": "MM/DD"
            },
            min: minMonthDateOnly,
            max: maxMonthDateOnly
        },
        scaleLabel: {
            display: true,
            labelString: 'Date'
        }
    }];

    //Calculates dates for this year, and sets this year option format
    let minYearDate = new Date();
    let maxYearDate = new Date();
    minYearDate.setFullYear(date.getFullYear(), 0, 1);
    maxYearDate.setFullYear(date.getFullYear(), 11, 31);
    let minYearDateOnly = (minYearDate.getMonth()+1) + "/" + minYearDate.getDate() + "/" + minMonthDate.getFullYear();
    let maxYearDateOnly = (maxYearDate.getMonth()+1) + "/" + maxYearDate.getDate() + "/" + maxYearDate.getFullYear();
    let yearOption = [{
        type: "time",
        time: {
            parser: "MM/DD/YYYY",
            tooltipFormat: "ll",
            unit: "month",
            stepSize: 1,
            displayFormats: {
                "day": "MMM"
            },
            min: minYearDateOnly,
            max: maxYearDateOnly
        },
        scaleLabel: {
            display: true,
            labelString: 'Date'
        }
    }];

    // Chart options for week
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
            xAxes: weekOption
        },
        legend: {
            display: false,
            position: "right",
            align: "end",
        }
    };

    //Chart options for month
    let chartMonthOptions = {
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
            xAxes: monthOption
        },
        legend: {
            display: false,
            position: "right",
            align: "end",
        }
    };

    // Chart options for year
    let chartYearOptions = {
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
            xAxes: yearOption
        },
        legend: {
            display: false,
            position: "right",
            align: "end",
        }
    };

    //Use this to set up initial cookie calls
    let currCookieValue = getCookie('chartType');
    let chartCookieValue; 
    if(currCookieValue != null) {
        chartCookieValue = document.cookie.split('; ').find(row => row.startsWith('chartType')).split('=')[1];
    }
    // Finds the last selected chart through cookie to stay on selected graph
    let currOptions = chartOptions;
    if(chartCookieValue === 'week') {
        currOptions = chartOptions;
    }
    else if(chartCookieValue === 'month') {
        currOptions = chartMonthOptions;
    }
    else if(chartCookieValue === 'year') {
        currOptions = chartYearOptions;
    }
    // Creates chart data in HTML canvas
    let chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: currOptions
    });

    // Update charts according to button clicks
    $("#week").click( function() {
        chart.destroy();
        document.cookie = "chartType=week;";
        chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    });
    $("#month").click( function() {
        chart.destroy();
        document.cookie = "chartType=month;";
        chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartMonthOptions
        });
    });
    $("#year").click( function() {
        chart.destroy();
        document.cookie = "chartType=year;";
        chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartYearOptions
        });
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
            $("#graphModal").modal('show');

            //Creates links for buttons in dashboard
            $("#saveFormID").attr("action", "/dashboard/edit/"+clickedID.toString());
            $('#delete').attr("href", "/dashboard/delete/"+clickedID.toString());
            
            //Assigns values to modal box via clicked point
            $("#weightForm").val(clickedWeight);
            $("#dateForm").val(clickedDate);
        }
    };
};

// Call when document is ready
$(document).ready(function(){
    var csrf_token = "{{ csrf_token() }}";
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrf_token);
            }
        }
    });

    createChart();
});

