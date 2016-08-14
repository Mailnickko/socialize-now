import * as types from '../actions/actionTypes';

const token = localStorage.getItem('id_token');
const profile = localStorage.getItem('profile');
const INITIAL_STATE = {
  isAuthenticated: token && profile ? true : false,
  errorMessage: '',
  profile: profile
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
