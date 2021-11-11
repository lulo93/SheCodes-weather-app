function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    " March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    " December"
  ];

  let day = days[weekDays];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  return `${days[weekDays]} ${currentDate} ${currentMonth} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let locationElement = document.querySelector("#location");
  let locationInput = document.querySelector("#location-input");
  locationElement.innerHTML = `${locationInput.value}`;
}

let dateElement = document.querySelector("#date");
let additionalElement = document.querySelector("#additional");
let currentTime = new Date();
let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", search);
additionalElement.innerHTML = "10°C";
dateElement.innerHTML = formatDate(currentTime);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fConversion = document.querySelector("#f-conversion");
fConversion.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = "12";
}

let cConversion = document.querySelector("#c-conversion");
cConversion.addEventListener("click", convertToCelcius);

function currentWeather(response) {
  console.log(response.data);
  let description = document.querySelector(`#additional`);
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector(`#wind-speed`);
  wind.innerHTML = `${response.data.wind.speed} mph`;
  let feels = document.querySelector("#feels-like");
  feels.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
}

function updateCurrentTemp(response) {
  let currentLocation = response.data.name;
  let locationTemp = Math.round(response.data.main.temp);

  let enterLocation = document.querySelector("#location");
  enterLocation.innerHTML = `${currentLocation}`;
  let enterTemp = document.querySelector("#temp");
  enterTemp.innerHTML = `${locationTemp}`;
  currentWeather(response);
}

function locationSearch(newLocation) {
  let apiKey = "24be2a5d0560b29769b34e4136c9cb1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateCurrentTemp);
}

function submitForm(event) {
  event.preventDefault();
  let newLocation = document.querySelector("#location-input").value;
  locationSearch(newLocation);
}

searchForm.addEventListener("submit", submitForm);

let currentLocationButton = document.querySelector(".location-button");

function locateLocationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "57b463acac326f9d3b29b49c1092e284";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateCurrentTemp);
}

function locateCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateLocationTemp);
}

currentLocationButton.addEventListener("click", locateCity);

locationSearch("London");
