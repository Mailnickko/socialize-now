import * as types from '../actions/actionCreators';
//state will most likely be useful here as an object
const INITIAL_STATE = {
  id: '',
  isVoting: false,
  winningResult: false,

}

function votingEvents(state=INITIAL_STATE, action) {
  switch(action.type) {
    case types.GET_USER_EVENTS:
      return [...state, action.payload];
    case types.CREATE_NEW_EVENT:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default userEvents;
