const css = require('./app.css');

import * as DOMe from './elements';
import { searchWeather } from "./functions";

DOMe.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);