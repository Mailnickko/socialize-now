import Event from '../db/models/Event';
// import { expect } from 'chai';
import * as eventController from '../controllers/eventController';
import supertest from 'supertest';
import { app } from '../server'

const server = supertest.agent(app);

describe('routes', () => {

  it(" '/' should respond with html", done => {
    server
      .get("/")
      .expect(200)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        if (err) throw err
        done()
      })
  });

});
