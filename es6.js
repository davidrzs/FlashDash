let socket = io.connect('http://127.0.0.1:5000');
let aTitle = document.getElementById('articleTitle');
let aContent = document.getElementById('articleContent');
let aSource = document.getElementById('articleSource');

let todaysTemperature = document.getElementById('todaysTemperature');
let tomorrowsTemperature = document.getElementById('tomorrowsTemperature');
let twoDaysTemperature = document.getElementById('twoDaysTemperature');

let iconToday = document.getElementById('iconToday');
let iconTomorrow = document.getElementById('iconTomorrow');
let iconTwoDays = document.getElementById('iconTwoDays');

let dayNameTomorrow = document.getElementById('dayNameTomorrow');
let dayNameInTwoDays = document.getElementById('dayNameInTwoDays');


socket.on('changeArticle', function(article){
  let art = article.article;
  aTitle.innerHTML = art.title;
  aContent.innerHTML = art.description;
  aSource.innerHTML = '- ' + art.source.name;
});





 socket.on('weather', function(weather){
   console.log(weather);
   todaysTemperature.innerHTML = weather.weather[0].main.temp;
   tomorrowsTemperature.innerHTML = weather.weather[1].main.temp;
   twoDaysTemperature.innerHTML = weather.weather[2].main.temp;

   iconToday.className = '';
   iconToday.className = `weatherIcon wi wi-owm-${weather.weather[0].weather[0].id}`;

    iconTomorrow.className = '';
    iconTomorrow.className = `weatherIcon wi wi-owm-${weather.weather[1].weather[0].id}`;

    iconTwoDays.className = '';
    iconTwoDays.className = `weatherIcon wi wi-owm-${weather.weather[2].weather[0].id}`;

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dayNameTomorrow.innerHTML = tomorrow.toLocaleString('de-CH',{ weekday: 'long' })

    let inTwoDays = new Date();
    inTwoDays.setDate(inTwoDays.getDate() + 2);
    dayNameInTwoDays.innerHTML = inTwoDays.toLocaleString('de-CH',{ weekday: 'long' })

 });


 function startTime() {
     var today = new Date();
     var h = today.getHours();
     var m = today.getMinutes();
     var s = today.getSeconds();
     var dName = today.toLocaleString('de-CH',{ weekday: 'long' });
     var month = today.toLocaleString('de-CH', { month: "long" });
     var day_in_month = today.getDate();
     m = checkTime(m);
     s = checkTime(s);
     document.getElementById('time').innerHTML = h + ":" + m;
     document.getElementById('day').innerHTML = dName;
     document.getElementById('datum').innerHTML = day_in_month + ' ' + month;
     var t = setTimeout(startTime, 500);
 }
 function checkTime(i) {
     if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
     return i;
 }
