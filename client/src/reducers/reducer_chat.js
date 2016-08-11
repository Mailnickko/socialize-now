import * as types from '../actions/actionTypes';

function chat(state=[], action) {
  switch (action.type){
    case types.SEND_MESSAGE:
      return state;

    case types.GET_MESSAGES:
      return action.payload.data || state;

    default:
    return state;
  }
}

export default chat;
