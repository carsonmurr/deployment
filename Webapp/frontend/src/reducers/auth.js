// Import action type constants
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types"

// Initial state for the authentication reducer
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
}

// Authentication reducer function
export default function(state=initialState, action){
  switch(action.type){
		// When user loading action is dispatched
	  case USER_LOADING:
		  return {...state, isLoading:true};
		// When user loaded action is dispatched
	  case USER_LOADED:
		  return {
			  ...state,
			  isAuthenticated: true,
			  isLoading:false,
			  user: action.payload
		  }
		// When login or register success action is dispatched
	  case LOGIN_SUCCESS:
	  case REGISTER_SUCCESS:
		  localStorage.setItem('token', action.payload.token);
		  return {
			  ...state,
			  ...action.payload,
			  isAuthenticated:true,
			  isLoading:false,
		  }
	  case AUTH_ERROR:
	  case LOGIN_FAIL:
	  case LOGOUT_SUCCESS:
	  case REGISTER_FAIL:
		  localStorage.removeItem('token'); // Remove token from local storage
		  return{
			  ...state,
			  token:null,
			  user:null,
			  isAuthenticated:false,
			  isLoading:false
		  }
	  default:
		  return state;
  }
}