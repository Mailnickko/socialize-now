import Event from '../db/models/Event';
// import { expect } from 'chai';
import * as eventController from '../controllers/eventController';
import supertest from 'supertest';
import { app } from '../server';

const server = supertest.agent(app);

describe('API endpoints:', () => {
  let jwt

  before(() => {
    jwt = new Buffer('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NvY2FsaXplaHIuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEzNjk3ODQ4MTgyNTA2ODgxMDAxIiwiYXVkIjoiOWgxQ2dUNVZqc1hvVU9BZms2ZDRSQWo1WEMwRU84QW4iLCJpYXQiOjE0NzEyNDI0ODl9.ZZ3iFKS8Mfr-AWjFBrG-e9MeZYIXDVpgqup-JiA4BP8')
  });

  it("Get / should respond with html", done => {
    server
      .get("/")
      .expect(200)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        if (err) throw err
        done()
      })
  });

  it("Get catch-all route should respond with html", done => {
    server
      .get("/dfsal987")
      .expect(200)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        if (err) throw err
        done()
      })
  });

  it("Get /events should respond with events", done => {
    server
      .get("/events")
      .set('Authorization', jwt)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (!Array.isArray(res.body)) throw new Error('Not an array')
        //TODO: Check event objects have correct properties
      })
      .end((err, res) => {
        if (err) throw err
        done()
      })
  });
});
