// Import Axios for making HTTP requests
import axios from 'axios';

// Import action creators for handling messages and errors
import { createMessage, returnErrors } from "./messages";

// Import action types
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';

// Helper function to configure the request headers with the authentication token
export const tokenConfig = getState => {
    // Get the token from the application state (Redux store)
    const token = getState().auth.token;

    // Default headers configuration
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If a token exists, add it to the headers
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    // Return the configured headers
    return config;
}

// Action to check token and load user information
export const loadUser = () => (dispatch, getState) => {
    // Dispatch an action indicating that user loading is in progress
    dispatch({ type: USER_LOADING });

    // Create a request to load the user information
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            // If successful, dispatch USER_LOADED action with user data
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            // If there's an error, dispatch error details and AUTH_ERROR action
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        });
}

// Action to log in a user
export const login = (username, password) => dispatch => {
    // Headers configuration for the request
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // Request body with user credentials
    const body = JSON.stringify({ username, password });

    // Send a POST request to the login API
    axios.post('/api/auth/login', body, config)
        .then((res) => {
            // If successful, dispatch LOGIN_SUCCESS action with token and user data
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            // If there's an error, log it, dispatch error details, and LOGIN_FAIL action
            console.log(err);
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL,
            })
        });
}

// Action to log out a user
export const logout = () => (dispatch, getState) => {
    // Send a POST request to the logout API with null as the body
    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then((res) => {
            // If successful, dispatch LOGOUT_SUCCESS action
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch(err => {
            // If there's an error, dispatch error details
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

// Action to register a new user
export const register = ({ first_name, last_name, username, password, email, employee_id }) => dispatch => {
    // Headers configuration for the request
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // Request body with user registration data
    const body = JSON.stringify({ first_name, last_name, username, password, email, employee_id });

    // Send a POST request to the register API
    axios.post('/api/auth/register', body, config)
        .then((res) => {
            // If successful, dispatch REGISTER_SUCCESS action with user data
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            // Dispatch a message to indicate successful user registration
            dispatch(createMessage({ registerUser: 'User registered successfully.' }))
        })
        .catch((err) => {
            // If there's an error, log it, dispatch error details, and REGISTER_FAIL action
            console.log(err);
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL,
            })
        });
}

// actions/auth.js

// Action to update the user's username
export const updateUsername = (newUsername) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    const body = JSON.stringify({ username: newUsername });

    axios.patch('/api/auth/settings', body, config)
        .then((res) => {
            dispatch({
                type: USER_LOADED,  // Refresh user information after update
                payload: res.data
            });
            dispatch(createMessage({ updateUsername: 'Username updated successfully.' }));
        })
        .catch((err) => {
            console.log(err);
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// Action to update the user's password
export const updatePassword = (newPassword) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    const body = JSON.stringify({ password: newPassword });

    axios.patch('/api/auth/settings', body, config)
        .then((res) => {
            dispatch(createMessage({ updatePassword: 'Password updated successfully.' }));
        })
        .catch((err) => {
            console.log(err);
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
