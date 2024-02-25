import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, ADD_EVENT_TO_ALL } from './types';

export const getEvents = () => (dispatch, getState) => {
	axios
		.get('/api/event/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_EVENTS,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addEvent = (event) => (dispatch, getState) => {
	axios
		.post('/api/event/', event, tokenConfig(getState))
		.then((res) => {
			dispatch(createMessage({ addEvent: 'Event Added' }));
			dispatch({
				type: ADD_EVENT,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addEventToAll = (event) => (dispatch, getState) => {
	axios
		.post('/api/all-events/', event, tokenConfig(getState))
		.then((res) => {
			dispatch(createMessage({ addEvent: 'Event Added' }));
			dispatch({
				type: ADD_EVENT_TO_ALL,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteEvent = (eventId) => (dispatch, getState) => {
	axios
		.delete(`/api/event/${eventId}/`, tokenConfig(getState))
		.then((res) => {
			dispatch(createMessage({ deleteEvent: 'Event Canceled' }));
			dispatch({
				type: DELETE_EVENT,
				payload: eventID,
			});
		})
		.catch((err) => console.log(err));
};