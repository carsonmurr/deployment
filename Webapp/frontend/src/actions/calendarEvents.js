import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_EVENTS, ADD_EVENT, DELETE_EVENT } from './types';

export const getEvents = () => (dispatch, getState) => {
	axios
		.get('/calendar/api/event/', tokenConfig(getState))
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
		.post('/calendar/api/event/', event, tokenConfig(getState))
		.then((res) => {
			dispatch(createMessage({ addEvent: 'Task Added' }));
			dispatch({
				type: ADD_EVENT,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.error("Add Event Error:", err);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const deleteEvent = (eventId) => (dispatch, getState) => {
	axios
		.delete(`/calendar/api/event/${eventId}/`, tokenConfig(getState))
		.then((res) => {
			dispatch(createMessage({ deleteEvent: 'event cancled' }));
			dispatch({
				type: DELETE_EVENT,
				payload: eventID,
			});
		})
		.catch((err) => console.log(err));
};