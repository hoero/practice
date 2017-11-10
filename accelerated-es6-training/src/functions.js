import * as DOMe from './elements'
import { Http } from './http';

function searchWeather() {

    const CITY_NAME = DOMe.ELEMENT_SEARCHED_CITY.value.trim();
    const URL = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${CITY_NAME}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

    if (CITY_NAME.length === 0) {

        DOMe.ELEMENT_SEARCH_BUTTON.disabled;

    } else {

        DOMe.ELEMENT_SEARCH_BUTTON.disabled = false;

        console.log(CITY_NAME);

    }

    Http.fetchData(URL)
        .then(responseData => {

        })
        .catch(error => alert(error));

}

export { searchWeather };