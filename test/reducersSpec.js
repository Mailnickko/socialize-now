import { expect } from 'chai';
import * as types from '../client/src/actions/actionTypes';
import EventReducer from '../client/src/reducers/reducer_event';
import UserInfoReducer from '../client/src/reducers/reducer_userInfo';
import ChatReducer from '../client/src/reducers/reducer_chat';

describe('reducers', () => {
// EVENT REDUCER
  describe('the event reducer', () => {
    const findAction = {
      type: types.FIND_EVENT,
      payload: {
        foo: 'bar',
      },
    };
    const startAction = {
      type: types.START_VOTING,
      payload: {
        foo: 'bar',
        start: true,
        end: false,
      },
    };
    const endAction = {
      type: types.END_VOTING,
      payload: {
        foo: 'bar',
        start: false,
        end: true,
      },
    };
    const INITAL_STATE = {
      isVoting: false,
      voteCompleted: false,
      choice: [],
    };
    const EXISTING_STATE = {
      isVoting: true,
      voteCompleted: false,
      choice: [],
    };
    it('should handle action with an unknown type', () => {
      expect(EventReducer(undefined, {})).to.eql({});
    });
    it('should handle action of FIND_EVENT', () => {
      expect(EventReducer({}, findAction)).to.eql({
        foo: 'bar'
      });
    });
    it('should handle action of START_VOTING', () => {
      expect(EventReducer(INITAL_STATE, startAction)).to.eql({
        foo: 'bar',
        start: true,
        end: false
      });
    });
    it('should handle action of END_VOTING', () => {
      expect(EventReducer(EXISTING_STATE, endAction)).to.eql({
        foo: 'bar',
        start: false,
        end: true
      });
    });
    it('should handle action of INCREASE_VOTE', () => {
      expect(EventReducer(EXISTING_STATE, endAction)).to.eql({
        foo: 'bar',
        start: false,
        end: true
      });
    });
    it('should handle action of DECREASE_VOTE', () => {
      expect(EventReducer(EXISTING_STATE, endAction)).to.eql({
        foo: 'bar',
        start: false,
        end: true
      });
    });
  });

  //USER INFO REDUCER
  describe('the user info Reducer', () => {
    const action = {
      type: types.GET_USER_INFO,
      payload: {
        data: {
          foo: 'bar',
          baz: 'qux'
        }
      }
    };
    it('should handle action with an unknown type', () => {
      expect(UserInfoReducer(undefined, {})).to.eql({});
    });
    it('should handle action of type GET_USER_INFO', () => {
      expect(UserInfoReducer({}, action)).to.eql({
        foo: 'bar',
        baz: 'qux'
      });
    });
  });

  //CHAT REDUCER
  describe('the chat reducer', () => {
    const action = {
      type: types.GET_MESSAGES,
      payload: {
        data: [{baz: 'qux'}]
      }
    };
    it('should handle action with an unknown type', () => {
      expect(ChatReducer(undefined, {})).to.eql([]);
    });
    it('should handle action with a type of SEND_MESSAGE', () => {
      expect(ChatReducer([{foo: 'bar'}], {
        type: types.SEND_MESSAGE,
        payload: {}
      })).to.eql([{foo: 'bar'}]);
    });
    it('should handle action with a type of GET_MESSAGES', () => {
      expect(ChatReducer([{foo: 'bar'}], action)).to.eql([{baz: 'qux'}]);
    });
  });
});
