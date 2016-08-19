import * as types from '../actions/actionTypes';

function event(state={}, action) {
  let i = action.index;
  let currentChoices = state.choices;
  switch (action.type){
    case types.FIND_EVENT:
      return action.payload || state;
    case types.START_VOTING:
      return action.payload;
    case types.END_VOTING:
      return action.payload;
    case types.INCREASE_VOTE:
      return action.payload;
    case types.DECREASE_VOTE:
      return action.payload;
    default:
      return state;
  }
}

export default event;
