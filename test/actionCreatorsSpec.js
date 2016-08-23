import { expect } from 'chai';
import nock from 'nock';
import * as actions from '../client/src/actions/actionCreators';
import * as types from '../client/src/actions/actionTypes';

describe('action creators', () => {

  const ROOT_URL = '/';

  describe('the sendMessage action creator', () => {
    it('should be a function', () => {
      expect(actions.sendMessage).to.be.a.function;
    });
    it('should have the correct type', () => {
      let action = actions.sendMessage();
      expect(action.type).to.equal(types.SEND_MESSAGE);
    });
  });

  describe('the getMessages action creator', () => {
    it('should be a function', () => {
      expect(actions.getMessages).to.be.a.function;
    });
    it('should have the correct type', () => {
      let action = actions.getMessages();
      expect(action.type).to.equal(types.GET_MESSAGES);
    });
  });

  describe('the grabUserEvents action creator', () => {
    const userEvents = {
      _id: '1234',
      choices: [],
      constraints: {
        date: '2016-08-15',
        locations: ['Los Angeles'],
        name: 'Event Name',
        priceRange: '2',
        tags: ['bars', 'movies'],
        time: '23:11'
      }
    };

    it('should be a function', () => {
      expect(actions.grabUserEvents).to.be.a.function;
    });
    it('should have the correct type', () => {
      let action = actions.grabUserEvents();
      expect(action.type).to.equal(types.GET_USER_EVENTS);
    });
    before(function() {
      nock(ROOT_URL)
        .post('/events')
        .reply(201, userEvents);
    });

    // //need to figure out how to grab actual data
    // it('should grab user events', () => {
    //   let action = actions.grabUserEvents();
    //   expect(action.payload).to.equal(userEvents);
    // });
  });

  describe('the grabUserInfo action creator', () => {
    it('should be a function', () => {
      expect(actions.grabUserInfo).to.be.a.function;
    });
    it('should have the correct type', () => {
      let action = actions.grabUserInfo();
      expect(action.type).to.equal(types.GET_USER_INFO);
    });
  });

  describe('the getUserStatus action creator', () => {
    it('should be a function', () => {
      expect(actions.getUserStatus).to.be.a.function;
    });
    it('should have the correct type', () => {
      let action = actions.getUserStatus();
      expect(action.type).to.equal(types.GET_USER_STATUS);
    });
  });

  describe('the getParticipants action creator', () => {
    it('should be a function', () => {
      expect(actions.getParticipants).to.be.a.function;
    });
    it('should return a dispatch function', () => {
      let action = actions.getParticipants();
      expect(action).to.be.a.function;
    });
  });

  describe('the createNewEvent action creator', () => {
    it('should be a function', () => {
      expect(actions.createNewEvent).to.be.a.function;
    });
    it('should return a dispatch function', () => {
      let action = actions.createNewEvent();
      expect(action).to.be.a.function;
    });
  });

  describe('the getEvent action creator', () => {
    it('should be a function', () => {
      expect(actions.getEvent).to.be.a.function;
    });
    it('should return a dispatch function', () => {
      let action = actions.getEvent();
      expect(action).to.be.a.function;
    });
  });

  describe('the inviteUser action creator', () => {
    it('should be a function', () => {
      expect(actions.inviteUser).to.be.a.function;
    });
    it('should return a dispatch function', () => {
      let action = actions.inviteUser();
      expect(action).to.be.a.function;
    });
  });

  describe('the startVote action creator', () => {
    it('should be a function', () => {
      expect(actions.startVote).to.be.a.function;
    });
    it('should return a dispatch function', () => {
      let action = actions.startVote();
      expect(action).to.be.a.function;
    });
  });

  describe('the endVote action creator', () => {
    it('should be a function', () => {
      expect(actions.endVote).to.be.a.function;
    });
    it('should return a dispatch function', () => {
      let action = actions.endVote();
      expect(action).to.be.a.function;
    });
  });

  // Should wait on these because they are likely to change

  describe('the increaseVote action creator', () => {
    it('should be a function', () => {
      expect(actions.increaseVote).to.be.a.function;
    });
    it('should return a dispatch function', () => {
      let action = actions.increaseVote();
      expect(action).to.be.a.function;
    });
  });

  describe('the decreaseVote action creator', () => {
    it('should be a function', () => {
      expect(actions.decreaseVote).to.be.a.function;
    });
    it('should return a dispatch function', () => {
      let action = actions.decreaseVote();
      expect(action).to.be.a.function;
    });
  });

  describe('the userLogout action creator', () => {
    it('should be a function', () => {
      expect(actions.userLogout).to.be.a.function;
    });
    it('should have the correct type', () => {
      let action = actions.userLogout();
      expect(action.type).to.equal(types.LOGOUT_SUCCESS);
    });
  });

  describe('the userLoginSuccess action creator', () => {
    it('should be a function', () => {
      expect(actions.userLoginSuccess).to.be.a.function;
    });
    it('should return a dispatch function', () => {
      let action = actions.userLoginSuccess();
      expect(action).to.be.a.function;
    });
  });

  describe('the userLoginError action creator', () => {
    it('should be a function', () => {
      expect(actions.userLoginError).to.be.a.function;
    });
    it('should have the correct type', () => {
      let action = actions.userLoginError();
      expect(action.type).to.equal(types.LOGIN_ERROR);
    });
  });
});
