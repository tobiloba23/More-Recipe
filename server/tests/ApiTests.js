import chai from 'chai';
import supertest from 'supertest';
import should from 'should';

// const { expect } = chai;

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:8080/api/v2');

// UNIT test begin

describe('SAMPLE unit test', () => {
  let token = '';

  before((done) => {
    server
      .post('/users/login?userName=timbond&password=andela')
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  // #1 should return home page
  it('should return recipes', (done) => {
    // calling home page api
    server
      .get('/recipes?token='.concat(token))
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
      // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        if (res.body.error) res.body.error.should.equal(false);
        done();
      });
  });

  it('should add two number', (done) => {
    // calling ADD api
    server
      .post('/add')
      .send({ num1: 10, num2: 20 })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.error.should.equal(false);
        res.body.data.should.equal(30);
        done();
      });
  });

  it('should return 404', (done) => {
    server
      .get('/random')
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        done();
      });
  });

  it('should add two number', (done) => {
    // calling ADD api
    server
      .post('/add')
      .send({ num1: 10, num2: 20 })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.error.should.equal(false);
        res.body.data.should.equal(40);
        done();
      });
  });
});
