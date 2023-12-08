import { GET_TASKS, DELETE_TASK, UPDATE_TASK, ADD_TASK, UPDATE_COMPLETION } from '../actions/types.js';

const initialState = {
	tasks: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_TASKS:
			// Set the state with the tasks received in the action payload
			return {
				...state,
				tasks: action.payload,
			};
		case ADD_TASK:
			// Add the new task to the tasks array in the state
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			};
		case UPDATE_TASK:
			// Update the state with the tasks array where the specific task is replaced with the updated task
			return {
				...state,
				tasks: state.tasks.map((task) =>
				  task.id === action.payload.id ? action.payload : task),
			  };
		case DELETE_TASK:
			// Update the state with the tasks array excluding the deleted task
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};
		case UPDATE_COMPLETION:
			 // Update the state with the tasks array where the specific task's completion is replaced with the updated completion
			return {
				...state,
				tasks: state.tasks.map((task) =>
				task.id === action.payload.id ? action.payload : task),
			};
		default:
			return state;
	}
}
