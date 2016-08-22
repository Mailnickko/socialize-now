import Event from '../db/models/Event';
import * as eventController from '../controllers/eventController';
import supertest from 'supertest';
import { app } from '../server';
import { expect } from 'chai';

describe ('eventController should', () => {
  it('have a createEvent method', () => {
    expect(eventController.createEvent).to.be.a('function');
  });

  it('have a getEvents method', () => {
    expect(eventController.getEvents).to.be.a('function');
  });

  it('have a getEvent method', () => {
    expect(eventController.getEvent).to.be.a('function');
  });

  it('have a beginEventVote method', () => {
    expect(eventController.beginEventVote).to.be.a('function');
  });

  it('have a endEventVote method', () => {
    expect(eventController.endEventVote).to.be.a('function');
  });

  it('have a upVote method', () => {
    expect(eventController.upVote).to.be.a('function');
  });

  it('have a downVote method', () => {
    expect(eventController.downVote).to.be.a('function');
  });

})