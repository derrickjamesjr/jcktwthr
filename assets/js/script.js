var userinput = $("#city")
var btn = $(".btn");
var lctn = $(".lctn");

var weatherinfo = function(input) {    
    var city = input;
    console.log(city);
    var apistr = "https://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=5&appid=3e6e91e6c8387cdac97df82b9bc87d27"
    console.log(apistr);
    //Gets map coordinates from inputed city
    // fetch("https://api.openweathermap.org/data/2.5/weather?q=Irvington,us&APPID=3e6e91e6c8387cdac97df82b9bc87d27")
    fetch(apistr)
    .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // console.log(data.coord.lat, data.coord.lon);
        localStorage.setItem("coordlat", data[0].lat);
        localStorage.setItem("coordlon", data[0].lon);
        // console.log(data);
        // console.log(data[0].lat, data[0].lon);
      })};

     var dailyfrcst = function() {
        var lat = localStorage.getItem("coordlat");
        var lon = localStorage.getItem("coordlon");
        //get lat and lon from inputted city
        var apistr = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon +"&exclude=hourly&appid=3e6e91e6c8387cdac97df82b9bc87d27";
        // "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=94.04&exclude=hourly&appid=3e6e91e6c8387cdac97df82b9bc87d27"
        var dsplywthr = $("#thiswthr");
        

        fetch(apistr)
        .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            // console.log(data.coord.lat, data.coord.lon);
            for (var i = 0; i < 5; i++) {
            // console.log(data.daily[i]);
            var wthrrpt = data.daily[i].weather;
            // console.log(wthrrpt);
            var cityLi = document.createElement("li");
            cityLi.append(wthrrpt);
            // console.log(cityLi);
            // console.log(wthrrpt);
            dsplywthr.append(cityLi);


          }})}

      dailyfrcst();
      
      //event listener for input box
      lctn.on("submit", function(e) {
      e.preventDefault();
      
      weatherinfo(userinput.val())});



