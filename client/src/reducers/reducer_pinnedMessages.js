import * as types from '../actions/actionTypes';

function pinnedMessages(state=[], action) {
  switch (action.type){
    case types.TOGGLE_PIN:
      return state;
    case types.GET_PINNED_MESSAGES:
      return action.payload;
    default:
      return state;
  }
}

export default pinnedMessages;
