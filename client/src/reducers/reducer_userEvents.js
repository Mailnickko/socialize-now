import * as types from '../actions/actionTypes';
// Would be handling all events a user is involved in
  //might need to change the initial state here according to the types of object we get back
    //Also should figure out if we should order these by date
const INITIAL_STATE = [
  {
    locationName: "Event1",
    locationImg: "http://placehold.it/200x200",
    locationInfo: "http://www.google.com",
  },
  {
    locationName: "Event2",
    locationImg: "http://placehold.it/200x200",
    locationInfo: "http://www.google.com",
  },
  {
    locationName: "Event3",
    locationImg: "http://placehold.it/200x200",
    locationInfo: "http://www.google.com",
  },
  {
    locationName: "Event4",
    locationImg: "http://placehold.it/200x200",
    locationInfo: "http://www.google.com",
  },
]
function userEvents(state=INITIAL_STATE, action) {
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
