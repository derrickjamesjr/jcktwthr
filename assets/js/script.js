var userinput = $("#city")
var btn = $(".btn");
var lctn = $(".lctn");
var dycntnr = $("#thiswthr");

var svecity = function (userinput) {
    var prevcty = $('a');
    var ctysrch = $(".searched")

  console.log(userinput);
  localStorage.setItem('city', userinput);
  prevcty.attr('href', weatherinfo(city));
  prevcty.append(userinput);
  ctysrch.append(prevcty);
}

var weatherinfo = function (input) {
  var city = input;
  // console.log(city);
  var apistr = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=3e6e91e6c8387cdac97df82b9bc87d27"
  // console.log(apistr);
  //Gets map coordinates from inputed city
  // fetch("https://api.openweathermap.org/data/2.5/weather?q=Irvington,us&APPID=3e6e91e6c8387cdac97df82b9bc87d27")

  fetch(apistr)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.coord.lat, data.coord.lon);
      // console.log(data);
      localStorage.setItem("coordlat", data[0].lat);
      localStorage.setItem("coordlon", data[0].lon);
      // console.log(data);
      // console.log(data[0].lat, data[0].lon);
      dailyfrcst();

    })
};

var dailyfrcst = function () {
  var lat = localStorage.getItem("coordlat");
  var lon = localStorage.getItem("coordlon");
  //get lat and lon from inputted city
  var apistr = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=3e6e91e6c8387cdac97df82b9bc87d27";
  // "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=94.04&exclude=hourly&units=imperial&appid=3e6e91e6c8387cdac97df82b9bc87d27"
  var dsplywthr = $("#thiswthr");


  fetch(apistr)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.coord.lat, data.coord.lon);
      console.log(data);
      //used feels like to see if it's grabbing unique values
      // console.log(data.current.feels_like);

      for (var i = 0; i < 5; i++) {

        var wthrrpt = data.daily[i];

        // console.log(data.daily[i]);
        var daylg = document.createElement("div");
        var dy = document.createElement("p");
        var nght = document.createElement("p");
        var wthrday = data.daily[i].temp.day;
        var wthrnght = data.daily[i].temp.night;
        var cndtn = data.daily[i].weather[0].description;
        var uvindx = data.daily[i].uvi;
        // var icongrb =  "https://openweathermap.org/img/wn/" + wthricn +".png";

        daylg.setAttribute("class", "bg-info rounded-corner");
        dy.append(wthrday);
        nght.append(wthrnght);
        daylg.append(cndtn);
        daylg.append(uvindx);
        daylg.append(dy);
        daylg.append(nght);

        // daylg.append(icongrb);

        // console.log(data.daily[i].weather[0].icon);
        dycntnr.append(daylg);
      }

  // var icon = function() {
  //   var wthrcde = daylg.data.daily[i].weather[0].icon;
  //   var icongrb =  "http://openweathermap.org/img/wn/" + wthrcde +"data@2x.png";
  //   console.log(icongrb);

    
  // } 
    })
}

//event listener for input box
lctn.on("click", function(e) {
var prevcty = document.createElement('a');
var ctysrch = $(".searched")
   e.preventDefault();

  weatherinfo(userinput.val());
  svecity(userinput.val())
});