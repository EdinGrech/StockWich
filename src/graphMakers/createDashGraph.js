

new Chart(document.getElementById("dashMainGraph"), {
    type: "line",
    data: {
        labels: stockDataLabelsDate,
        datasets: [{
            label: Stock + " " + Currency,
            fill: true,
            backgroundColor: "transparent",
            borderColor: "#007bff",
            data: stockDataClose
        }, 
        // {
        //     label: "2021 MT(€)",
        //     fill: true,
        //     backgroundColor: "transparent",
        //     borderColor: "#adb5bd",
        //     borderDash: [4, 4],
        //     data: [53.03, 51.46, 55.71, 55.58, 54.77, 56.35, 57.33, 57.45, 60.04, 62.76, 62.50, 62.26]
        // }
    ]
    },
    options: {
        scales: {
            xAxes: [{
                reverse: true,
                gridLines: {
                    color: "rgba(0,0,0,0.0.05)"
                }
            }],
            yAxes: [{
                borderDash: [5, 5],
                gridLines: {
                    color: "rgba(0,0,0,0)",
                    fontColor: "#fff"
                }
            }]
        }
    }
});