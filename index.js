// Formate date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// display temperature details
function displayTemperature(response) {
  let currentDateElement = document.querySelector("#current-date");
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#icon");

  let temperature = Math.round(response.data.temperature.current);
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}"/>`;
  currentDateElement.innerHTML = formatDate(date);
}

// display forecast details
function displayForecast(response) {
  let forecastElement = document.querySelector("#daily-weather");
  forecastElement.innerHTML = null;
  let forecast = response.data.daily;

  let dayShorten = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      const dayOfWeek = dayShorten[index];
      forecastElement.innerHTML += `
      <div class="day-forecast">
        <h3>${dayOfWeek}</h3>
        <img src="${forecastDay.condition.icon_url}" alt="${
        forecastDay.condition.icon
      }" />
        <div class="weather-forecast-temperature">
          <strong>${Math.round(
            forecastDay.temperature.maximum
          )}°</strong> ${Math.round(forecastDay.temperature.minimum)}°
        </div>
      </div>`;
    }
  });
}

// search by city
function search(city) {
  let apiKey = "2efd3o2bd61faa9fa0ta27735b061c64";

  let apiCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiCurrent).then(displayTemperature);

  let apiForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiForecast).then(displayForecast);
}

// Event handler
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Default city
search("Asunción");
