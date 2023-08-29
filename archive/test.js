
displayWeather(){

    iconElement.innerHTML = 
        `<img src="icons/${weather.iconId}.png"/>`;

    tempElement = 29° C
        `${weather.temperature.value} ° <span>C</span>`;

    descElement = Clear sky
        weather.description;

    locationElement = London, GB
        `${weather.city}, ${weather.country}`;

}

tempElement.addEventListener("click", function() {

    if (weather.temperature.value === undefined) return;
    if(weather.temperature.unit === "celsius"){
        let fahrenheit = calcFTemp(weather.temperature.value);

        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}° <span>F</>span>`;

        weather.temperature.unit = "fahrenheit";

    }else{
        
        // let celsius = calcCTemp(weather.temperature.value)

        // celsius = Math.floor(celsius);

        tempElement.innerHTML = `${celsius}° <span>C</span>`;

        weather.temperature.unit = "celsius";

    }


})

calcFTemp(){

}

calcCTemp(){

}


if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPostion, showError);

}else{

    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>"

}


function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML=`<p> ${error.message} </p>`;
}

//APP CONSTANTS AND VARS
const KELVIN = 273;
// API KEY
const key = '82005d27a116c2880c8f0fcb866998a0';

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api).then( function(response){

        let data = response.json();
        return data;
    })

    .then( function(data){
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;           
    })

    .then( function(){
        displayWeather();
    });

}