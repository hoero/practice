import * as DOMe from './elements'
import { Http } from './http';
import { WeatherData, WEATHER_PROXY_HANDLER } from './weather-data';

function searchWeather() {

    const CITY_NAME = DOMe.ELEMENT_SEARCHED_CITY.value.trim(),
          URL       = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${CITY_NAME}%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

    if (CITY_NAME.length === 0) {

        DOMe.ELEMENT_SEARCH_BUTTON.disabled;

    } else {

        DOMe.ELEMENT_SEARCH_BUTTON.disabled = false;

    }

    DOMe.ELEMENT_WEATHER_BOX.style.display  = 'none';
    DOMe.ELEMENT_LOADING_TEXT.style.display = 'block';

    Http.fetchData(URL)
        .then(responseData => {

            const response      = responseData.query.results.channel.item.condition,
                  WEATHER_DATA  = new WeatherData(CITY_NAME, response.text.toUpperCase()),
                  WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);

            WEATHER_PROXY.temperature = response.temp;

            updateWeather(WEATHER_PROXY);

        })
        .catch(error => alert(error));

}

function updateWeather(weatherData) {
    console.log(weatherData);

    DOMe.ELEMENT_WEATHER_CITY.textContent        = weatherData.city;
    DOMe.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
    DOMe.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;

    DOMe.ELEMENT_LOADING_TEXT.style.display = 'none';
    DOMe.ELEMENT_WEATHER_BOX.style.display  = 'block';
}

export { searchWeather };