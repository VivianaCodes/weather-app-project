let realDate = document.querySelector(".current-time");
let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
realDate.innerHTML = `${day}, ${month} ${date} ${hour}:${minute}`;

function searchCity(city) {
  let apiKey = "d59265a17617259a858c34b2c6833049";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}
function displayWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#temp-number");
  temp.innerHTML = Math.round(response.data.main.temp);
  let sky = document.querySelector("#sky");
  sky.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `💧${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `🌬️${Math.round(response.data.wind.speed)} km/h`;

  displayForecast();

  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function handleCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text").value;
  searchCity(city);
}

let searchBar = document.querySelector("#form");
searchBar.addEventListener("submit", handleCity);

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d59265a17617259a858c34b2c6833049";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
function convertFahrenheit(event) {
  event.preventDefault;
  let tempElement = document.querySelector("#temp-number");
  fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}
function convertCelsius(event) {
  event.preventDefault;
  let tempElement = document.querySelector("#temp-number");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ` <div class="row future-days">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
    <div class="col-2">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">${day}</h4>
          <h6><span class="temp-max">29°</> | <span class="temp-min">15° </span></h6>
          <p class="card-text">Part. cloudy <img src= "http://openweathermap.org/img/wn/50d@2x.png"alt"" id="forecast-icon"/> </p>
        </div>
      </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let currentLocationButton = document.querySelector("#search-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

searchCity("Naples");
