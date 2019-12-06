import { COMMENT_LIST_REQUEST, COMMENT_LIST_ERROR, COMMENT_LIST_RECEIVED, COMMENT_LIST_UNLOAD, COMMENT_ADDED } from "../actions/constants";
import { hydraPageCount } from "../apiUtils";

export default (state = {
    commentList: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true
            };

            return state;

        case COMMENT_LIST_RECEIVED:
            state = {
                ...state,
                commentList: !state.commentList ? action.data['hydra:member']
                    : state.commentList.concat(action.data['hydra:member']),
                isFetching: false,
                currentPage: state.currentPage + 1,
                pageCount: hydraPageCount(action.data)
            };

            return state;
        case COMMENT_ADDED:
            return {
                ...state,
                commentList: [action.comment, ...state.commentList]
            }
        case COMMENT_LIST_ERROR:
        case COMMENT_LIST_UNLOAD:
            state = {
                ...state,
                isFetching: false,
                commentList: null,
                currentPage: 1,
                pageCount: null
            }

            return state;
        default:
            return state;
    }
}