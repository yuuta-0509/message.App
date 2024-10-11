
const apiKey = 'acc9f6f6be519024f4a688d4b9610816';
var selectElement = document.getElementById("map-select");
var output = document.getElementById('output');
var iconImage = document.getElementById('icon');
var loadingSpinner = document.getElementById('loading');

selectElement.addEventListener("change", function() {
    var selectedValue = selectElement.value;
    var result = document.getElementById('resultDiv');
    result.style.border = 'solid 1px blue';
    
    loadingSpinner.style.display = 'block';
    
    if (selectedValue === "currentLocation") {
        getCurrentLocationWeather();
    } else if (selectedValue.startsWith("latlon")) {
        let [lat, lon] = selectedValue.split(',').slice(1);
        getWeatherByLatLon(lat, lon);
    } else {
        getWeatherByCityId(selectedValue);
    }
});

async function getWeather(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const weatherResult = data.weather[0].main;
        const weatherIcon = data.weather[0].icon;
        const weatherTranslations = {
            Thunderstorm: '雷雨',
            Drizzle: '霧雨',
            Rain: '雨',
            Snow: '雪',
            Mist: '霧',
            Smoke: '煙',
            Haze: '霞',
            Dust: 'ほこり',
            Fog: '霧',
            Sand: '砂',
            Ash: '灰',
            Squall: '突風',
            Tornado: '竜巻',
            Clear: '晴れ',
            Clouds: '曇り'
        };
        const translatedWeather = weatherTranslations[weatherResult] || weatherResult;
        const areaResult = data.name;
        const tempResult = data.main.temp;
        const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        console.log(data);
        output.innerHTML = 
        `<p>現在の ${areaResult} の気温は ${tempResult}℃</p>` +
        `<p>天気は ${translatedWeather} です</p>`;
        iconImage.src = iconUrl;
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        output.innerHTML = '<p>天気情報を取得できませんでした。再度お試しください。</p>';
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

function getWeatherByCityId(cityId) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&lang=ja&appid=${apiKey}`;
    getWeather(apiUrl);
}

function getWeatherByLatLon(lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${apiKey}`;
    getWeather(apiUrl);
}

function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ja&appid=${apiKey}`;
                getWeather(apiUrl);
            },
            function(error) {
                console.error('Error fetching current location:', error);
                loadingSpinner.style.display = 'none';
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
        loadingSpinner.style.display = 'none';
    }
}
