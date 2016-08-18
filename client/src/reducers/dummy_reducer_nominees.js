// Dummy reducer to collect dummy data
import * as types from '../actions/actionTypes';

function nominees(state=[], action) {
  // let i = action.index;
  switch(action.type) {
    // case types.INCREASE_VOTE:
    //   return [
    //     ...state.slice(0, i),
    //     { ...state[i], netVotes: state[i].netVotes + 1 },
    //     ...state.slice(i+1)
    //   ]
    // case types.DECREASE_VOTE:
    //   return [
    //     ...state.slice(0, i),
    //     { ...state[i], netVotes: state[i].netVotes - 1 },
    //     ...state.slice(i+1)
    //   ]
    default:
      return state;
  }
}

export default nominees;
