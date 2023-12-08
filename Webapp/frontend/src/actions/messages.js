// Import action types
import { CREATE_MESSAGE, GET_ERRORS } from "./types";

// Action to create a message
export const createMessage = msg => {
    // Return an action object with type CREATE_MESSAGE and a payload containing the message
    return {
        type: CREATE_MESSAGE,
        payload: msg
    };
};

// Action to return errors
export const returnErrors = (msg, status) => {
    // Return an action object with type GET_ERRORS and a payload containing the error message and status
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    }
}
