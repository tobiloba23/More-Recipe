import chai from 'chai';
import supertest from 'supertest';
import Faker from 'faker';
import app from '../../server/app';

const should = chai.should();

// This agent refers to PORT where program is runninng.

const server = supertest(app);
let token1 = '';

// UNIT test begin

describe('Users Routes unit test', () => {
  before(() => {
    // Reset user mode before tests
    token1 = '';
  });

  const exstnRecipeId = 'e4bb33e4-8db3-4e22-aaf6-4200dced502c';
  const registerDetails = {
    firstName: Faker.name.firstName(),
    lastName: Faker.name.lastName(),
    email: Faker.internet.email(),
    userName: Faker.name.findName(),
    password: '123_abc',
    passwordConfirmation: '123_abc'
  };
  const loginDetails = {
    email_or_username: 'email@email.com',
    password: '123_abc',
    passwordConfirmation: '123_abc'
  };
  const registerNotEmail = {
    firstName: 'Rexford',
    lastName: 'Rexford',
    userName: 'username',
    password: '123_abc',
    passwordConfirmation: '123_abc'
  };
  const registerNotPassword = {
    firstName: 'Rexford',
    lastName: 'Rexford',
    email: 'email@email',
    userName: 'username',
    password: '123_abc    $',
    passwordConfirmation: '123_abc'
  };


  // #1 sholud return 404
  it('/random should return 404', () => {
    server
      .get('/api/v2/random')
      .expect('Content-type', /html/)
      .expect(404);
  });

  // #2 should return home page
  it('/recipes should return recipes', (done) => {
    // calling home page api
    server
      .get('/api/v2/recipes')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
      // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should not exist.
        should.not.exist(res.body.error);
        done();
      });
  });

  // #3 should not grant access
  it('should not grant access', (done) => {
    // unauthorized user trying to access restricted content
    server
      .get('/api/v2/recipes/'.concat(exstnRecipeId))
      .expect('Content-type', /json/)
      .expect(401)
      .end((err, res) => {
        // HTTP status should be 401
        res.status.should.equal(401);
        // Error key should be true.
        res.body.error.message.should.equal('No token provided.');
        done();
      });
  });

  // #4 register should fail on no first name supplied
  it('register should fail on no first name supplied', (done) => {
    server
      .post('/api/v2/users/signup')
      .send()
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        // HTTP status should be 400
        res.status.should.equal(400);
        // validation errors come in arrays
        res.body.error.message.firstName.should.be.a('array');
        res.body.error.message.lastName.should.be.a('array');
        res.body.error.message.userName.should.be.a('array');
        res.body.error.message.email.should.be.a('array');
        res.body.error.message.password.should.be.a('array');
        res.body.error.message.passwordConfirmation.should.be.a('array');
        // No token should be supplied
        should.not.exist(res.decoded);
        done();
      });
  });

  // #8 register should fail on invalid email supplied
  it('register should fail on invalid email supplied', (done) => {
    server
      .post('/api/v2/users/signup')
      .send(registerNotEmail)
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        // HTTP status should be 400
        res.status.should.equal(400);
        // validation errors come in arrays
        res.body.error.message.email.should.be.a('array');
        // No token should be supplied
        should.not.exist(res.decoded);
        done();
      });
  });

  // #9 register should fail on invalid password supplied
  // The password field may only contain alpha-numeric characters,
  // as well as dashes and underscores.
  it('register should fail on invalid password supplied', (done) => {
    server
      .post('/api/v2/users/signup')
      .send(registerNotPassword)
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        // HTTP status should be 400
        res.status.should.equal(400);
        // validation errors come in arrays
        res.body.error.message.password.should.be.a('array');
        // No token should be supplied
        should.not.exist(res.decoded);
        done();
      });
  });

  // #11 should create account or return account already exists
  /*
  There should be a check for already created ccounts in the test
  */
  // #11 should allow a new user register and be automatically logged in
  it('should allow a user sign up and sign in', (done) => {
    // calling home page api
    server
      .post('/api/v2/users/signup')
      .send(registerDetails)
      .expect('Content-type', /json/)
      .end((err, res) => {
        if (res.status === 409 && res.body.message.includes('has already been')) {
          // Error key should be true.
          res.body.error.should.equal(true);
          done();
        }
        // HTTP status should be 201
        res.status.should.equal(201);
        // Error key should not exist.
        should.not.exist(res.body.error);
        // No token should be supplied
        should.exist(res.body.token);
        token1 = res.body.token;
        done();
      });
  });
});
