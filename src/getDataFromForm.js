import { getStockPrices } from './getStockPrices.js';

document.getElementById("loadGraphFromForm").addEventListener("click", function() {
    document.getElementById("startDate").classList.remove("is-invalid");
    document.getElementById("endDate").classList.remove("is-invalid");
    document.getElementById("Stock").classList.remove("is-invalid");
    document.getElementById("Currency").classList.remove("is-invalid");
    //change to dashboard page
    //document.location.href="#dashboard";
    // get date from element with id startDate and startEnd
    try {
        const startDate = document.getElementById("startDate").value;
        if(!endDate){throw "Start date is empty"};
    } catch (error) {
        document.getElementById("startDate").classList.add("is-invalid");
        return;
    }
    try {
        const endDate = document.getElementById("endDate").value;
        if(!endDate){throw "End ate is empty"};
        if(startDate > endDate){throw "startDate is greater than endDate"}
    } catch (error) {
        document.getElementById("endDate").classList.add("is-invalid");
        return;
    }
    try {
        const Stock = document.getElementById("Stock").value;
        if(!Stock){throw "Stock is empty"};
    } catch (error) {
        document.getElementById("Stock").classList.add("is-invalid");
        return;
    }
    try {
        const Currency = document.getElementById("Currency").value;
        if(!Currency){throw "Currency is empty"};
    } catch (error) {
        document.getElementById("Currency").classList.add("is-invalid");
        return;
    }
    
    // get data from API
    let stockData = getStockPrices(Stock, startDate, endDate);
    //split data into two arrays
    let stockDataLabels = stockData.then(data => Object.keys(data));
    let stockDataValues = stockData.then(data => Object.values(data));
    console.log(stockDataLabels);
    //spilt date into two arrays
    let stockDataLabelsDate = stockDataLabels.then(data => data.map(date => date.split("-")[2]));
    let stockDataLabelsMonth = stockDataLabels.then(data => data.map(date => date.split("-")[1]));
    // console.log(stockDataLabelsDate);
    console.log(stockDataLabelsMonth);
    // create chart
    new Chart(document.getElementById("dashMainGraph"), {
        type: "line",
        data: {
            labels: stockDataLabelsDate,
            datasets: [{
                label: Stock + " " + Currency,
                fill: true,
                backgroundColor: "transparent",
                borderColor: "#007bff",
                data: stockDataValues
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
});