import { getStockPrices } from './getStockPrices.js';

document.getElementById("loadGraphFromForm").addEventListener("click", function() {
    //get form data
    let formData = getFormData();
    if(!formData){return};
    let Stock = formData[2];
    let Currency = formData[3];
    let startDate = formData[0];
    let endDate = formData[1];

    // get data from API
    let stockData = getStockPrices(Stock, startDate, endDate);
    console.log(stockData);

    //parse json
    stockData.then(data => JSON.parse(data));
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
    stockData.then(data => {
        for (let i = 0; i < data.data.length; i++) {
            stockDataLabelsDate.push(data.data[i].Date);
            //change date format
            stockDataLabelsDate[i] = new Date(stockDataLabelsDate[i]).toLocaleDateString();
            stockDataClose.push(data.data[i].Close);
        }
    });
    console.log(stockDataLabelsDate);
    console.log(stockDataClose);

    //change to dashboard page
    document.location.href="/Dash.html";
    // create chart
    
});

function getFormData(){
    document.getElementById("startDate").classList.remove("is-invalid");
    document.getElementById("endDate").classList.remove("is-invalid");
    document.getElementById("Stock").classList.remove("is-invalid");
    document.getElementById("Currency").classList.remove("is-invalid");
    
    try{
        let error = false;
        try {
            var startDate = document.getElementById("startDate").value;
            //console.log(startDate);
            if(!startDate){throw "Start date is empty"};
        } catch (error) {
            //console.log(error);
            document.getElementById("startDate").classList.add("is-invalid");
            error = true;
        }
        try {
            var endDate = document.getElementById("endDate").value;
            //console.log(endDate);
            if(!endDate){throw "End ate is empty"};
            if(startDate > endDate){throw "startDate is greater than endDate"}
        } catch (error) {
            //console.log(error);
            document.getElementById("endDate").classList.add("is-invalid");
            error = true;
        }
        try {
            //substring of value in brackets using regex
            var Stock = document.getElementById("Stock").value.match(/\(([^)]+)\)/)[1];
            //console.log(Stock);
            if(!Stock){throw "Stock is empty"};
        } catch (error) {
            //console.log(error);
            document.getElementById("Stock").classList.add("is-invalid");
            error = true;
        }
        try {
            var Currency = document.getElementById("Currency").value.substring(0,3);
            //console.log(Currency);
            if(!Currency){throw "Currency is empty"};
        } catch (error) {
            //console.log(error);
            document.getElementById("Currency").classList.add("is-invalid");
            error = true;
        }
        if(error){throw "error"};
        return [startDate, endDate, Stock, Currency];
    }catch(error){
        console.log("error"+error);
        //exit out of function
        return;
    }
};