function formatDate(timestamp) {
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timestamp);
  let hours = date.getHours();
  let mins = date.getMinutes();
  let day = weekday[date.getDay()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }
  return `${day}, ${hours}:${mins}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
          <div class="col-2">
            <div class="weather-date-forecast">
              ${day}
            </div>
            <img src="https://www.clipartmax.com/png/full/162-1620030_file-weather-icon-sunny-svg-sunny-weather-icon.png"
            alt=""
            width="50">
            <div class="weather-forecast-temp">
             <span class="weather-forecast-max"> 12° </span>|<span class="weather-forecast-min"> 10°</span>
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celciustemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "ff3fd882f52fb1c27e72af3c00822426";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let ftemp = Math.round((celciustemp * 9) / 5 + 32);
  temperatureElement.innerHTML = ftemp;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
  temperatureElement.innerHTML = Math.round(celciustemp);
}
let celcius = document.querySelector("#celsius-link");
celcius.addEventListener("click", showCelsiusTemp);

let celciustemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheitTemp);

search("New York");
displayForecast();
