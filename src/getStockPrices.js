const encodedParams = new URLSearchParams();
encodedParams.append("symbol", "AAPL");
encodedParams.append("end", "2022-04-30");
encodedParams.append("start", "2022-01-01");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '1920e7b9f5mshf766c079fa85dd1p1649dcjsna4a2cb17f206',
		'X-RapidAPI-Host': 'yfinance-stock-market-data.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://yfinance-stock-market-data.p.rapidapi.com/price-customdate', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));