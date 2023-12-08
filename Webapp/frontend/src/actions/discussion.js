import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';
import { CREATE_DISCUSSIONUSER, DISCUSSION_MAIN, GET_DISCUSSION, CREATE_DISCUSSION, POST_SENT} from './types';


export const loadDiscussion = (di) => (dispatch, getState) => {
    axios
        .get(`/api/${di}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_DISCUSSION,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const createDiscussion = (discussion) => (dispatch, getState) => {
    axios
        .post(`api/newdiscussion/`, discussion, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CREATE_DISCUSSION,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const sendMessage = (message, di) => (dispatch, getState) => {
    axios
        .post(`api/${di}`, message, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: POST_SENT,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getDiscussions = () => (dispatch, getState) => {
    axios
        .get('api/', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DISCUSSION_MAIN,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addParticipants = (dus) => (dispatch, getState) => {
    axios
            .post('api/discussionuser', dus, tokenConfig(getState))
            .then((res) => {
                dispatch({
                    type: CREATE_DISCUSSIONUSER,
                    payload: res.data,
                });
            })
            .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}