import * as types from '../actions/actionTypes';

function participants(state=[], action) {
  switch(action.type) {
    case types.GET_PARTICIPANTS:
      return action.payload || state;
    default:
      return state;
  }
}

export default participants;
