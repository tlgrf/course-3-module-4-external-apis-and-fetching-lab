// index.js

// Step 1: Fetch weather data from OpenWeatherMap
async function fetchWeatherData(cityName) {
  const apiKey = "696cc2631eecff44a815dc6df7032ace";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  );
  if (!response.ok) {
    throw new Error("City not found");
  }
  return response.json();
}

// Step 2: Show errors
function displayError(message) {
  const error = document.getElementById("error-message");
  if (!error) return;
  error.textContent = message;
  error.classList.remove("hidden");
}

// Step 3: Display the weather
function displayWeather(data) {
  const weatherDiv = document.getElementById("weather-display");
  if (!weatherDiv) return;

  const name        = data.name;
  const celsius     = data.main.temp - 273.15;
  const tempStr     = `${celsius.toFixed(0)}°C`;
  const humidityStr = `${data.main.humidity}%`;
  const description = data.weather[0].description;

  weatherDiv.innerHTML = `
    <h2>Weather in ${name}</h2>
    <p>Temperature: ${tempStr}</p>
    <p>Humidity: ${humidityStr}</p>
    <p>Conditions: ${description}</p>
  `;
}

// Browser event binding (guarded so it doesn’t run in Jest)
if (typeof document !== 'undefined') {
  const fetchBtn = document.getElementById("fetch-weather");
  if (fetchBtn) {
    fetchBtn.addEventListener("click", async () => {
      const cityInput = document.getElementById("city-input");
      const cityName  = cityInput.value.trim();
      if (!cityName) {
        displayError("Please enter a city.");
        return;
      }

      // Clear any previous state
      const weather = document.getElementById("weather-display");
      const error   = document.getElementById("error-message");
      if (weather) weather.innerHTML = "";
      if (error)   error.classList.add("hidden");

      try {
        const data = await fetchWeatherData(cityName);
        displayWeather(data);
      } catch (err) {
        displayError(err.message);
      }
    });
  }
}

// Exports for Jest
module.exports = {
  fetchWeatherData,
  displayWeather,
  displayError,
};