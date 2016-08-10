// Dummy reducer to collect dummy data
// import * as types from '../actions/actionCreators';

function suggestions(state=[], action) {
  // switch(action.type) {
  //   case types.INCREASE_VOTE:
  //     const i = action.index;
  //     return [
  //       ...state.slice(0, i),
  //       { ...state[i], netVotes: state[i].netVotes + 1 },
  //       ...state.slice(i+1)
  //     ]
  //   case types.DECREASE_VOTE:
  //     return [
  //       ...state.slice(0, i),
  //       { ...state[i], netVotes: state[i].netVotes - 1 },
  //       ...state.slice(i+1)
  //     ]
  //   default:
  //     return state;
  //}
  return state;
}

export default suggestions;
