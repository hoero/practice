import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";

const beers  = `https://api.punkapi.com/v2/beers`;
const search = (term) => `${beers}?beer_name=${encodeURIComponent(term)}`;
const ajax   = (term) => Observable.ajax.getJSON(search(term));

function searchBeersEpic(action$) {
    
}

export const rootEpic = combineEpics();