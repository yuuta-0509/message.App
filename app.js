if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (err) => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
}



const apiKey = 'acc9f6f6be519024f4a688d4b9610816';
var selectElement = document.getElementById("map-select");
var output = document.getElementById('output');
var iconImage = document.getElementById('icon');
var result = document.getElementById('resultDiv');
var saveLocationButton = document.getElementById('save-location-button');
var saveLocationComment = document.getElementById('save-location-comment')

window.onload = function() {
    const savedLocation = localStorage.getItem('savedLocation');
    if (savedLocation) {
        const savedWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${savedLocation}&units=metric&lang=ja&appid=${apiKey}`;
        getWeather(savedWeatherUrl);
    }
};

selectElement.addEventListener("change", function() {
    var selectedValue = selectElement.value;
    result.style.border = 'solid 1px blue';
    
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
        saveLocationButton.style.display = 'block';
        saveLocationComment.style.display = "block";
        saveLocationButton.onclick = function() {
            localStorage.setItem('savedLocation', areaResult); 
            alert(`${areaResult} が保存されました。`);
        };
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        output.innerHTML = '<p>天気情報を取得できませんでした。再度お試しください。</p>';
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
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function() {
    var cityName = document.getElementById('cityInput').value.trim();
    if (cityName !== "") {
        var cityNameInRomaji = wanakana.toRomaji(cityName); 
        getWeatherByCityName(cityNameInRomaji);
        console.log(cityNameInRomaji)
    } else {
        alert('都市名を入力してください');
    }
});

function getWeatherByCityName(cityName) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ja&appid=${apiKey}`;
    getWeather(apiUrl);
}
