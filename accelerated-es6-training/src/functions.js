import * as DOMe from './elements'
import { Http } from './http';
import { WeatherData, WEATHER_PROXY_HANDLER } from './weather-data';
import { escape } from 'querystring';

function searchWeather() {

    const CITY_NAME = DOMe.ELEMENT_SEARCHED_CITY.value.trim(),
          QUERY     = escape(`select item from weather.forecast where woeid in (select woeid from geo.places where text='${CITY_NAME}') and u='c'`),
          URL       = `https://query.yahooapis.com/v1/public/yql?q=${QUERY}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

    if (CITY_NAME.length === 0) {

        DOMe.ELEMENT_SEARCH_BUTTON.disabled;

    } else {

        DOMe.ELEMENT_SEARCH_BUTTON.disabled = false;

        console.log(CITY_NAME);

    }

    Http.fetchData(URL)
        .then(responseData => {

            const response      = responseData.query.results.channel.item.condititon,
                  WEATHER_DATA  = new WeatherData(CITY_NAME, response.text.toUpperCase()),
                  WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);

            WEATHER_PROXY.temperature = response.temp;

        })
        .catch(error => alert(error));

}

export { searchWeather };