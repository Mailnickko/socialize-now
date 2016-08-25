import * as types from '../actions/actionTypes';
// Would be handling all events a user is involved in
  //might need to change the initial state here according to the types of object we get back
    //Also should figure out if we should order these by date

function userEvents(state=null, action) {
  switch(action.type) {
    case types.GET_USER_EVENTS:
      return action.payload.data || state;
    case types.CREATE_NEW_EVENT:
      return [ ...state, action.payload ];
    default:
      return state;
  }
}

export default userEvents;
