process.env.NODE_ENV = 'test';
const { app } = require('../app');
const request = require('supertest')(app);
const chai = require('chai');
const { expect } = require('chai');
const chaiSorted = require('chai-sorted');
const { connection } = require('../server/connection');
const utilTests = require('./utils.spec')
const dbUtilTests = require('./db_call_utils.spec')
const moment = require('moment')

chai.use(chaiSorted);


//the testRequestNew and testPairDevice functions invoke
//backend utils which involve setTimeout
//this causes them to behave incorrectly when the whole test
//suite runs at once - test them individually

const testRequestNew = false;
if(testRequestNew) {
  describe('/codes/requestnew', () => {
    beforeEach(() => connection.seed.run());
    describe('db call utils', dbUtilTests)
    describe('data manipulation utils', utilTests)
    describe('GET', () => {
      it('generates an authentication code', () => {
        return request
          .get('/api/codes/requestnew/1')
          .expect(200)
          .then(({ body : { code }}) => {
            expect(code).to.include.keys('id', 'user_id', 'code')
            expect(code.code.length).to.equal(4);
          });
      });
    });
  });
};
const testPairDevice = false;
if(testPairDevice) {
  describe('/codes/pairdevice', () => {
    beforeEach(() => connection.seed.run());
    describe('POST', () => {
      it('pairs an amazon id to a user account', () => {
        return request
          .get('/api/codes/requestnew/1')
          .expect(200)
          .then(({ body : { code }}) => {
            const inputCode = code.code;
            return inputCode;
          })
          .then(inputCode => {
            const header = { amazonid: '<<<<<<<<<<<<<  test CODE'};
            const body = { inputCode }
            return request
            .post('/api/codes/alexa')
            .set(header)
            .send(body)
            .expect(201)
            .then(({ body : { confirmation }}) => {
              expect(confirmation).to.equal(true);
            });
          });
      });
      it('rejects an invalid key', () => {
        return request
          .get('/api/codes/requestnew/2')
          .expect(200)
          .then(({ body : { code }}) => {
            const inputCode = code.code;
            return inputCode;
          })
          .then(inputCode => {
            const header = { amazonid: '<<<<<<<<<<<<<  test CODE'};
            const body = { inputCode: '0000' }
            return request
            .post('/api/codes/alexa')
            .set(header)
            .send(body)
            .expect(200)
            .then(({ body : { confirmation }}) => {
              expect(confirmation).to.equal(false);
            });
          });
      });
    });
  });
};

const testOther = true;
if(testOther){

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
      it('status:404 for an invalid user id', () => {
        return request
          .get('/api/users/4')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('No user found');
          });
      });
    });
  });
  describe('/devices/app/:user_id', () => {
    describe('GET', () => {
      it('gets all devices for a user', () => {
        return request
          .get('/api/devices/app/1')
          .expect(200)
          .then(({ body: { devices } }) => {
            expect(devices.length).to.equal(3);
            expect(devices[0]).to.contain.keys(
              'id',
              'user_id',
              'push_key',
              'amazon_id'
            );
          });
      });
      it('status:404 for an invalid user id', () => {
        return request
          .get('/api/devices/app/4')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('No devices found');
          });
      });
    });
    describe('POST', () => {
      it('adds a new device', () => {
        const device = { push_key: '84jjdjd' };
        return request
          .post('/api/devices/app/1')
          .send(device)
          .expect(201)
          .then(({ body: { device } }) => {
            expect(device).to.include.keys('id', 'user_id', 'push_key');
          });
      });
    });
  });
  describe('/devices/alexa', () => {
    describe('GET', () => {
      it('returns true if device is paired', () => {
        const headers = { amazonid: 'a1234' }
        return request
          .get('/api/devices/alexa')
          .set(headers)
          .expect(200)
          .then(({ body : {confirmation}}) => {
            expect(confirmation).to.be.true
          })
      });
    });
  });
  describe('/meds/app/taken/:user_id', () => {
    describe('POST', () => {
      it('marks next due medication as taken', () => {
        const dueAt = moment(new Date(Date.now() + 180000)).utc().format().replace(/:[0-9]{2}Z/, ':00.000Z')
        const med = { type: 'testMed', due: dueAt };
        return request
          .post('/api/meds/app/all/1')
          .send(med)
          .then(med => {
            return request
              .post('/api/meds/app/taken/1')
              .expect(201)
              .then(({ body }) => {
                const { confirmation, patchedMed, message } = body;
                expect(confirmation).to.equal(true);
                expect(message).to.equal('your medication testMed was successfully recorded as taken');
                expect(patchedMed).to.include.keys('id', 'user_id', 'type', 'due', 'taken', 'taken_at')
                const { user_id, due, type, taken } = patchedMed;
                expect(user_id).to.equal(1);
                expect(type).to.equal('testMed');
                expect(due).to.equal(dueAt);
                expect(taken).to.equal(true);
              });
          });
      });
      it('marks slightly overdue medication as taken', () => {
        const dueAt = moment(new Date(Date.now() - 45000)).utc().format().replace(/:[0-9]{2}Z/, ':00.000Z')
        const med = { type: 'testMed', due: dueAt };
        return request
          .post('/api/meds/app/all/1')
          .send(med)
          .then(med => {
            return request
              .post('/api/meds/app/taken/1')
              .expect(201)
              .then(({ body }) => {
                const { confirmation, patchedMed, message } = body;
                expect(confirmation).to.equal(true);
                expect(message).to.equal('your medication testMed was successfully recorded as taken');
                expect(patchedMed).to.include.keys('id', 'user_id', 'type', 'due', 'taken', 'taken_at')
                const { user_id, due, type, taken } = patchedMed;
                expect(user_id).to.equal(1);
                expect(type).to.equal('testMed');
                expect(taken).to.equal(true);
                expect(due).to.equal(dueAt);
              });
          });
      });
      it('will not mark medication as taken too early', () => {
        const dueAt = new Date(Date.now() + 9000000)
        const med = { type: 'testMed', due: dueAt };
        return request
          .post('/api/meds/app/all/1')
          .send(med)
          .then(med => {
            return request
              .post('/api/meds/app/taken/1')
              .expect(400)
              .then(({ body }) => {
                const { confirmation, patchedMed, message } = body;
                expect(confirmation).to.equal(false);
                expect(message).to.equal('your medication could not be recorded as taken');
              });
          });
      });
      it('will not mark medication as taken too late', () => {
        const dueAt = new Date(Date.now() - 9000000)
        const med = { type: 'testMed', due: dueAt };
        return request  
          .post('/api/meds/app/all/1')
          .send(med)
          .then(med => {
            return request
              .post('/api/meds/app/taken/1')
              .expect(400)
              .then(({ body }) => {
                const { confirmation, patchedMed, message } = body;
                expect(confirmation).to.equal(false);
                expect(message).to.equal('your medication could not be recorded as taken');
              });
          });
      });
    });
  });
  describe('/meds/app/daily/:user_id', () => {
    describe('GET', () => {
      it('returns all medications for a user due in the next 24h', () => {
        const time = new Date(Date.now() + 600000);
        const med = { type: 'testMed', due: time }
        return request
          .post('/api/meds/app/all/1')
          .send(med)
          .then( x => {
            return request
            .get('/api/meds/app/daily/1')
            .expect(200)
            .then(({ body: { meds } }) => {
              expect(meds.length).to.equal(1);
              expect(meds[0]).to.contain.keys(
                'id',
                'user_id',
                'type',
                'due',
                'taken',
                'taken_at',
                'status'
              );
              expect(meds[0].type).to.equal('testMed')
            });
          });
      });
    });
  });
  describe('/meds/app/all/:user_id', () => {
    describe('GET', () => {
      it('gets all medications for a user', () => {
        return request
          .get('/api/meds/app/all/1')
          .expect(200)
          .then(({ body: { meds } }) => {
            expect(meds.length).to.equal(1);
            expect(meds[0]).to.contain.keys(
              'id',
              'user_id',
              'type',
              'due',
              'taken',
              'taken_at',
              'status'
            );
          });
      });
      it('status:404 for an invalid user id', () => {
        return request
          .get('/api/meds/app/all/4')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('No such user');
          });
      });
    });
    describe('POST', () => {
      it('adds a new medication', () => {
        const time = new Date(1564412400000);
        const med = { type: 'codeine', due: time };
        return request
          .post('/api/meds/app/all/1')
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
      it('status:400 when posting an invalid foreign key', () => {
        const time = new Date(1564412400000);
        const med = { user_id: 314, type: 'codeine', due: time };
        return request
          .post('/api/meds/app/all/1')
          .send(med)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
      it('status:400 when missing required columns', () => {
        const med = { type: 'codeine' };
        return request
          .post('/api/meds/app/all/1')
          .send(med)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
      it('status:400 when adding non-existent columns', () => {
        const time = new Date(1564412400000)
        const med = {
          test: 'not-a-column',
          user_id: 314,
          type: 'codeine',
          due: time
        };
        return request
          .post('/api/meds/app/all/1')
          .send(med)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
    });
  });
  describe('/meds/app/all/:med_id', () => {
    describe('PATCH', () => {
      it('updates taken to true', () => {
        return request
          .patch('/api/meds/app/all/1')
          .send({ taken: true })
          .expect(200)
          .then(({ body: { patchedMed } }) => {
            expect(patchedMed.taken).to.eql(true);
          });
      });
      it('updates status', () => {
        return request
          .patch('/api/meds/app/all/1')
          .send({ status: 5 })
          .expect(200)
          .then(({ body: { patchedMed } }) => {
            expect(patchedMed.status).to.eql(5);
          });
      });
      it('updates type', () => {
        return request
          .patch('/api/meds/app/all/1')
          .send({ type: 'correct my med spelling' })
          .expect(200)
          .then(({ body: { patchedMed } }) => {
            expect(patchedMed.type).to.eql('correct my med spelling');
          });
      });
      it('status:400 when patching a value of incorrect type', () => {
        return request
          .patch('/api/meds/app/all/1')
          .send({ taken: 314 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
      it('status:400 when patching invalid column', () => {
        return request
          .patch('/api/meds/app/all/1')
          .send({ cabbages: 314 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
      it('status:400 when given no values to patch', () => {
        return request
          .patch('/api/meds/app/all/1')
          .send({})
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
    });
    describe('DELETE', () => {
      it('Deletes a medication', () => {
        return request.delete('/api/meds/app/all/1').expect(204);
      });
    });
  });
  describe('meds/alexa', () => {
    describe('GET', () => {
      it('returns all medications for a user due in the next 24h', () => {
        const time = new Date(Date.now() + 600000);
        const med = { type: 'testmedtype', due: time }
        return request
          .post('/api/meds/app/all/1')
          .send(med)
          .then( x => {

            const header = { amazonid: 'a1234'}; //for user_id 1
            return request
              .get('/api/meds/alexa')
              .set(header)
              .send()
              .expect(200)
              .then(({ body : { meds }}) => {
                expect(meds.length).to.equal(1);
                expect(meds[0]).to.contain.keys(
                  'id', 'user_id', 'type', 'due', 'taken', 'taken_at', 'status'
                );
                expect(meds[0].user_id).to.equal(1);
                expect(meds[0].type).to.equal('testmedtype')
              });
          });
      });
      it('does not return medications due in the past', () => {
        const time = new Date(Date.now() - 600000);
        const med = { type: 'testmedtype', due: time }
        return request
          .post('/api/meds/app/1')
          .send(med)
          .then( x => {

            const header = { amazonid: 'a1234'}; //for user_id 1
            return request
              .get('/api/meds/alexa')
              .set(header)
              .send()
              .expect(200)
              .then(({ body : { meds }}) => {
                expect(meds.length).to.equal(0);
              });
          })
      });
      it('does not return medications due more than 24h later', () => {
        const time = new Date(Date.now() + 172800000);
        const med = { type: 'testmedtype', due: time }
        return request
          .post('/api/meds/app/1')
          .send(med)
          .then( x => {

            const header = { amazonid: 'a1234'}; //for user_id 1
            return request
              .get('/api/meds/alexa')
              .set(header)
              .send()
              .expect(200)
              .then(({ body : { meds }}) => {
                expect(meds.length).to.equal(0);
              });
          })
      });
    });
  })
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
      it('status:404 for an invalid user id', () => {
        return request
          .get('/api/events/4')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('No events found');
          });
      });
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
      it('status:400 when missing required columns', () => {
        return request
          .post('/api/events/1')
          .send({})
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
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
      it('status:400 when patching a value of incorrect type', () => {
        return request
          .patch('/api/events/1')
          .send({ description: 314 })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
    });
    describe('DELETE', () => {
      it('deletes an event', () => {
        return request.delete('/api/events/1').expect(204);
      });
    });
  });
  describe('/quiz/app/:user_id', () => {
    describe('GET', () => {
      it('gets all questionnaire responses', () => {
        return request
          .get('/api/quiz/app/1')
          .expect(200)
          .then(({ body: { quizzes } }) => {
            expect(quizzes[0]).to.contain.keys(
              'id',
              'user_id',
              'completed_at',
              'mood',
              'stiffness',
              'slowness',
              'tremor'
            );
          });
      });
      it('status:404 for an invalid user id', () => {
        return request
          .get('/api/quiz/app/4')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('No quiz found');
          });
      });
    });
    describe('POST', () => {
      it('posts a new questionnaire response', () => {
        const due = new Date(1564412400000);
        return request
          .post('/api/quiz/app/1')
          .send({
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
              'completed_at',
              'mood',
              'stiffness',
              'slowness',
              'tremor'
            );
          });
      });
    });
  });
  describe('/quiz/app/:quiz_id', () => {
    describe('PATCH', () => {
      it('updates questionnaire result', () => {
        return request
          .patch('/api/quiz/app/1')
          .send({
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
      it('status:400 when patching a value of incorrect type', () => {
        return request
          .patch('/api/quiz/app/1')
          .send({
            mood: 'not a number!',
            stiffness: 0,
            slowness: 0,
            tremor: 5
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
    });
    describe('DELETE', () => {
      it('deletes a questionnaire result', () => {
        return request.delete('/api/quiz/app/1').expect(204);
      });
    });
  });
  describe('/quiz/alexa/', () => {
    describe('POST', () => {
      it('posts a new questionnaire response', () => {
        const headers = { amazonid: 'a1234' } 
        const body = { mood: 1, stiffness: 1, tremor: 1, slowness: 1 }
        return request
          .post('/api/quiz/alexa')
          .set(headers)
          .send(body)
          .expect(201)
          .then(({ body: { confirmation } }) => {
            expect(confirmation).to.be.true
          });
      });
    });
  });
});
};  //end main conditional testing block