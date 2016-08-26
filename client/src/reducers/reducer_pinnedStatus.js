import * as types from '../actions/actionTypes';

function pinnedStatus(state=false, action) {
  switch (action.type){
    case types.TOGGLE_PIN_STATUS:
      return !state;
    default:
      return state;
  }
}

export default pinnedStatus;
