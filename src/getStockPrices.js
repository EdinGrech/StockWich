const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '640dc8fa5bmsh577ad45f839ec2cp17f66ajsn29a006734b9a',
		'X-RapidAPI-Host': 'stock-prices2.p.rapidapi.com'
	}
};

fetch('https://stock-prices2.p.rapidapi.com/api/v1/resources/stock-prices/1mo?ticker=AAPL', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));