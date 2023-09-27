

function formatDate(timestamp){

  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  if (hour < 10 ){
    hour = `0${hour}`;
  }
  if (minutes < 10 ){
    minutes = `0${minutes}`;
  }
  return `${day} at ${hour}:${minutes}`;
}



function displayForecast(response) {
  console.log(response.data)
let forecastElement = document.querySelector(".weatherForecast");
let forecastHTML = `<div class="row">`
let days = ["Sat", "Sun", "Mon", "Tues", "Wed"];

days.forEach(function(day){
forecastHTML = forecastHTML +  `
            <div class="col">
                ${day}
              <img
                src="https://openweathermap.org/img/wn/02d@2x.png"
                alt=""
                width="62"
              />
              <span class="forecastMax">40°</span>
              <span class="forecastMin">20°</span>
            </div>
                `;
})

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function forecastData(coordinates){
 
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl= `https://api.shecodes.io/weather/v1/current?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getLiveWeather(response){

  farhenheitTemp = Math.round(response.data.main.temp)

  document.querySelector("#main-temp").innerHTML = farhenheitTemp;
  document.querySelector("#weatherDescription").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#city").innerHTML = response.data.name;

  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute("alt", "response.data.weather[0].description");

  document.querySelector("#date").innerHTML = formatDate("timestamp");

  forecastData(response.data.coord);
}

function search(city){
  let units = "imperial"
  let apiKey = "197f9fd906875b61a67bac12da5e6cdb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getLiveWeather);
}

function searchResult(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}


function showCelsiusTemperature(event){
  event.preventDefault();

  farhenheitLink.classList.remove("farhenheitLink");
  celsiusLink.classList.add("farhenheitLink");
  let changeToCelsius = (farhenheitTemp - 32) * 5/9;
  document.querySelector("#main-temp").innerHTML = Math.round(changeToCelsius);
}

function showFarhenheitLink(event){
  event.preventDefault();
  farhenheitLink.classList.add("farhenheitLink");
  celsiusLink.classList.remove("farhenheitLink");

  document.querySelector("#main-temp").innerHTML = farhenheitTemp
}


search("Los Angeles");


let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchResult);


let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTemperature);


let farhenheitLink = document.querySelector("#farhenheitLink");
farhenheitLink.addEventListener("click", showFarhenheitLink);

let farhenheitTemp = null


