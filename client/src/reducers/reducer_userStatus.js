import * as types from '../actions/actionTypes';

function userInfo(state=[], action) {
  switch(action.type) {
    case types.GET_USER_STATUS:
      return action.payload || state;
    default:
      return state;
  }
}

export default userInfo;
