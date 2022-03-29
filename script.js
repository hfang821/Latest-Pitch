var myHeaders = new Headers();
//replace with real api key
myHeaders.append("x-rapidapi-key", "XxXxXxXxXxXxXxXxXxXxXxXx");
myHeaders.append("x-rapidapi-host", "v1.hockey.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

var getScores = function() {
    //access the server api
    var apiUrl = "https://v1.hockey.api-sports.io/{endpoint}";

    fetch(apiUrl, requestOptions)
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
            })
        }
    })
    .catch(error => console.log('error', error));
};


getScores();