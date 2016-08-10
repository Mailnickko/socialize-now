import * as types from '../actions/actionTypes';
//state will most likely be useful here as an object

function eventVoteStatus(state=null, action) {
  switch(action.type) {
    case types.START_VOTING:
      return { ...state, isVoting: true };
    case types.SET_WINNING_RESULT:
      return { ...state, winningResult: true, theWinner: action.payload };
    default:
      return state;
  }
}

export default eventVoteStatus;
