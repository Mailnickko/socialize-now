import * as types from '../actions/actionCreators';
//state will most likely be useful here as an object
const INITIAL_STATE = {
  id: '',
  isVoting: false,
  winningResult: false
}

function eventVoteStatus(state=INITIAL_STATE, action) {
  switch(action.type) {
    case types.START_VOTING:
      return { ...state, isVoting: true };
    case types.SET_WINNING_RESULT:
      return { ...state, winningResult: true };
    default:
      return state;
  }
}

export default eventVoteStatus;
