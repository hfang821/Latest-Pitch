var getScores = function() {
    var apiKey = '157ce318877b28613f3f957ccd28aa5239d122320755f5ddb85085a83b831836';
    var apiUrl = 'https://apiv3.apifootball.com/?action=get_events&from=2022-01-12&to=2022-03-12&league_id=177&APIkey=' + apiKey;
    fetch(apiUrl)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

getScores();