const apiKey = "19b2053ba1f95b4bf14538b4cb3fd8d4"; // Replace with your API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const weatherIcon = document.getElementById("weatherIcon");
const weatherResult = document.getElementById("weatherResult");

const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

async function getWeather(city) {
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        tempEl.textContent = `🌡 Temperature: ${data.main.temp}°C`;
        descEl.textContent = `📋 Condition: ${data.weather[0].description}`;
        humidityEl.textContent = `💧 Humidity: ${data.main.humidity}%`;
        windEl.textContent = `🌬 Wind: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherResult.style.display = "block"; // Show results
    } catch (error) {
        alert(error.message);
    }
}

searchBtn.addEventListener("click", () => {
    getWeather(cityInput.value.trim());
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeather(cityInput.value.trim());
    }
});
