const apiKey = 'acc9f6f6be519024f4a688d4b9610816';
var cityId = 1850147;
var cityPush = document.getElementById('cityName');
var tempPush = document.getElementById('tempValue');
var weatherPush = document.getElementById('weatherValue');
var selectElement = document.getElementById("map-select");
var output = document.getElementById('output');
selectElement.addEventListener("change", function() {
    cityId = selectElement.value || cityId;
    async function getWeather () {
        var apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&lang=ja&appid=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const weatherResult = await data.weather[0].main;
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
            const areaResult = await data.name;
            const tempResult = await data.main.temp;
            console.log(data);
            output.innerHTML = 
            '<p>現在の: ' + areaResult + 'の気温は' + tempResult + '℃</p>' +
            '<p>天気は: ' + translatedWeather + ' °Cです</p>';
        } catch (error) {
            console.error('Error fetching the weather data:', error);
        }
    }
    getWeather();
});

        // var apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`;

