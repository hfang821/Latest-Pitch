var savedTeamEl = document.getElementById("storedLeagues");
var country1LeagueIcon = document.getElementById("country1");
var country2LeagueIcon = document.getElementById("country2")
var clearEl = document.getElementById("clear");

var idArray = [];
var leagueArray = [];

var saveItems = function(event) {
    var name = event.target.getAttribute("data-name");
    var id = event.target.getAttribute("data-id");
    var arraySomething = JSON.parse(window.localStorage.getItem('leagueidcheck'));

    //1. nothing in the array
    if(!arraySomething) {
        idArray.push(id);
        leagueArray.push(name);
        window.localStorage.setItem("leagueidcheck",JSON.stringify(idArray));
        window.localStorage.setItem("leagueNamecheck",JSON.stringify(leagueArray));
        getItem();
    } //2. if doesnt exist, will return -1 and exit, checking if already exists in the local storage, it will proceed.
    else if(arraySomething.indexOf(id) != -1) {
        return;
    } //3. where array is not empty && the event.target is not in the array, proceed to else.
    else {
        idArray.push(id);
        leagueArray.push(name);
        window.localStorage.setItem("leagueidcheck",JSON.stringify(idArray));
        window.localStorage.setItem("leagueNamecheck",JSON.stringify(leagueArray));
        getItem();
    }
    console.log(idArray);
    console.log(leagueArray);
}

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
}

var getItem = function() {
    var namecheck = JSON.parse(window.localStorage.getItem("leagueNamecheck"));
    var leaguecheck = JSON.parse(window.localStorage.getItem("leagueidcheck"));
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

country1LeagueIcon.addEventListener('click', saveItems);
country2LeagueIcon.addEventListener('click', saveItems);
savedTeamEl.addEventListener("click", searchStandings);
clearEl.addEventListener('click', function(){
    window.localStorage.removeItem("leagueNamecheck");
    window.localStorage.removeItem("leagueidcheck");
    window.location.reload();
})
window.addEventListener("load", reloadHandler);
