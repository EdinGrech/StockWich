import { convertCurrency } from "../apiGetters/curencyConvert.js";

function createChart(){
    let info = constructData();
    console.log(info);
    
    let curAdjustBack2USD = convertCurrency("USD").exchangeRate;
    let _ = convertCurrency(info.Currency);
    let exchangeRate = _.exchangeRate;
    let exchangerRateTime = _.time; //display info as some point
    info.stockDataClose.forEach(element => { 
        element = element / curAdjustBack2USD;
        element = element * exchangeRate;
        console.log(element);
    });
    console.log(info.stockDataClose);
    document.getElementById("mainGraphTit").innerHTML = info.Stock + " in " + info.Currency;
    new Chart(document.getElementById("dashMainGraph"), {
        type: "line",
        data: {
            labels: info.stockDataLabelsDate,
            datasets: [{
                label: "Closing Price",
                fill: true,
                backgroundColor: "transparent",
                borderColor: "#007bff",
                data: info.stockDataClose,
            }, 
            {
                label: "Opening Price",
                fill: true,
                backgroundColor: "transparent",
                borderColor: "rgb(178, 49, 218)",
                borderDash: [18, 3],
                data: info.stockDataOpen,
            }
        ]
        },
        options: {
            scales: {
                xAxes: [{
                    reverse: true,
                    gridLines: {
                        color: "rgb(207, 159, 2, 0.2)",
                    },
                    ticks: {
                        fontColor: "#000000"
                    }
                }],
                yAxes: [{
                    borderDash: [5, 5],
                    gridLines: {
                        color: "rgb(207, 159, 2, 0.9)",
                        fontColor: "#fff"
                    },
                    ticks: {
                        fontColor: "#000000"
                    }
                }]
            },
        }
    });
}

function constructData(){

    //get data from local storage
    let Stock = localStorage.getItem('Stock');
    let Currency = localStorage.getItem('Currency');
    let startDate = localStorage.getItem('startDate');
    let endDate = localStorage.getItem('endDate');

    console.log(Stock);
    console.log(Currency);
    console.log(startDate);
    console.log(endDate);

    //get saved local storage data
    let stockData= localStorage.getItem('stockData');
    console.log(stockData);
    stockData = JSON.parse(stockData);
    console.log(stockData);
    //jason data
    // {
        // data{
        //     [
            //     {
            //         "Adj Close": 156.9399871826,
            //         "Close": 157.6499938965,
            //         "Date": 1651190400000,
            //         "High": 166.1999969482,
            //         "Low": 157.25,
            //         "Open": 161.8399963379,
            //         "Volume": 131747600
            //     }
        //     ],
        //     "message": "Success",
        //     "status": 200
        // }
    // }

    //get data from json
    let stockDataLabelsDate = [];
    let stockDataClose = [];
    let stockDataOpen = [];
    for (let i = 0; i < stockData.data.length; i++) {
        stockDataLabelsDate.push(stockData.data[i].Date);
        //change date format
        stockDataLabelsDate[i] = new Date(stockDataLabelsDate[i]).toLocaleDateString();
        stockDataClose.push(stockData.data[i].Close);
        stockDataOpen.push(stockData.data[i].Open);
    }
    console.log(stockDataLabelsDate);
    console.log(stockDataClose);

    return {stockDataLabelsDate, stockDataClose, stockDataOpen, Stock, Currency, startDate, endDate};
}

createChart();