var savedTeamEl = document.getElementById("storedLeagues");
var country1LeagueIcon = document.getElementById("country1");
var country2LeagueIcon = document.getElementById("country2")
var clearEl = document.getElementById("clear");

var idArray = [];
var leagueArray = [];

// var getScores = function() {
    
//     var apiKey = '157ce318877b28613f3f957ccd28aa5239d122320755f5ddb85085a83b831836';


//     var apiUrl = 'https://apiv3.apifootball.com/?action=get_leagues'+'&APIkey=' + apiKey;
//     fetch(apiUrl)
// 	.then(response => response.json())
// 	.then(function(data){
//         console.log(data);
//         displayLogo(data);
//     })
// 	.catch(err => noMatch(err));
//         //console.error(err));
// }

// getScores();

// var displayLogo = function(leagueinfo) {
//     for(let i =0; i<leagueinfo.length; i++) {
//         var logo = document.createElement('img');
//         logo.src = leagueinfo[i].country_logo;
//         logo.classList.add('standingsicon', 'cell' ,'small-2');
//         logo.setAttribute('id', leagueinfo[i].country_name);
//         countryLeagueIcon.appendChild(logo);
//     }
// }


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
    if(id.length===1) {
        var savedLeagues = document.createElement("button");
        savedLeagues.innerHTML = name[0] + ' League';
        savedLeagues.classList.add("button", "small", "expanded");
        savedLeagues.setAttribute('leagueId', id[0]);
        savedTeamEl.appendChild(savedLeagues);
    } else if(id.length===2){
        var savedLeagues2 = document.createElement("button");
        savedLeagues2.innerHTML = name[1] + ' League';
        savedLeagues2.classList.add("button", "small", "expanded");
        savedLeagues2.setAttribute('leagueId', id[1])
        savedTeamEl.appendChild(savedLeagues2);
    }
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

var searchStandings = function(event) {
   

    var id = event.target.getAttribute('leagueId');
    
    leagueSearch(id);

    //savedTeamEl.classList.add("hide");
}

var getItem = function() {
   /* var leaguesnow = JSON.parse(window.localStorage.getItem("leagueid"));
    var namesnow = JSON.parse(window.localStorage.getItem("leagueName"));
    var leaguespast = JSON.parse(window.localStorage.getItem("pastleagueid"));
    var namepast = JSON.parse(window.localStorage.getItem("pastleagueName")); */
    var namecheck = JSON.parse(window.localStorage.getItem("leagueNamecheck"));
    var leaguecheck = JSON.parse(window.localStorage.getItem("leagueidcheck"));

    // var leagues = leaguesnow.concat(leaguespast).concat(leaguecheck);
    // var names = namesnow.concat(namepast).concat(namecheck);

   
    displaySavedLeagues(leaguecheck,namecheck);
    
};

var reloadHandler = function() {
    var namecheck = JSON.parse(window.localStorage.getItem("leagueNamecheck"));
    var leaguecheck = JSON.parse(window.localStorage.getItem("leagueidcheck"));

    for(let i = 0; i < leaguecheck.length; i++) {
    var savedLeagues = document.createElement("button");
    savedLeagues.innerHTML = namecheck[i] + ' League';
    savedLeagues.classList.add("button", "small", "expanded");
    savedLeagues.setAttribute('leagueId', leaguecheck[i]);
    savedTeamEl.appendChild(savedLeagues);
}
}

// var englandLogoEl = document.getElementById('England');
// var ghanaLogoEl = document.getElementById('Ghana');

country1LeagueIcon.addEventListener('click', function(){
    var name = 'England';
    var id = '149';

    if(leagueArray[0]!='England' && leagueArray[1]!='England') {
        idArray.push(id);
        leagueArray.push(name);

        window.localStorage.setItem("leagueidcheck",JSON.stringify(idArray));
        window.localStorage.setItem("leagueNamecheck",JSON.stringify(leagueArray));
    
        getItem();
    }

    console.log(idArray);
    console.log(leagueArray);

    
   
})

country2LeagueIcon.addEventListener('click', function(){
    var name = 'Ghana';
    var id = '177';

    if(leagueArray[0]!='Ghana' && leagueArray[1]!='Ghana') {
    idArray.push(id);
    leagueArray.push(name);

    window.localStorage.setItem("leagueidcheck",JSON.stringify(idArray));
    window.localStorage.setItem("leagueNamecheck",JSON.stringify(leagueArray));

    getItem();
    }

    console.log(idArray);
    console.log(leagueArray);

    
})

savedTeamEl.addEventListener("click", searchStandings);
clearEl.addEventListener('click', function(){
    window.localStorage.removeItem("leagueNamecheck");
    window.localStorage.removeItem("leagueidcheck");
    window.location.reload();
})

window.addEventListener("load", reloadHandler);