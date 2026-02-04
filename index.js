const apiKey = "stYdmKnuHtfyfSMiCtBeAk2i2Ha8uBhd";

const weatherInfo = document.getElementById("weatherInfo");
const cityInput = document.getElementById("cityInput");

// Auto-load Nairobi on page load 🇰🇪
// window.addEventListener("load", () => {
//     getWeather("Nairobi");
// });

async function getWeather(cityParam) {
    const city = cityParam || cityInput.value.trim();

    if (!city) {
        weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    weatherInfo.innerHTML = "<p>Loading...</p>";

    try {
        // Convert city → coordinates (using Open-Meteo geocoding – no key needed)
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            weatherInfo.innerHTML = "<p>❌ City not found</p>";
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        //  Call Tomorrow.io with coordinates
        const res = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${apiKey}`);
        const data = await res.json();

        if (data.code) {
            weatherInfo.innerHTML = `<p>❌ ${data.message || "API error"}</p>`;
            return;
        }

        const values = data.data.values;

        weatherInfo.innerHTML = `
            <h3>${name}, ${country}</h3>
            <p>🌡 Temperature: ${values.temperature} °C</p>
            <p>☁ Weather code: ${values.weatherCode}</p>
            <p>💨 Wind: ${values.windSpeed} km/h</p>
        `;
    } catch (err) {
        console.error(err);
        weatherInfo.innerHTML = "<p>❌ Network error</p>";
    }
}
