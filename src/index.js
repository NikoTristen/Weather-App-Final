

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
  let changeToCelsius = (farhenheitTemp - 32) * 5/9;
  document.querySelector("#main-temp").innerHTML = Math.round(changeToCelsius);
}

function showFarhenheitLink(event){
  event.preventDefault();
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

