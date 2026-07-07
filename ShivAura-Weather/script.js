const globe = Globe()(document.getElementById("globeViz"))
    .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
    .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
    .backgroundColor("rgba(0,0,0,0)");

globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.4;

globe.pointOfView(
    {
        lat: 20,
        lng: 78,
        altitude: 2.2
    },
    0
);

async function getTemp() {
    const city = document.getElementById("city").value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }
    document.getElementById("loading").style.display = "block";
    document.getElementById("weatherCard").innerHTML = "";
    try {
        const response = await fetch(
            `https://open-weather13.p.rapidapi.com/city?city=${city}&lang=EN`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "b3a4b45255msh30f8a6049464fdcp1255aajsna95cd57149e5",
                    "x-rapidapi-host": "open-weather13.p.rapidapi.com"
                }
            }
        );
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        document.getElementById("loading").style.display = "none";
        flyToCity(data.coord.lat, data.coord.lon);
        displayWeather(data);
    }
    catch (error) {
        document.getElementById("loading").style.display = "none";
        alert("Unable to fetch weather. Please check the city name.");
    }
}

function flyToCity(lat, lon) {
    globe.pointOfView(
        {
            lat: lat,
            lng: lon,
            altitude: 1.4
        },
        1800
    );
}

function weatherIcon(type) {
    switch (type.toLowerCase()) {
        case "clear":
            return "☀️";
        case "clouds":
            return "☁️";
        case "rain":
            return "🌧️";
        case "drizzle":
            return "🌦️";
        case "snow":
            return "❄️";
        case "mist":
        case "fog":
        case "haze":
            return "🌫️";
        case "thunderstorm":
            return "⛈️";
        default:
            return "🌍";
    }
}

function formatTime(unix) {
    const date = new Date(unix * 1000);
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function displayWeather(data) {
    const icon = weatherIcon(data.weather[0].main);
    document.getElementById("weatherCard").innerHTML = `
    <div class="city">
        <h2>${data.name}, ${data.sys.country}</h2>
    </div>
    <div class="temp">
        ${icon}<br>
        ${Math.round(data.main.temp)}°C
    </div>
    <div class="box">
        <h4>Feels Like</h4>
        <h2>${Math.round(data.main.feels_like)}°C</h2>
    </div>
    <div class="box">
        <h4>Humidity</h4>
        <h2>${data.main.humidity}%</h2>
    </div>
    <div class="box">
        <h4>Wind</h4>
        <h2>${data.wind.speed} m/s</h2>
    </div>
    <div class="box">
        <h4>Pressure</h4>
        <h2>${data.main.pressure} hPa</h2>
    </div>
    <div class="box">
        <h4>Visibility</h4>
        <h2>${(data.visibility / 1000).toFixed(1)} km</h2>
    </div>
    <div class="box">
        <h4>Weather</h4>
        <h2>${data.weather[0].main}</h2>
    </div>
    <div class="condition">
        <h3>${data.weather[0].description}</h3>
        <p>
            🌅 <strong>Sunrise:</strong>
            ${formatTime(data.sys.sunrise)}
        </p>
        <p>
            🌇 <strong>Sunset:</strong>
            ${formatTime(data.sys.sunset)}
        </p>
    </div>
    `;
}

document.getElementById("city")
.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        getTemp();
    }
});