import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_USERNAME } from './types';

// GET USERNAME
export const getUsername = () => (dispatch, getState) => {
	axios
		.get('api/auth/user', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_USERNAME,
				payload: res.data,
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
