import { FETCH_USER, FETCH_USER_FULFILLED } from "../actions/index2";

// Not working, have to use defaultProps in User component, but the requests are working  
const initialState = {
    users: [
        'shakyshane',
        'sindresorhus',
        'substack'
    ],
    current: null,
    loading: false,
};

export function storiesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                current: null,
                loading: true
            }

        case FETCH_USER_FULFILLED:
            return {
                ...state,
                current: action.payload,
                loading: false
            }

        default: return state;
    }
}

export default storiesReducer;