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
  const exstnRecipeId = 'e4bb33e4-8db3-4e22-aaf6-4200dced502c';
  const register_details = {
    firstName: 'Rexford',
    lastName: 'Rexford',
    fullName: 'Rexford',
    email: 'email@email.com',
    userName: 'username',
    password: '123@abc',
  };
  const login_details = {
    email_or_username: 'email@email.com',
    password: '123@abc',
    confirmPassword: '123@abc'
  };
  const registerNoFirstName = {
    lastName: 'Rexford',
    email: 'email@email.com',
    userName: 'username',
    password: '123@abc'
  };
  const registerNoLastName = {
    firstName: 'Rexford',
    email: 'email@email.com',
    userName: 'username',
    password: '123@abc'
  };
  const registerNoEmail = {
    firstName: 'Rexford',
    lastName: 'Rexford',
    userName: 'username',
    password: '123@abc'
  };
  const registerNoPassword = {
    firstName: 'Rexford',
    lastName: 'Rexford',
    fullName: 'Rexford',
    email: 'email@email.com',
    userName: 'username',
  };
  const registerNotEmail = {
    firstName: 'Rexford',
    lastName: 'Rexford',
    fullName: 'Rexford',
    userName: 'username',
    password: '123@abc',
  };
  const registerNotPassword = {
    firstName: 'Rexford',
    lastName: 'Rexford',
    fullName: 'Rexford',
    email: 'email@email',
    userName: 'username',
    password: '123@abc    $',
  };

  // #1 sholud return 404
  it('should return 404', () => {
    server
      .get('/random')
      .expect('Content-type', /html/)
      .expect(404);
  });

  // #2 should return home page
  it('should return recipes', (done) => {
    // calling home page api
    server
      .get('/recipes')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
      // HTTP status should be 200
        res.body.statusCode.should.equal(200);
        // Error key exists it should be false.
        if (res.body.error) res.body.error.should.equal(false);
        done();
      });
  });

  // #3 should not grant access
  it('should not grant access', (done) => {
    // unauthorized user trying to access restricted content
    server
      .get('/recipes/'.concat(exstnRecipeId))
      .expect('Content-type', /json/)
      .expect(401)
      .end((err, res) => {
        // HTTP status should be 401
        res.body.statusCode.should.equal(401);
        // Error key should be false.
        if (res.body.error) res.body.error.should.equal(true);
        done();
      });
  });

  // #4 should create account or return account already exists
  // #4 register should fail on no first name supplied
  it('register should fail on no first name supplied', (done) => {
    server
      .post('/users/signup?'.concat(registerNoFirstName))
      .expect('Content-type', /json/)
      .expect(401)
      .end((err, res) => {
        token = res.decoded;
        done();
      });
  });

  // #5 register should fail on no last name supplied
  it('register should fail on no last name supplied', (done) => {
    server
      .post('/users/signup?'.concat(registerNoLastName))
      .end((err, res) => {
        token = res.decoded;
        done();
      });
  });

  // #4 should not grant access
  it('should not grant access', (done) => {
    // calling home page api
    server
      .get('/recipes?token='.concat(token))
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        // HTTP status should be 200
        res.body.statusCode.should.equal(200);
        // Error key should be false.
        if (res.body.error) res.body.error.should.equal(false);
        done();
      });
  });


  // #2 should return home page
  it('should return recipes', (done) => {
    // calling home page api
    server
      .get('/recipes?token='.concat(token))
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
      // HTTP status should be 200
        res.body.statusCode.should.equal(200);
        // Error key should be false.
        if (res.body.error) res.body.error.should.equal(false);
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
        res.body.statusCode.should.equal(200);
        // Error key should be false.
        if (res.body.error) res.body.error.should.equal(false);
        done();
      });
  });

  // #2 sholud return 404
  it('should return 404', (done) => {
    server
      .get('/random')
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.c('Cannot GET /api/v2/random');
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
        // HTTP status should be 200
        res.body.statusCode.should.equal(200);
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
