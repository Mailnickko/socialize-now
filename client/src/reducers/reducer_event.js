import * as types from '../actions/actionTypes';

function event(state={}, action) {
  switch (action.type){

    case types.FIND_EVENT:
      return action.payload || state;

    default:
      return state;
  }
}

export default event;
