import * as types from '../actions/actionTypes';

function userInfo(state={}, action) {
  switch(action.type) {
    case types.GET_USER_INFO:
      return action.payload.data || state;
    default:
      return state;
  }
}

export default userInfo;
