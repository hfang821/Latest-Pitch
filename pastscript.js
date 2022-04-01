var leagueBadgeEl = document.getElementById('leagueBadge');
var leagueNameEl = document.getElementById('leagueName');
var submitEl = document.getElementById('submitbtn');
var scoreBoardEl = document.getElementById('scoresInfo');
var formEl = document.getElementById('gameSelect');
var restartEl = document.getElementById('restart');
var leagueInputEl = document.getElementById('leagueInput');
var periodFrom = document.getElementById('fromDate');
var periodTo = document.getElementById('toDate');
var cloneEl = document.getElementById('clone');

//For the clone section
var matchDateEl = document.querySelectorAll('.matchDate');
var homeLogoEl = document.querySelectorAll('.homelogo');
var homeNameEl = document.querySelectorAll('.homeName');
var homeHtScoreEl = document.querySelectorAll('.homehtScore');
var homeFtScoreEl = document.querySelectorAll('.homeFtScore');
var awayLogoEl = document.querySelectorAll('.awaylogo');
var awayNameEl = document.querySelectorAll('.awayName');
var awayHtScoreEl = document.querySelectorAll('.awayhtScore');
var awayFtScoreEl = document.querySelectorAll('.awayFtScore');

var league = [
    {
    league_name: 'england',
    league_id: '149'
    },

    {
    league_name: 'ghana',
    league_id: '177'
    }
]

var formSubmitHandler = function(event){

    event.preventDefault();

    //get value from the date range of the search
    var rangeFrom = periodFrom.value 
    var rangeTo = periodTo.value

    console.log(rangeFrom);

    //get value from the league name
    var leagueSelected = leagueInputEl.value.trim().toLowerCase();

    for(let i =0; i<league.length; i++) {
        if(leagueSelected===league[i].league_name){
            getScores(league[i].league_id, rangeFrom, rangeTo);
        }
    }
    
    leagueInputEl.value = '';

}


var getScores = function(league_id, from, to) {
    
    var apiKey = '157ce318877b28613f3f957ccd28aa5239d122320755f5ddb85085a83b831836';

    //User Input;
    var dateFrom = 'from=' + from + '&to=' + to;
    // var league_id = '177';

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
    
    scoreBoardEl.classList.remove("hide");
    formEl.classList.add("hide");

    leagueBadgeEl.src = scoresInfo[0].league_logo;
    leagueNameEl.textContent = "You are viewing the latest games from a " + scoresInfo[0].league_name;

    for (i=0; i<scoresInfo.length; i++){
        
        //const cloneSection = cloneEl.cloneNode(true);
        //scoreBoardEl.appendChild(cloneSection);
        homeLogoEl[i].src= scoresInfo[scoresInfo.length-1-i].team_home_badge;
        matchDateEl[i].textContent = "Date of the match: " + scoresInfo[scoresInfo.length-1-i].match_date;
        homeNameEl[i].textContent = 'Home Team: ' + scoresInfo[scoresInfo.length-1-i].match_hometeam_name + 'VS';
        homeHtScoreEl[i].textContent='Half Time Score: ' + scoresInfo[scoresInfo.length-1-i].match_hometeam_halftime_score;
        homeFtScoreEl[i].textContent= 'Full Time Score: ' + scoresInfo[scoresInfo.length-1-i].match_hometeam_ft_score;

        awayLogoEl[i].src= scoresInfo[scoresInfo.length-1-i].team_away_badge;
        awayNameEl[i].textContent = 'Away Team: ' + scoresInfo[scoresInfo.length-1-i].match_awayteam_name;
        awayHtScoreEl[i].textContent='Half Time Score: ' + scoresInfo[scoresInfo.length-1-i].match_awayteam_halftime_score;
        awayFtScoreEl[i].textContent= 'Full Time Score: ' + scoresInfo[scoresInfo.length-1-i].match_awayteam_ft_score;

    }
    
}


submitEl.addEventListener('click', formSubmitHandler)
restartEl.addEventListener('click', function(){location.reload()});