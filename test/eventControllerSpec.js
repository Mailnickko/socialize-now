import Event from '../db/models/Event';
import { expect } from 'chai';
import * as eventController from '../controllers/eventController';

describe('eventController.js', () => {

  it('createEvent should create event', () => {
    expect(eventController.createEvent).to.be.a.function
  });

  it('getEvent should get an event', () => {
    expect(eventController.getEvent).to.be.a.function
  });

  it('getEvents should get events', () => {
    expect(eventController.getEvents).to.be.a.function
  });
});
