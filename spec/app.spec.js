process.env.NODE_ENV = 'test';
const { app } = require('../app');
const request = require('supertest')(app);
const chai = require('chai');
const { expect } = require('chai');
const chaiSorted = require('chai-sorted');
const { connection } = require('../server/connection');

chai.use(chaiSorted);

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/users', () => {
    describe('POST', () => {
      it('adds a new user', () => {
        const user = { first_name: 'Alex', surname: 'Jones' };
        return request
          .post('/api/users')
          .send(user)
          .expect(201)
          .then(({ body: { user } }) => {
            expect(user).to.include.keys('id', 'first_name', 'surname');
          });
      });
    });
  });
  describe('/users/:user_id', () => {
    describe('GET', () => {
      it('gets a user by id', () => {
        return request
          .get('/api/users/1')
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.contain.keys('id', 'first_name', 'surname');
          });
      });
      // it('status:404 for an invalid user id', () => {
      //   return request
      //     .get('/api/users/4')
      //     .expect(404)
      //     .then(({ body: { msg } }) => {
      //       expect(msg).to.equal('not found');
      //     });
      // });
    });
  });
  describe('/devices/:user_id', () => {
    describe('GET', () => {
      it('gets all devices for a user', () => {
        return request
          .get('/api/devices/1')
          .expect(200)
          .then(({ body: { devices } }) => {
            expect(devices.length).to.equal(2);
            expect(devices[0]).to.contain.keys('id', 'user_id', 'push_key');
          });
      });
      // it('status:404 for an invalid user id', () => {
      //   return request
      //     .get('/api/devices/4')
      //     .expect(404)
      //     .then(({ body: { msg } }) => {
      //       expect(msg).to.equal('not found');
      //     });
      // });
    });
    describe('POST', () => {
      it('adds a new device', () => {
        const device = { push_key: '84jjdjd' };
        return request
          .post('/api/devices/1')
          .send(device)
          .expect(201)
          .then(({ body: { device } }) => {
            expect(device).to.include.keys('id', 'user_id', 'push_key');
          });
      });
    });
  });
  describe('/meds/:user_id', () => {
    describe('GET', () => {
      it('gets all medications for a user', () => {
        return request
          .get('/api/meds/1')
          .expect(200)
          .then(({ body: { meds } }) => {
            expect(meds.length).to.equal(1);
            expect(meds[0]).to.contain.keys(
              'id',
              'user_id',
              'type',
              'due',
              'taken'
            );
          });
      });
      // it('status:404 for an invalid user id', () => {
      //   return request
      //     .get('/api/meds/4')
      //     .expect(404)
      //     .then(({ body: { msg } }) => {
      //       expect(msg).to.equal('not found');
      //     });
      // });
    });
    describe('POST', () => {
      it('adds a new medication', () => {
        const time = new Date(1564412400000);
        const med = { user_id: 1, type: 'codeine', due: time };
        return request
          .post('/api/meds/1')
          .send(med)
          .expect(201)
          .then(({ body: { med } }) => {
            expect(med).to.include.keys(
              'id',
              'user_id',
              'type',
              'due',
              'taken'
            );
          });
      });
    });
  });
  describe('/meds/:med_id', () => {
    describe('PATCH', () => {
      it('updates taken to true', () => {
        return request
          .patch('/api/meds/1')
          .send({ taken: true })
          .expect(200)
          .then(({ body: { patchedMed } }) => {
            expect(patchedMed.taken).to.eql(true);
          });
      });
    });
    describe('DELETE', () => {
      it('Deletes a medication', () => {
        return request.delete('/api/meds/1').expect(204);
      });
    });
  });
  describe('/events/:user_id', () => {
    describe('GET', () => {
      it('gets all events for a user', () => {
        return request
          .get('/api/events/1')
          .expect(200)
          .then(({ body: { events } }) => {
            expect(events[0]).to.contain.keys(
              'id',
              'user_id',
              'time',
              'description'
            );
          });
      });
      // it('status:404 for an invalid user id', () => {
      //   return request
      //     .get('/api/events/4')
      //     .expect(404)
      //     .then(({ body: { msg } }) => {
      //       expect(msg).to.equal('not found');
      //     });
      // });
    });
    describe('POST', () => {
      it('adds a new event', () => {
        return request
          .post('/api/events/1')
          .send({ description: 'new event' })
          .expect(201)
          .then(({ body: { event } }) => {
            expect(event).to.contain.keys(
              'id',
              'user_id',
              'time',
              'description'
            );
          });
      });
    });
  });
  describe('/events/:event_id', () => {
    describe('PATCH', () => {
      it('updates event description', () => {
        return request
          .patch('/api/events/1')
          .send({ description: 'new description' })
          .expect(200)
          .then(({ body: { patchedEvent } }) => {
            expect(patchedEvent.description).to.eql('new description');
          });
      });
    });
    describe('DELETE', () => {
      it('deletes an event', () => {
        return request.delete('/api/events/1').expect(204);
      });
    });
  });
  describe('/quiz/:user_id', () => {
    describe('GET', () => {
      it('gets all questionnaire responses', () => {
        return request
          .get('/api/quiz/1')
          .expect(200)
          .then(({ body: { quizzes } }) => {
            expect(quizzes[0]).to.contain.keys(
              'id',
              'user_id',
              'due',
              'completed',
              'completed_at',
              'status',
              'mood',
              'stiffness',
              'slowness',
              'tremor'
            );
          });
      });
      // it('status:404 for an invalid user id', () => {
      //   return request
      //     .get('/api/quiz/4')
      //     .expect(404)
      //     .then(({ body: { msg } }) => {
      //       expect(msg).to.equal('not found');
      //     });
      // });
    });
    describe('POST', () => {
      it('posts a new questionnaire response', () => {
        const due = new Date(1564412400000);
        return request
          .post('/api/quiz/1')
          .send({
            due,
            status: 1,
            mood: 1,
            stiffness: 1,
            slowness: 1,
            tremor: 1
          })
          .expect(201)
          .then(({ body: { quiz } }) => {
            expect(quiz).to.contain.keys(
              'id',
              'user_id',
              'due',
              'completed',
              'completed_at',
              'status',
              'mood',
              'stiffness',
              'slowness',
              'tremor'
            );
          });
      });
    });
  });
  describe('/quiz/:quiz_id', () => {
    describe('PATCH', () => {
      it('updates questionnnaire result', () => {
        return request
          .patch('/api/quiz/1')
          .send({
            status: 0,
            mood: 0,
            stiffness: 0,
            slowness: 0,
            tremor: 5
          })
          .expect(200)
          .then(({ body: { patchedQuiz } }) => {
            expect(patchedQuiz.tremor).to.eql(5);
          });
      });
    });
    describe('DELETE', () => {
      it('deletes a questionnaire result', () => {
        return request.delete('/api/quiz/1').expect(204);
      });
    });
  });
});
