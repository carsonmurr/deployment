import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, GET_USERS } from '../actions/types.js';

const initialState = {
	events: [],
	users: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_EVENTS:
			return {
				...state,
				events: action.payload,
			};
		case GET_USERS:
			return {
				...state,
				users: action.payload,
			};
		case ADD_EVENT:
			return {
				...state,
				events: [...state.events, action.payload],
			};
		case DELETE_EVENT:
			return {
				...state,
				events: state.events.filter((event) => event.id !== action.payload),
			};
		default:
			return state;
	}
}