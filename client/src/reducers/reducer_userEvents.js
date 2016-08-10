import * as types from '../actions/actionCreators';
// Would be handling all events a user is involved in
function userEvents(state=[], action) {
  switch(action.type) {
    case types.GET_USER_EVENTS:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default userEvents;
