var leagueBadgeEl = document.getElementById('leagueBadge');
var leagueNameEl = document.getElementById('leagueName');
var matchDateEl = document.getElementById('matchDate');


var getScores = function() {
    var apiKey = '157ce318877b28613f3f957ccd28aa5239d122320755f5ddb85085a83b831836';

    //User Input;
    var dateFrom = 'from=2022-01-12&to=2022-03-31';
    var league_id = '177';


    var apiUrl = 'https://apiv3.apifootball.com/?action=get_events&'+ dateFrom + '&league_id=' + league_id + '&APIkey=' + apiKey;
    fetch(apiUrl)
	.then(response => response.json())
	.then(function(data){
        console.log(data);
        displayScores(data);
    })
	.catch(err => console.error(err));
}

var displayScores = function(scoresInfo){
    leagueBadgeEl.setAttribute(src,scoresInfo[0].league_logo);
    leagueNameEl.textContent = "You are viewing a " + scoresInfo[0].league_name;
    matchDateEl.textContent = "Date of the match: " + scoresInfo[0].match_date;
}

getScores();