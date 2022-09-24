var userinput = $("#city")
var btn = $(".btn");
var lctn = $(".lctn");
var dycntnr = $("#thiswthr");


// localStorage.getItem('city');

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
    .then(function(data) {
      // console.log(data.lat, data.slon);
      // console.log(data);
      localStorage.setItem("coordlt", data[0].lat);
      localStorage.setItem("coordln", data[0].lon);
      // console.log(data);]
      console.log(data[0].lat,data[0].lon);
      dailyfrcst();

    })
};

var dailyfrcst = function(lat, lon) {
  var lat = localStorage.getItem("coordlt");
  var lon = localStorage.getItem("coordln");
  // console.log(lat,lon);
  //get lat and lon from inputted city
  
  var apistr = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=3e6e91e6c8387cdac97df82b9bc87d27";
  
  var dsplywthr = $("#thiswthr");


  fetch(apistr)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.coord.lt, data.coord.ln);
      // console.log(data);
      //used feels like to see if it's grabbing unique values
      // console.log(data.current.feels_like);

      for (var i = 0; i < 5; i++) {

        var wthrrpt = data.daily[i];        
        var daylg = document.createElement("div");
        var dy = document.createElement("div");
        var nght = document.createElement("div");
        var uvbox = document.createElement("div");
        var wndspdbx = document.createElement("div");
        var humidbx = document.createElement("div");
        var wthrday = data.daily[i].temp.day;
        var wthrnght = data.daily[i].temp.night;
        var cndtn = data.daily[i].weather[0].description;
        var uvindx = data.daily[i].uvi;
        var humid = data.daily[i].humidity;
        var wndspd = data.daily[i].wind_speed;
        // var icongrb =  "https://openweathermap.org/img/wn/" + wthricn +".png";
        
        dycntnr.innerHTML


        daylg.setAttribute("class", "bg-info col m-4 rounded");
        dy.append(wthrday);
        nght.append(wthrnght);
        uvbox.append(uvindx);
        wndspdbx.append(wndspd);
        humidbx.append(humid);
        daylg.append(cndtn);
        daylg.append(uvbox);
        daylg.append(wndspdbx);
        daylg.append(humidbx);
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

var svecity = function (userinput) {
    var ctysrch = $(".searched");    
    var ctylsthldr = document.createElement('ol');
    var ctylst = document.createElement('li');
    var prevcty = document.createElement('a');

  // console.log(userinput);
  localStorage.setItem('city', userinput);
  prevcty.append(userinput);
  prevcty.attr('href', weatherinfo(userinput));
  ctylst.append(prevcty);
  ctylsthldr.append(ctylst);

  localStorage.getItem('city');
}

//event listener for input box
lctn.on("click", function(e) {
  
  e.preventDefault();
  dycntnr.innerHTML = '';
  weatherinfo(userinput.val());
  svecity(userinput.val())
});