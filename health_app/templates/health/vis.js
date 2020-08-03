var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');

/*
 * Use this function to get the start of this current week
 */
function getSundayDate(d) {
    d = new Date(d);
    let day = d.getDay();
    let diff = d.getDate()-day;
    return new Date(d.setDate(diff))
};

/*     
 * Use this function to create initial chart for week and then store other chart type cookie for session use
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
 * Gets week option and uses n to decide how far to move
 */
function getWeekOptions(n) {
    // Used to get this weeks' dates, and sets week option format
    let minDate = getSundayDate(new Date());
    minDate.setDate(minDate.getDate()+(7*n));
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
            
        },
        ticks: {
            min: minDateOnly,
            max:maxDateOnly
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
        plugins: {
            zoom: {
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,
        
                    // Panning directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow panning in the y direction
                    // A function that is called as the user is panning and returns the
                    // available directions can also be used:
                    //   mode: function({ chart }) {
                    //     return 'xy';
                    //   },
                    mode: 'x',
        
                    rangeMin: {
                        // Format of min pan range depends on scale type
                        x: null,
                        y: null
                    },
                    rangeMax: {
                        // Format of max pan range depends on scale type
                        x: null,
                        y: null
                    },
        
                    // On category scale, factor of pan velocity
                    speed: 5,
        
                    // Minimal pan distance required before actually applying pan
                    threshold: 5
                }
            }
        },
        legend: {
            display: false,
            position: "right",
            align: "end",
        }
    };

    return chartOptions;
}

/*
 * Gets month option and uses n to decide how far to move
 */
function getMonthOptions(n) {
    // Calculates this month's dates, and sets month option format
    let date = new Date();
    let minMonthDate = new Date();
    let maxMonthDate = new Date();
    minMonthDate.setFullYear(date.getFullYear(), date.getMonth()+n, 1);
    maxMonthDate.setFullYear(date.getFullYear(), date.getMonth() + 1 + n, 0);
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
            }
        },
        ticks: {
            min: minMonthDateOnly,
            max: maxMonthDateOnly
        },
        scaleLabel: {
            display: true,
            labelString: 'Date'
        }
    }];
    
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
        plugins: {
            zoom: {
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,
        
                    // Panning directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow panning in the y direction
                    // A function that is called as the user is panning and returns the
                    // available directions can also be used:
                    //   mode: function({ chart }) {
                    //     return 'xy';
                    //   },
                    mode: 'x',
        
                    rangeMin: {
                        // Format of min pan range depends on scale type
                        x: null,
                        y: null
                    },
                    rangeMax: {
                        // Format of max pan range depends on scale type
                        x: null,
                        y: null
                    },
        
                    // On category scale, factor of pan velocity
                    speed: 5,
        
                    // Minimal pan distance required before actually applying pan
                    threshold: 5
                }
            }
        },
        legend: {
            display: false,
            position: "right",
            align: "end",
        }
    };

    return chartMonthOptions;
}

/*
 * Gets year option and uses n to decide how far to move
 */
function getYearOptions(n) {
    //Calculates dates for this year, and sets this year option format
    let date = new Date();
    let minYearDate = new Date();
    let maxYearDate = new Date();
    minYearDate.setFullYear(date.getFullYear(), 0, 1);
    maxYearDate.setFullYear(date.getFullYear(), 11, 31);
    let minMonthDate = new Date();
    let maxMonthDate = new Date();
    minMonthDate.setFullYear(date.getFullYear()+n, date.getMonth(), 1);
    maxMonthDate.setFullYear(date.getFullYear()+n, date.getMonth() + 1, 0);
    let minYearDateOnly = (minYearDate.getMonth()+1) + "/" + minYearDate.getDate() + "/" + minMonthDate.getFullYear();
    let maxYearDateOnly = (maxYearDate.getMonth()+1) + "/" + maxYearDate.getDate() + "/" + maxMonthDate.getFullYear();
    let yearOption = [{
        type: "time",
        time: {
            parser: "MM/DD/YYYY",
            tooltipFormat: "ll",
            unit: "month",
            stepSize: 1,
            displayFormats: {
                "day": "MMM"
            } 
        },
        ticks: {
            min: minYearDateOnly,
            max: maxYearDateOnly
        },
        scaleLabel: {
            display: true,
            labelString: 'Date'
        }
    }];
    
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
        plugins: {
            zoom: {
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,
        
                    // Panning directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow panning in the y direction
                    // A function that is called as the user is panning and returns the
                    // available directions can also be used:
                    //   mode: function({ chart }) {
                    //     return 'xy';
                    //   },
                    mode: 'xy',
        
                    rangeMin: {
                        // Format of min pan range depends on scale type
                        x: null,
                        y: 0
                    },
                    rangeMax: {
                        // Format of max pan range depends on scale type
                        x: null,
                        y: 200
                    },
        
                    // On category scale, factor of pan velocity
                    speed: 5,
        
                    // Minimal pan distance required before actually applying pan
                    threshold: 5
                },

                // Container for zoom options
                zoom: {
                    enabled: true,
                    mode: 'xy',
                    rangeMin: {
                        x: minYearDate,
                        y: 0
                    },
                    rangeMax: {
                        x:maxYearDate,
                        y:200
                    },
                    speed: 0.1,
                    threshold: 2,
                    sensitivity: 3
                }
            }
        },
        legend: {
            display: false,
            position: "right",
            align: "end",
        }
    };

    return chartYearOptions;
}

/*
 * Creates ChartJS with given parameters and utilizes cookies to save past data
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


    //Use this to set up initial cookie calls
    let currCookieValue = getCookie('chartType');
    let chartValue; 
    if(currCookieValue != null) {
        chartValue = document.cookie.split('; ').find(row => row.startsWith('chartType')).split('=')[1];
    } else {
        document.cookie="chartType=week;"
    }

    // Use cookies and move by weeks
    let weekCookieValue = getCookie('weekType');
    let weekValue;
    if(weekCookieValue != null) {
        weekValue = document.cookie.split('; ').find(row => row.startsWith('weekType')).split('=')[1];
    } else {
        document.cookie="weekType=0;"
        weekValue = "0";
    }
    let moveWeeks = Number(weekValue);

    // Use cookies and move by months
    let monthCookieValue = getCookie('monthType');
    let monthValue;
    if(monthCookieValue != null) {
        monthValue = document.cookie.split('; ').find(row => row.startsWith('monthType')).split('=')[1];
    } else {
        document.cookie="monthType=0;"
        monthValue = "0";
    }
    let moveMonths = Number(monthValue);

    // Use cookies and move by years
    let yearCookieValue = getCookie('yearType');
    let yearValue;
    if(yearCookieValue != null) {
        yearValue = document.cookie.split('; ').find(row => row.startsWith('yearType')).split('=')[1];
    } else {
        document.cookie="yearType=0;"
        yearValue = "0";
    }
    let moveYears = Number(yearValue);

    // Finds the last selected chart through cookie to stay on selected graph
    let currOptions = getWeekOptions(moveWeeks);
    if(chartValue === 'month') {
        currOptions = getMonthOptions(moveMonths);
    }
    else if(chartValue === 'year') {
        currOptions = getYearOptions(moveYears);
    }

    // Creates chart data in HTML canvas
    let chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: currOptions
    });

    // Update charts according to week, month, and year clicks
    $("#week").click( function() {
        chart.destroy();
        document.cookie = "chartType=week;";
        chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: getWeekOptions(moveWeeks)
        });
    });
    $("#month").click( function() {
        chart.destroy();
        document.cookie = "chartType=month;";
        chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: getMonthOptions(moveMonths)
        });
    });
    $("#year").click( function() {
        chart.destroy();
        document.cookie = "chartType=year;";
        chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: getYearOptions(moveYears)
        });
    });

    // Update charts according to left/right clicks
    $("#left").click( function() {
        chart.destroy();
        let currCookieValue = getCookie('chartType');
        let chartCookieValue; 
        if(currCookieValue != null) {
            chartCookieValue = document.cookie.split('; ').find(row => row.startsWith('chartType')).split('=')[1];
        }
        let thisOptions;
        if(chartCookieValue === 'week') {
            moveWeeks--;
            document.cookie="weekType="+moveWeeks+";";
            thisOptions = getWeekOptions(moveWeeks);
        }
        else if(chartCookieValue === 'month') {
            moveMonths--;
            document.cookie="monthType="+moveMonths+";";
            thisOptions = getMonthOptions(moveMonths);
        }
        else if(chartCookieValue === 'year') {
            moveYears--;
            document.cookie="yearType="+moveYears+";";
            thisOptions = getYearOptions(moveYears);
        }
        chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: thisOptions
        })
    });
    $("#right").click( function() {
        chart.destroy();
        let currCookieValue = getCookie('chartType');
        let chartCookieValue; 
        if(currCookieValue != null) {
            chartCookieValue = document.cookie.split('; ').find(row => row.startsWith('chartType')).split('=')[1];
        }
        let thisOptions;
        if(chartCookieValue === 'week') {
            moveWeeks++;
            document.cookie="weekType="+moveWeeks+";";
            thisOptions = getWeekOptions(moveWeeks);
        }
        else if(chartCookieValue === 'month') {
            moveMonths++;
            document.cookie="monthType="+moveMonths+";";
            thisOptions = getMonthOptions(moveMonths);
        }
        else if(chartCookieValue === 'year') {
            moveYears++;
            document.cookie="yearType="+moveYears+";";
            thisOptions = getYearOptions(moveYears);
        }
        chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: thisOptions
        })

    })


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