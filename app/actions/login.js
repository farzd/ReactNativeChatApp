import { facebookLogin, facebookLogout, checkAccessToken, getInfo } from '../utils/facebookAPI.js';

export function attempt() {
    return {
        type: 'LOADING'
    };
}

export function errors(err) {
    return {
        type: 'ERROR',
        err
    };
}

export function loggedin() {
    return {
        type: 'LOGIN',
    };
}

export function loggedout() {
    return {
        type: 'LOGOUT'
    };
}

export function addUser(id, name, profileURL, profileWidth, profileHeight) {
    return {
        type: 'ADD_USER',
        id,
        name,
        profileURL,
        profileWidth,
        profileHeight
    };
}

function getUserInfo(dispatch) {
    console.log('getting user info');
    getInfo().then((result) => {
        dispatch(loggedin());
        dispatch(addUser(result.id, result.name, result.picture.data.url, result.picture.data.width, result.picture.data.height));
    }).catch((err) => {
        dispatch(errors(err));
    });
}

export function login() {
    return dispatch => {
        dispatch(attempt());
        facebookLogin().then(() => {
            getUserInfo(dispatch);
        }).catch((err) => {
            dispatch(errors(err));
        });
    };
}

export function checkIfLoggedIn() {
    return dispatch => {
        dispatch(attempt());
        checkAccessToken().then((result) => {
            console.log('found access token ', result);
            getUserInfo(dispatch);
        }).catch((err) => {
            console.log('no access token found', err);
            dispatch(loggedout());
        });
    };
}

export function logout() {
    return dispatch => {
        dispatch(attempt());
        facebookLogout().then(() => {
            dispatch(loggedout());
        });
    };
}
