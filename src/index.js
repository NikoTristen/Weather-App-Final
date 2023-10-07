

function formatDate(){

  let date = new Date()
  let hour = date.getHours() % 12 || 12;
  let minutes = date.getMinutes();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  if (hour < 10 ){
    hour = `0${hour}`;
  }
  if (minutes < 10 ){
    minutes = `0${minutes}`;
  }
      return `${day} at ${hour}:${minutes}`
}

function formateDay(timestamp){
let date = new Date(timestamp*1000);
let day= date.getDay();
let days= ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecast(response) {
let forecast = response.data.daily
let forecastElement = document.querySelector(".weatherForecast");

let forecastHTML = `<div class="row">`
forecast.forEach(function(forecastDay, index){
  if (index < 6){
forecastHTML = forecastHTML +  `
            <div class="col">
                ${formateDay(forecastDay.time)}
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
                alt=${forecastDay.condition.description}
                width="50"
              />
              <span class="forecastMax">${Math.round(forecastDay.temperature.maximum)}°</span>
              <span class="forecastMin">${Math.round(forecastDay.temperature.minimum)}°</span>
            </div>
                `;
  };
})

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}


function forecastData(coordinates){
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl= `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getLiveWeather(response){
console.log(response)
  farhenheitTemp = Math.round(response.data.temperature.current)

  document.querySelector("#main-temp").innerHTML = farhenheitTemp;
  document.querySelector("#weatherDescription").innerHTML = response.data.condition.description;
  document.querySelector("#humidity").innerHTML = Math.round(response.data.temperature.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#city").innerHTML = response.data.city;
  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  weatherIcon.setAttribute("alt", `response.data.condition.description`);
  
  document.querySelector("#date").innerHTML = formatDate("timestamp");
  
  forecastData(response.data.coordinates);
}

function search(city){
  let units = "imperial"
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&untis=${units}`;
    axios.get(apiUrl).then(getLiveWeather);
}

function searchResult(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}


search("Denver");


let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchResult);




