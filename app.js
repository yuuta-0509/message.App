const apiKey = 'acc9f6f6be519024f4a688d4b9610816';
var cityId = 1850147;
var cityPush = document.getElementById('cityName');
var tempPush = document.getElementById('tempValue');
var weatherPush = document.getElementById('weatherValue');
async function getWeather () {
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=${apiKey}`
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const weatherResult = await data.weather[0].main;
        let translatedWeather = '';
        switch (weatherResult) {
        case 'Thunderstorm':
            translatedWeather = '雷雨';
            break;
        case 'Drizzle':
            translatedWeather = '霧雨';
            break;
        case 'Rain':
            translatedWeather = '雨';
            break;
        case 'Snow':
            translatedWeather = '雪';
            break;
        case 'Mist':
            translatedWeather = '霧';
            break;
        case 'Smoke':
            translatedWeather = '煙';
            break;
        case 'Haze':
            translatedWeather = '霞';
            break;
        case 'Dust':
            translatedWeather = 'ほこり';
            break;
        case 'Fog':
            translatedWeather = '霧';
            break;
        case 'Sand':
            translatedWeather = '砂';
            break;
        case 'Ash':
            translatedWeather = '灰';
            break;
        case 'Squall':
            translatedWeather = '突風';
            break;
        case 'Tornado':
            translatedWeather = '竜巻';
            break;
        case 'Clear':
            translatedWeather = '晴れ';
            break;
        case 'Clouds':
            translatedWeather = '曇り';
            break;
        default:
            translatedWeather = weatherResult; 
        }
        weatherPush.innerText = translatedWeather;
        console.log(pushData);
        console.log(data)
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}
getWeather();