import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  errorMessage: '',
  profile: localStorage.getItem('profile')
};

function auth(state=INITIAL_STATE, action) {
  switch (action.type){
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: '',
        profile: {}
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: '',
        profile: action.profile
      };

    case types.LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.errorMessage,
        profile: {}
      };

    default:
      return state;
  }
}

export default auth;
