import Event from '../db/models/Event';
import User from '../db/models/User';
// import { expect } from 'chai';
import * as eventController from '../controllers/eventController';
import supertest from 'supertest';
import { app } from '../server';

const server = supertest.agent(app);

describe('API endpoints:', () => {
  let jwt;
  let eventId;

  before(() => {
    //This is a test jwt that can be exposed publicly.
    jwt = new Buffer('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NvY2FsaXplaHIuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEzNjk3ODQ4MTgyNTA2ODgxMDAxIiwiYXVkIjoiOWgxQ2dUNVZqc1hvVU9BZms2ZDRSQWo1WEMwRU84QW4iLCJpYXQiOjE0NzEyNDI0ODl9.ZZ3iFKS8Mfr-AWjFBrG-e9MeZYIXDVpgqup-JiA4BP8');

    //Create sample event
    let constraints = {
        date: "2016-01-01",
        time: "1:00",
        name: "Test Event",
        locations: "Paris",
        priceRange: 3
      };

    //Create user sample

    //Create the user
    server
      .post("/user")
      .set('Authorization', jwt)
      .send({picture:'picture', email: 'email', name: 'name'})
      .end ((err, res) => {
        if(err) throw err;
      });

    server
      .post("/event")
      .set('Authorization', jwt)
      .send(constraints)
      .expect(event => {
        console.log(event)
        eventId = event.res.body._id;
        //TODO: Check event objects have correct properties
      })
      .end((err, res) => {
        if (err) throw err;
      });
  });

  describe('Root endpoint "/"', ()=> {
    xit("Get / should respond with html", done => {
      server
        .get("/")
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
          if (err) throw err
          done()
        })
    });
  })

  describe('catch-all endpoint', ()=> {
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
  })


  describe('/events endpoint', () => {
    it("post should respond with events", done => {
      server
        .post("/events")
        .set('Authorization', jwt)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          done()
        })
    });
  });

  describe('/event endpoint', ()=> {
    it("post should respond with an event", done => {
      server
        .post("/event")
        .set('Authorization', jwt)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          done()
        })
    });
  })


  describe('/inviteUser endpoint', ()=> {
    it("/should work", done => {
      let req = {
        _id : '1234Test',
        inviteeEmail: 'test@test.com',
      };

      server
        .post("/inviteUser")
        .set('Authorization', jwt)
        .send(req)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          done()
        })
    });
  })

  describe('/startVote endpoint', ()=> {
    it("/should work", done => {
      server
        .put("/startVote")
        .set('Authorization', jwt)
        .send({_id: eventId})
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          done()
        })

      done()
    });
  })

  describe('/endVote endpoint', ()=> {
    it("should work", done => {
      let body = {
        winningEvent: {},
        eventId: eventId
      };

      server
        .put("/endVote")
        .set('Authorization', jwt)
        .send(body)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          done()
        })
    });
  })

  describe('/upvote endpoint', ()=> {
    it("should work", done => {
      let body = {
        eventId: eventId,
        index: 0
      }

      server
        .put("/upVote")
        .set('Authorization', jwt)
        .send(body)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          done()
        })
    });
  })

  describe('/downvote endpoint', ()=> {
    it("should work", done => {
      server
        .put("/downVote")
        .set('Authorization', jwt)
        .expect(404)
        .end((err, res) => {
          if (err) throw err
          done()
        })
      done();
    });
  })
});
