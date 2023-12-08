// Meeting place for all other reducers
// e.g. auth reducer for authentication, error reducer for bringing errors down to specific components
import { combineReducers } from 'redux';
import errors from './errors';
import auth from './auth';
import messages from './messages';
import tasks from './tasks';
import discussions from './discussions';

export default combineReducers({
	errors,
	auth,
	messages,
	tasks,
	discussions
});