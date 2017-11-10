import * as DOMe from './elements'

function searchWeather() {

    const CITY_NAME = DOMe.ELEMENT_SEARCHED_CITY.value.trim();

    if (CITY_NAME.length === 0) {

        DOMe.ELEMENT_SEARCH_BUTTON.disabled;

    } else {

        DOMe.ELEMENT_SEARCH_BUTTON.disabled = false;

        console.log(CITY_NAME);

    }

}

export { searchWeather };