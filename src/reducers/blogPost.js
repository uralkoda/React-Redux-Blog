import { BLOG_POST_REQUEST, BLOG_POST_ERROR, BLOG_POST_RECEIVED, BLOG_POST_UNLOAD } from "../actions/constants";

export default (state = {
    post: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case BLOG_POST_REQUEST:
            state = {
                ...state,
                isFetching: true
            };
            console.log(state);
            return state;
        case BLOG_POST_ERROR:
            state = {
                ...state,
                post: null,
                isFetching: false
            };
            console.log(state);
            return state;
        case BLOG_POST_RECEIVED:
            state = {
                ...state,
                post: action.data,
                isFetching: false
            };
            console.log(state);
            return state;
        case BLOG_POST_UNLOAD:
            state = {
                ...state,
                isFetching: false,
                post: null
            }
            console.log(state);
            return state;
        default:
            return state;
    }
}