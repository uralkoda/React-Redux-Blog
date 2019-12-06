import { requests } from "../agent";
import { BLOG_POST_LIST_REQUEST, BLOG_POST_LIST_ERROR, BLOG_POST_LIST_RECEIVED, BLOG_POST_LIST_ADD, BLOG_POST_REQUEST, BLOG_POST_ERROR, BLOG_POST_RECEIVED, BLOG_POST_UNLOAD, COMMENT_LIST_REQUEST, COMMENT_LIST_ERROR, COMMENT_LIST_RECEIVED, COMMENT_LIST_UNLOAD, USER_LOGIN_SUCCESS, USER_PROFIL_REQUEST, USER_PROFIL_ERROR, USER_PROFIL_RECEIVED, USER_SET_ID, COMMENT_ADDED, USER_LOGOUT, BLOG_POST_LIST_SET_PAGE } from "./constants";
import { SubmissionError } from "redux-form";
import { parseApiErrors } from "../apiUtils";



export const blogPostListRequest = () => ({
    type: BLOG_POST_LIST_REQUEST,
});
export const blogPostListError = (error) => ({
    type: BLOG_POST_LIST_ERROR,
    error
});
export const blogPostListReceived = (data) => ({
    type: BLOG_POST_LIST_RECEIVED,
    data
});
export const blogPostListSetPage = (page) => ({
    type: BLOG_POST_LIST_SET_PAGE,
    page
});

export const blogPostListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(blogPostListRequest());

        return requests.get(`/blog_posts?_page1=&_page=${page}`)
            .then(response => dispatch(blogPostListReceived(response)))
            .catch(error => dispatch(blogPostListError(error)));
    }
};

export const blogPostRequest = () => ({
    type: BLOG_POST_REQUEST,
});
export const blogPostError = (error) => ({
    type: BLOG_POST_ERROR,
    error
});
export const blogPostReceived = (data) => ({
    type: BLOG_POST_RECEIVED,
    data
});
export const blogPostUnload = () => ({
    type: BLOG_POST_UNLOAD,
});


export const blogPostFetch = (id) => {
    return (dispatch) => {
        dispatch(blogPostRequest());
        return requests.get(`/blog_posts/${id}`)
            .then(response => dispatch(blogPostReceived(response)))
            .catch(error => dispatch(blogPostError(error)));
    }
}


export const commentListRequest = () => ({
    type: COMMENT_LIST_REQUEST,
});
export const commentListError = (error) => ({
    type: COMMENT_LIST_ERROR,
    error
});
export const commentListReceived = (data) => ({
    type: COMMENT_LIST_RECEIVED,
    data
});
export const commentListUnload = () => ({
    type: COMMENT_LIST_UNLOAD,
});


export const commentListFetch = (id, page = 1) => {
    return (dispatch) => {
        dispatch(commentListRequest());
        return requests.get(`/blog_posts/${id}/comments?_page=${page}`)
            .then(response => dispatch(commentListReceived(response)))
            .catch(error => dispatch(commentListError(error)));
    }
};

export const commentAdded = (comment) => ({
    type: COMMENT_ADDED,
    comment
});

export const commentAdd = (comment, blogPostId) => {
    return (dispatch) => {
        return requests.post(
            '/comments',
            {
                content: comment,
                blogPost: `/api/blog_posts/${blogPostId}`
            }
        ).then(
            response => dispatch(commentAdded(response))
        ).catch(error => {
            if (401 === error.response.status) {
                return dispatch(userLogout());
            }
            throw new SubmissionError(parseApiErrors(error))
        })
    }
};

export const userLoginSuccess = (token, userId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId
    }
};

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return requests.post('/login_check', { username, password }, false).then(
            response => dispatch(userLoginSuccess(response.token, response.id))
        ).catch(error => {
            throw new SubmissionError({
                _error: 'Username or password is invalid'
            })
        })
    }
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}


export const userRegister = (username, password, retypedPassword, email, name) => {
    return (dispatch) => {
        return requests.post('/users', { username, password, retypedPassword, email, name }, false).catch(error => {
            throw new SubmissionError(parseApiErrors(error));
        })
    }
};


export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId
    }
};


export const userProfilRequest = () => ({
    type: USER_PROFIL_REQUEST,
});
export const userProfilError = (userId) => ({
    type: USER_PROFIL_ERROR,
    userId
});
export const userProfilReceived = (userId, userData) => ({
    type: USER_PROFIL_RECEIVED,
    userData,
    userId
});


export const userProfilFetch = (userId) => {
    console.log(`from action fetch ${userId}`);
    return (dispatch) => {
        dispatch(userProfilRequest());
        return requests.get(`/users/${userId}`, true).then(
            response => dispatch(userProfilReceived(userId, response))
        ).catch(error => dispatch(userProfilError(userId)))
    }
};

export const blogPostAdd = () => ({
    type: BLOG_POST_LIST_ADD,
    data: {
        id: Math.floor(Math.random() * 100 + 3),
        title: 'A newly added blog post'
    }
});