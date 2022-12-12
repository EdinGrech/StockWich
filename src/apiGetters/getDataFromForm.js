import { getStockPrices } from './getStockPrices.js';

document.getElementById("loadGraphFromForm").addEventListener("click", async function() {
    //get form data
    let formData = getFormData();
    if(!formData){return};
    let Stock = formData[2];
    let Currency = formData[3];
    let startDate = formData[0];
    let endDate = formData[1];

    //save data to local storage
    localStorage.setItem('Stock', Stock);
    localStorage.setItem('Currency', Currency);
    localStorage.setItem('startDate', startDate);
    localStorage.setItem('endDate', endDate);

    // get data from API
    let stockData = await getStockPrices(Stock, startDate, endDate);
    console.log(stockData);

    //parse responce
    stockData = await stockData.json();
    console.log(stockData);

    //save data to local storage
    localStorage.setItem('stockData', JSON.stringify(stockData));
    let test = localStorage.getItem('stockData');
    console.log(test);
    //stockData.then(data => localStorage.setItem('stockData', JSON.stringify(data)));


    //wait 300
    setTimeout(function(){
        //change to dashboard page
        document.location.href="/Dash.html";
    }, 300);
    
    
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