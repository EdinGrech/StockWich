
// function convertCurrency(amount, toCurrency) {
//     const encodedParams = new URLSearchParams();
//     encodedParams.append("from-value", amount.toString());
//     encodedParams.append("from-type", "USD");
//     encodedParams.append("to-type", toCurrency);

//     const options = {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'X-RapidAPI-Key': '1920e7b9f5mshf766c079fa85dd1p1649dcjsna4a2cb17f206',
//             'X-RapidAPI-Host': 'community-neutrino-currency-conversion.p.rapidapi.com'
//         },
//         body: encodedParams
//     };

//     return fetch('https://community-neutrino-currency-conversion.p.rapidapi.com/convert', options)
//         .then(response => response.json())
//         .catch(err => console.error(err));
// }


// export function convertCurrency(amount, toCurrency) {
//     const encodedParams = new URLSearchParams();
//     encodedParams.append("ammount", amount.toString());
//     encodedParams.append("from", "USD");
//     encodedParams.append("to", toCurrency);
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '1920e7b9f5mshf766c079fa85dd1p1649dcjsna4a2cb17f206',
//             'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
//         },
//         body: encodedParams
//     };

//     return fetch('https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert', options)
//         .then(response => response.json())
//         //.then(response => console.log(response))
//         .catch(err => console.error(err));
// }

// example response
// {
//     "base": "USD",
//     "date": "2021-03-02",
//     "rates": {
//       "EUR": 0.831885,
//       "GBP": 0.720615
//     },
//     "success": true,
//     "timestamp": 1614664926
//   }

export async function convertCurrency(toCurrency) {
    //get exchangerates for all the available currencies listed "EUR,CAD,USD,AUD,BTC,GPB,KWD,YEN,CNY,INR,RUB"
    // try load exchange rates from local storage
    // if not available or 3 days old, load from api
    console.log("convertCurrency");
    try{
        let data = localStorage.getItem('exchangeRates');
        console.log(data);
        if(data){
            data = JSON.parse(data);
            let exchangeRate = data.rates[toCurrency];
            let time = data.timestamp;
            //time = new Date(time*1000);
            console.log(exchangeRate, time*1000, Date.now());
            // make time a date object
            if((data.timestamp*1000) + 360000000 < Date.now()){
                console.log("exchange rates are older than 3 days");
                throw new Error("Exchange rates are older than 3 days");
            }
            return { exchangeRate, time };
        }
        else{
            throw new Error("No exchange rates in local storage");
        }
    } catch (e) {
        console.log(e + " - loading exchange rates from api");
        //load exchange rates from api
        let response = await callAPI();
        //parse the response and get the exchange rate for the currency we want to convert to
        let exchangeRate = response.rates[toCurrency];

        //time of the exchange rate
        let time = response.timestamp;

        // store the exchange rates in local storage
        localStorage.setItem('exchangeRates', JSON.stringify(response));
        
        //return the converted amount and the time of the exchange rate
        return {exchangeRate, time};
    }
}

async function callAPI() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1920e7b9f5mshf766c079fa85dd1p1649dcjsna4a2cb17f206',
            'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
    };
    try {
        let response = await fetch('https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD', options)
        response = response.json();
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
    
    
}

// let info = await convertCurrency("USD")
// console.log(info);
