import { convertCurrency } from "../apiGetters/curencyConvert.js";


async function createChart(){
    let info = constructData();
    console.log(info);
    
    //call currency convertor
    info = await localCurrencyConvertor(info);
    let extra = info._;
    info = info.info;

    document.getElementById("mainGraphTit").innerHTML = info.Stock + " in " + info.Currency;
    document.getElementById("mainGraphSubTit").innerHTML = "From " + info.startDate + " to " + info.endDate + " currency exchange rate last updated "+ new Date(extra.time*1000).toLocaleDateString() + " at " + new Date(extra.time).toLocaleTimeString();
    setCanvasSize()
    let mainLine = new Chart(document.getElementById("dashMainGraph"), {
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
            },
            {
                label: "High Price",
                fill: true,
                backgroundColor: "transparent",
                borderColor: "rgb(96, 235, 41)",
                borderDash: [30, 5],
                data: info.stockDataHigh,
            },
            {
                label: "Low Price",
                fill: true,
                backgroundColor: "transparent",
                borderColor: "rgb(230, 84, 65)",
                borderDash: [30, 5],
                data: info.stockDataLow,
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

    let mainBar = new Chart(document.getElementById("dashMainGraphBar"), {
        type: "bar",
        data: {
          labels: info.stockDataLabelsDate,
          datasets: [
            {
            label: "Volume of Stock",
            backgroundColor: window.theme.primary,
            borderColor: window.theme.primary,
            hoverBackgroundColor: window.theme.primary,
            hoverBorderColor: window.theme.primary,
            data: info.stockDataVolume,
            barPercentage: .75,
            categoryPercentage: .5
          }, 
        ]
        },
        options: {
          scales: {
            yAxes: [{
              gridLines: {
                display: false
              },
              stacked: false
            }],
            xAxes: [{
              stacked: false,
              gridLines: {
                color: "transparent"
              }
            }]
          }
        }
      });

      return {mainLine, mainBar};
}

async function localCurrencyConvertor(info){
    //convert currency
    let curAdjustBack2USD = await convertCurrency("USD");
    let _ = await convertCurrency(info.Currency);
    console.log(info.Currency + " " + _ + " " + _.exchangeRate + " " + _.time + " " + curAdjustBack2USD.exchangeRate);
    let exchangeRate = _.exchangeRate;
    console.log(_.time);

    //let exchangerRateTime = new Date(_.time.toLocaleDateString()); //display info as some point
    console.log(info.stockDataClose + " " + info.stockDataOpen + " " + info.stockDataHigh + " " + info.stockDataLow);

    info.stockDataClose.forEach(element => { 
        let elementAdj = element / curAdjustBack2USD.exchangeRate;
        elementAdj = element * exchangeRate;
        console.log(elementAdj);
        //replace element in array
        info.stockDataClose[info.stockDataClose.indexOf(element)] = elementAdj;
    });
    console.log(info.stockDataClose);

    info.stockDataOpen.forEach(element => {
        let elementAdj = element / curAdjustBack2USD.exchangeRate;
        elementAdj = element * exchangeRate;
        console.log(elementAdj);
        //replace element in array
        info.stockDataOpen[info.stockDataOpen.indexOf(element)] = elementAdj;
    }
    );

    info.stockDataHigh.forEach(element => {
        let elementAdj = element / curAdjustBack2USD.exchangeRate;
        elementAdj = element * exchangeRate;
        console.log(elementAdj);
        //replace element in array
        info.stockDataHigh[info.stockDataHigh.indexOf(element)] = elementAdj;
    }
    );

    info.stockDataLow.forEach(element => {
        let elementAdj = element / curAdjustBack2USD.exchangeRate;
        elementAdj = element * exchangeRate;
        console.log(elementAdj);
        //replace element in array
        info.stockDataLow[info.stockDataLow.indexOf(element)] = elementAdj;
    }
    );

    console.log(info.stockDataClose+ " " + info.stockDataOpen + " " + info.stockDataHigh + " " + info.stockDataLow);
    return {info, _};
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
    let stockDataHigh = [];
    let stockDataLow = [];
    let stockDataVolume = [];

    for (let i = 0; i < stockData.data.length; i++) {
        stockDataLabelsDate.push(stockData.data[i].Date);
        stockDataLabelsDate[i] = new Date(stockDataLabelsDate[i]).toLocaleDateString();
        stockDataClose.push(stockData.data[i].Close);
        stockDataOpen.push(stockData.data[i].Open);
        stockDataHigh.push(stockData.data[i].High);
        stockDataLow.push(stockData.data[i].Low);
        stockDataVolume.push(stockData.data[i].Volume);
    }
    console.log(stockDataLabelsDate);
    console.log(stockDataClose);

    return {stockDataLabelsDate, stockDataClose, stockDataOpen, stockDataHigh, stockDataLow, stockDataVolume, Stock, Currency, startDate, endDate};
}

function setCanvasSize(){
    //clear width and height
    let canvas = document.getElementById("dashMainGraph");
    canvas.width = window.innerWidth;
    canvas.height = (2*window.innerHeight)/3;
    canvas = document.getElementById("dashMainGraphBar");
    canvas.width = window.innerWidth;
    canvas.height = (2*window.innerHeight)/3;
}

let mainGraphs = await createChart();

window.addEventListener("resize", function(){
    setCanvasSize();
    mainGraphs.mainLine.destroy();
    mainGraphs.mainBar.destroy();
    mainGraphs = createChart();
});

document.getElementById("stockLineOpen").onclick = function(){
    //toggle Opening Price from graphLineData
    mainGraphs.mainLine.data.datasets[1].hidden = !mainGraphs.mainLine.data.datasets[1].hidden;
    mainGraphs.mainLine.update();
    //change  icon class to show if hidden or not
    if(mainGraphs.mainLine.data.datasets[1].hidden){
        document.getElementById("stockLineOpenIco").classList = "fs-6 bi-eye-slash";
    }else{
        document.getElementById("stockLineOpenIco").classList = "fs-6 bi-eye";
    }
}

document.getElementById("stockLineHigh").onclick = function(){
    //toggle High Price from graphLineData
    mainGraphs.mainLine.data.datasets[2].hidden = !mainGraphs.mainLine.data.datasets[2].hidden;
    mainGraphs.mainLine.update();
    //change  icon class to show if hidden or not
    if(mainGraphs.mainLine.data.datasets[2].hidden){
        document.getElementById("stockLineHighIco").classList = "fs-6 bi-eye-slash";
    }else{
        document.getElementById("stockLineHighIco").classList = "fs-6 bi-eye";
    }
}

document.getElementById("stockLineLow").onclick = function(){
    //toggle Low Price from graphLineData
    mainGraphs.mainLine.data.datasets[3].hidden = !mainGraphs.mainLine.data.datasets[3].hidden;
    mainGraphs.mainLine.update();
    //change  icon class to show if hidden or not
    if(mainGraphs.mainLine.data.datasets[3].hidden){
        document.getElementById("stockLineLowIco").classList = "fs-6 bi-eye-slash";
    }else{
        document.getElementById("stockLineLowIco").classList = "fs-6 bi-eye";
    }
}

document.getElementById("stockLineClose").onclick = function(){
    //toggle Low Price from graphLineData
    mainGraphs.mainLine.data.datasets[0].hidden = !mainGraphs.mainLine.data.datasets[0].hidden;
    mainGraphs.mainLine.update();
    //change  icon class to show if hidden or not
    if(mainGraphs.mainLine.data.datasets[0].hidden){
        document.getElementById("stockLineCloseIco").classList = "fs-6 bi-eye-slash";
    }else{
        document.getElementById("stockLineCloseIco").classList = "fs-6 bi-eye";
    }
}

