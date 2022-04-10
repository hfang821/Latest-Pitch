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
var loadEl = document.getElementById('loading');
console.log(restartEl);

periodFrom.setAttribute('max', moment().format('YYYY-MM-DD'))
periodTo.setAttribute('max', moment().format('YYYY-MM-DD'));

var idArray = [];
var leagueArray = [];

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
    var rangeFrom = periodFrom.value;
    var rangeTo = periodTo.value;

    //get value from the league name
    var leagueSelected = leagueInputEl.value.trim().toLowerCase();

    if(rangeFrom<rangeTo){
    for(let i =0; i<league.length; i++) {
        if(leagueSelected===league[i].league_name){
            submitEl.classList.add('loading');
            getScores(league[i].league_id, rangeFrom, rangeTo);
            }
        }
    } else {
        window.alert('Please enter a from date earlier than to date.')
    }
    
    periodFrom.value='';
    periodTo.value='';
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
    
    // loadEl.classList.add('hide');
    scoreBoardEl.classList.remove("hide");
    formEl.classList.add("hide");

    leagueBadgeEl.src = scoresInfo[0].league_logo;
    leagueNameEl.textContent = "You are viewing the latest games from a " + scoresInfo[0].league_name;
    //scoreBoardEl.innerHTML += `<img src="./images/197598_like_modern_fav_add_favourites_icon.png" class="likeIcon" onclick="likeHandler(this)" id="${scoresInfo[0].league_id}" name="${scoresInfo[0].country_name}">`;

    for (i=0; i<scoresInfo.length; i++){
        
        
        scoreBoardEl.innerHTML += 

        `<div class="grid-x border-x">

            <div class="cell small-4">
                <h1 class="home">Home Team:</h1>
                <img class="homelogo" src="${scoresInfo[scoresInfo.length-1-i].team_home_badge}"></img>
                <h1 class="homeName">${scoresInfo[scoresInfo.length-1-i].match_hometeam_name}</h1>
                <h2 class="homehtScore">Half Time Score: ${scoresInfo[scoresInfo.length-1-i].match_hometeam_halftime_score}</h2>
                <h2 class="homeFtScore">End Score: ${scoresInfo[scoresInfo.length-1-i].match_hometeam_ft_score}</h2>
            </div>

            <div class="cell small-4">
                <h3 class="matchDate">Date of the match: ${scoresInfo[scoresInfo.length-1-i].match_date}</h3>
                <h3>Time of the match: ${scoresInfo[scoresInfo.length-1-i].match_time} </h3>
                <img class="versus" src="./images/vs-41932.png">
                
            </div>
        
            <div class="cell small-4">
                <h2 class="away">Away Team: </h2>
                <img class="awaylogo" src="${scoresInfo[scoresInfo.length-1-i].team_away_badge}"></img>
                <h1 class="awayName">${scoresInfo[scoresInfo.length-1-i].match_awayteam_name}</h1>
                <h2 class="awayhtScore"> Half Time Score:  ${scoresInfo[scoresInfo.length-1-i].match_awayteam_halftime_score}</h2>
                <h2 class="awayFtScore">End Score: ${scoresInfo[scoresInfo.length-1-i].match_awayteam_ft_score}</h2>
            </div>

         </div>` ;

            var homeEl = document.querySelectorAll('.home');
            var awayEl = document.querySelectorAll('.away');
            var winner = document.createElement('img');
            var even = document.createElement('img');
            var even2 = document.createElement('img');
            winner.setAttribute('src', "./images/PikPng.com_winner-png_1183198.png");
            winner.classList.add('winnersymbol')
            even.setAttribute('src', './images/scale-icon-413.png');
            even.classList.add('evensymbol')
            even2.setAttribute('src', './images/scale-icon-413.png');
            even2.classList.add('evensymbol')

            if(scoresInfo[scoresInfo.length-1-i].match_hometeam_ft_score > scoresInfo[scoresInfo.length-1-i].match_awayteam_ft_score) {
                homeEl[i].append(winner);
            } else if (scoresInfo[scoresInfo.length-1-i].match_hometeam_ft_score < scoresInfo[scoresInfo.length-1-i].match_awayteam_ft_score) {
                awayEl[i].append(winner);
            } else {
                homeEl[i].append(even);
                awayEl[i].append(even2);
            }
    }
}

/*var likeHandler = function(element) {
    var id=element.id;
    var name=element.name;
    idArray.push(id);
    leagueArray.push(name);

    console.log(idArray);
    console.log(leagueArray);

    window.localStorage.setItem("pastleagueid",JSON.stringify(idArray));
    window.localStorage.setItem("pastleagueName",JSON.stringify(leagueArray));
}*/

submitEl.addEventListener('click', formSubmitHandler)