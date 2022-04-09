var englandTimeEl = document.getElementById("englandTime");
var ghanaTimeEl = document.getElementById("GhanaTime"); 
var localTimeEl = document.getElementById("localTime");

var worldClockSearch = function(area, location) {
    
     var apiUrl3 = 'http://worldtimeapi.org/api/timezone/' + area +'/' + location;
    fetch(apiUrl3)
    .then(response => response.json())
    .then(function(data){
        console.log(data);
        displayTime(data);
    })
    .catch(err => console.log(err));
}

var worldClockSearchGhana = function(area, location) {
    
    var apiUrl3 = 'http://worldtimeapi.org/api/timezone/' + area +'/' + location;
   fetch(apiUrl3)
   .then(response => response.json())
   .then(function(data){
       console.log(data);
       displayGhanaTime(data);
   })
   .catch(err => console.log(err));
}


var displayTime = function(timeData) {
    var time = timeData.datetime
   // let newTime = time.split("T")[1].split(".")[0]
    console.log("time", time)
    
    //time = moment(time).format('MMMM Do YYYY, h:mm:ss a');
  //  englandTimeEl.innerHTML = 'England Time:' + newTime ;
}

// var london = new Date().toISOString().split("T")[1].split(".")[0]
    // var london = moment().tz("Europe/London").format();
//london.toLocaleString('en-GB', { timeZone: 'Europe/London' });
// console.log("london",london)
 //setInterval(london, 1000)

 var updateEngland = function() {
    document.getElementById("datetime")
    englandTimeEl.innerHTML = "England Time: " + moment.utc().add(1, "hours").format('MMMM Do YYYY, h:mm:ss a')
}
setInterval(updateEngland, 1000);


var updateGhana = function() {
    document.getElementById("datetime")
    ghanaTimeEl.innerHTML = "Ghana Time: " + moment.utc().format('MMMM Do YYYY, h:mm:ss a')
}
setInterval(updateGhana, 1000)

var displayGhanaTime = function (timeData) {
    var time = timeData.datetime;
    //time = moment(time).format('MMMM Do YYYY, h:mm:ss a');
   // ghanaTimeEl.innerHTML = 'Ghana Time: ' + time ;
}


window.addEventListener("load", worldClockSearch('Europe','London'));
window.addEventListener("load", worldClockSearchGhana('Africa','Accra'));
window.addEventListener("load", function(){
    var time = moment().format('MMMM Do YYYY, HH:mm:ss');
    localTimeEl.append(time);

})