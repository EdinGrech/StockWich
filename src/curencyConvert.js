
function convertCurrency(amount, toCurrency) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("from-value", amount.toString());
    encodedParams.append("from-type", "USD");
    encodedParams.append("to-type", toCurrency);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '1920e7b9f5mshf766c079fa85dd1p1649dcjsna4a2cb17f206',
            'X-RapidAPI-Host': 'community-neutrino-currency-conversion.p.rapidapi.com'
        },
        body: encodedParams
    };

    return fetch('https://community-neutrino-currency-conversion.p.rapidapi.com/convert', options)
        .then(response => response.json())
        .catch(err => console.error(err));
}
