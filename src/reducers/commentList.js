import { COMMENT_LIST_REQUEST, COMMENT_LIST_ERROR, COMMENT_LIST_RECEIVED, COMMENT_LIST_UNLOAD } from "../actions/constants";

export default (state = {
    commentList: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true
            };
            console.log(state);
            return state;

        case COMMENT_LIST_RECEIVED:
            state = {
                ...state,
                commentList: action.data['hydra:member'],
                isFetching: false
            };
            console.log(state);
            return state;
        case COMMENT_LIST_ERROR:
        case COMMENT_LIST_UNLOAD:
            state = {
                ...state,
                isFetching: false,
                commentList: null
            }
            console.log(state);
            return state;
        default:
            return state;
    }
}