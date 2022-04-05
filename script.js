var savedTeamEl = document.getElementById("storedLeagues");


var leagueSearch = function(id) {
    var apiKey = '157ce318877b28613f3f957ccd28aa5239d122320755f5ddb85085a83b831836';
    var apiUrl2 = 'https://apiv3.apifootball.com/?action=get_standings&league_id=' + id + '&APIkey=' + apiKey;
    fetch(apiUrl2)
	.then(response => response.json())
	.then(function(data){
        console.log(data);
        displayStandings(data);
    })
	.catch(err => console.error(err));

    //displaySavedTeams();
}

var displaySavedLeagues = function(id,name){
    console.log(name);
    if(name===null){
        return;
    }
        var savedLeagues = document.createElement("button");
        savedLeagues.innerHTML = name + ' League';
        savedLeagues.classList.add("button", "small", "expanded");
        savedLeagues.setAttribute('leagueId', id)
        savedTeamEl.appendChild(savedLeagues);
} 


var searchStandings = function(event) {
   

    var id = event.target.getAttribute('leagueId');
    
    leagueSearch(id);

    //savedTeamEl.classList.add("hide");
}

var displayStandings = function(standingInfo){
    // var savedLeaguesEl = document.querySelector('[leagueId="177"]');
    // savedLeaguesEl.classList.add('hide');

    for(let i =0; i<standingInfo.length; i++) {
        var leagueStanding = document.createElement("button");
        leagueStanding.innerHTML = (i+1) + ': ' + standingInfo[i].team_name;
        leagueStanding.classList.add("button", "small", "expanded");
        savedTeamEl.appendChild(leagueStanding);
    }

}

window.addEventListener("load", function() {
    var leaguesnow = JSON.parse(window.localStorage.getItem("leagueid"));
    var namesnow = JSON.parse(window.localStorage.getItem("leagueName"));
    var leaguespast = JSON.parse(window.localStorage.getItem("pastleagueid"));
    var namepast = JSON.parse(window.localStorage.getItem("pastleagueName"));

    var leagues = leaguesnow.concat(leaguespast);
    var names = namesnow.concat(namepast);

    for(let i=0; i<leagues.length; i++) {
        displaySavedLeagues(leagues[i],names[i]);
    }
});


savedTeamEl.addEventListener("click", searchStandings);