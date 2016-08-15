import { expect } from 'chai';
import * as actions from './client/src/actionCreators';
import * as types from './client/src/actionTypes';

describe('the action creators methods', () => {
  describe('the sendMessage action creator', function() {
    expect(actions.sendMessage).to.be.a.function;
  });

  describe('the getMessages action creator', function() {
    expect(actions.getMessages).to.be.a.function;
  });

  describe('the grabUserEvents action creator', function() {
    expect(actions.grabUserEvents).to.be.a.function;
  });

  describe('the grabUserInfo action creator', function() {
    expect(actions.grabUserInfo).to.be.a.function;
  });

  describe('the createNewEvent action creator', function() {
    expect(actions.createNewEvent).to.be.a.function;
  });

  describe('the startVote action creator', function() {
    expect(actions.startVote).to.be.a.function;
  });

  describe('the setWinningResult action creator', function() {
    expect(actions.setWinningResult).to.be.a.function;
  });

  describe('the increaseVote action creator', function() {
    expect(actions.increaseVote).to.be.a.function;
  });

  describe('the decreaseVote action creator', function() {
    expect(actions.decreaseVote).to.be.a.function;
  });

  describe('the userLogout action creator', function() {
    expect(actions.userLogout).to.be.a.function;
  });

  describe('the userLoginSuccess action creator', function() {
    expect(actions.userLoginSuccess).to.be.a.function;
  });

  describe('the userLoginError action creator', function() {
    expect(actions.userLoginError).to.be.a.function;
  });
});
