const weatherInfo = document.getElementById("weatherInfo");
const cityInput = document.getElementById("cityInput");

// Auto-load Nairobi 🇰🇪
window.addEventListener("load", () => {
    getWeather("Nairobi");
});

function getWeather(cityParam) {
    const city = cityParam || cityInput.value.trim();

    if (!city) {
        weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    weatherInfo.innerHTML = "<p>Loading...</p>";

    // Nairobi coordinates (default)
    const cities = {
        Nairobi: { lat: -1.2921, lon: 36.8219 },
        Mombasa: { lat: -4.0435, lon: 39.6682 },
        Kisumu: { lat: -0.0917, lon: 34.7680 }
    };

    const location = cities[city] || cities["Nairobi"];

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
            const weather = data.current_weather;

            weatherInfo.innerHTML = `
                <h3>${city}</h3>
                <p>🌡 Temperature: ${weather.temperature} °C</p>
                <p>💨 Wind: ${weather.windspeed} km/h</p>
                <p>🧭 Direction: ${weather.winddirection}°</p>
            `;
        })
        .catch(() => {
            weatherInfo.innerHTML = "<p>❌ Unable to fetch weather</p>";
        });
}
