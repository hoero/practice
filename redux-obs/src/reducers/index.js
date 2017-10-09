import { CLEAR_STORIES, LOAD_STORIES } from "../actions/index";

const stories = [
    {
        "by": "bleakgadfly",
        "id": 14967192,
        "title": "Web Development",
        "url": "https://www.udacity.com/courses/web-development"
    },
    {
        "by": "mtyurt",
        "id": 14966545,
        "title": "iOS",
        "url": "https://www.udacity.com/courses/ios"
    },
    {
        "by": "callumlocke",
        "id": 14967335,
        "title": "Android",
        "url": "https://www.udacity.com/courses/android"
    }
];

const initialState = {
    items: [],
};

export function storiesReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_STORIES:
            return {
                items: stories.slice(),
            };

        case CLEAR_STORIES:
            return {
                items: [],
            };
    
        default: return state;
    }
}

export default storiesReducer;