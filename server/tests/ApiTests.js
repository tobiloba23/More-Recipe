import chai from 'chai';
import supertest from 'supertest';
import Faker from 'Faker';

const should = chai.should();

// const { expect } = chai;

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:8080/api/v2');
let token1 = '';

// UNIT test begin

describe('SAMPLE unit test', () => {
  before(() => {
    // Reset user mode before tests
    token1 = '';
  });

  const exstnRecipeId = 'e4bb33e4-8db3-4e22-aaf6-4200dced502c';
  const registerDetails = {
    firstName: Faker.Name.firstName(),
    lastName: Faker.Name.lastName(),
    email: Faker.Internet.email(),
    userName: Faker.Name.findName(),
    password: '123_abc',
    passwordConfirmation: '123_abc'
  };
  const loginDetails = {
    email_or_username: 'email@email.com',
    password: '123_abc',
    passwordConfirmation: '123_abc'
  };
  const registerNoFirstName = {
    lastName: 'Rexford',
    email: 'email@email.com',
    userName: 'username',
    password: '123_abc',
    passwordConfirmation: '123_abc'
  };
  const registerNoLastName = {
    firstName: 'Rexford',
    email: 'email@email.com',
    userName: 'username',
    password: '123_abc',
    passwordConfirmation: '123_abc'
  };
  const registerNoEmail = {
    firstName: 'Rexford',
    lastName: 'Rexford',
    userName: 'username',
    password: '123_abc',
    passwordConfirmation: '123_abc'
  };
  const registerNoPassword = {
    firstName: 'Rexford',
    lastName: 'Rexford',
    email: 'email@email.com',
    userName: 'username',
    password: '',
    passwordConfirmation: ''
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
  const registerNoPasswordConfirmation = {
    firstName: 'Rexford',
    lastName: 'Rexford',
    email: 'email@email',
    userName: 'username',
    password: '123_abc',
  };

  // #1 sholud return 404
  it('should return 404', () => {
    server
      .get('/random')
      .expect('Content-type', /html/)
      .expect(404);
  });

  // // // #2 should return home page
  // // it('should return recipes', (done) => {
  // //   // calling home page api
  // //   server
  // //     .get('/recipes')
  // //     .expect('Content-type', /json/)
  // //     .expect(200)
  // //     .end((err, res) => {
  // //     // HTTP status should be 200
  // //       res.body.statusCode.should.equal(200);
  // //       // Error key should not exist.
  // //       should.not.exist(res.body.error);
  // //       done();
  // //     });
  // // });

  // // // #3 should not grant access
  // // it('should not grant access', (done) => {
  // //   // unauthorized user trying to access restricted content
  // //   server
  // //     .get('/recipes/'.concat(exstnRecipeId))
  // //     .expect('Content-type', /json/)
  // //     .expect(401)
  // //     .end((err, res) => {
  // //       // HTTP status should be 401
  // //       res.body.statusCode.should.equal(401);
  // //       // Error key should be false.
  // //       res.body.error.should.equal(true);
  // //       done();
  // //     });
  // // });

  // // // #4 register should fail on no first name supplied
  // // it('register should fail on no first name supplied', (done) => {
  // //   server
  // //     .post('/users/signup')
  // //     .send(registerNoFirstName)
  // //     .expect('Content-type', /json/)
  // //     .expect(400)
  // //     .end((err, res) => {
  // //       // HTTP status should be 400
  // //       res.body.statusCode.should.equal(400);
  // //       // Error key should be false.
  // //       res.body.error.should.equal(true);
  // //       // No token should be supplied
  // //       should.not.exist(res.decoded);
  // //       // validation errors come in arrays
  // //       res.body.message.firstName.should.be.a('array');
  // //       done();
  // //     });
  // // });

  // // // #5 register should fail on no last name supplied
  // // it('register should fail on no last name supplied', (done) => {
  // //   server
  // //     .post('/users/signup')
  // //     .send(registerNoLastName)
  // //     .expect('Content-type', /json/)
  // //     .expect(400)
  // //     .end((err, res) => {
  // //       // HTTP status should be 400
  // //       res.body.statusCode.should.equal(400);
  // //       // Error key should be false.
  // //       res.body.error.should.equal(true);
  // //       // No token should be supplied
  // //       should.not.exist(res.decoded);
  // //       // validation errors come in arrays
  // //       res.body.message.lastName.should.be.a('array');
  // //       done();
  // //     });
  // // });

  // // // #6 register should fail on no email supplied
  // // it('register should fail on no email supplied', (done) => {
  // //   server
  // //     .post('/users/signup')
  // //     .send(registerNoEmail)
  // //     .expect('Content-type', /json/)
  // //     .expect(400)
  // //     .end((err, res) => {
  // //       // HTTP status should be 400
  // //       res.body.statusCode.should.equal(400);
  // //       // Error key should be false.
  // //       res.body.error.should.equal(true);
  // //       // No token should be supplied
  // //       should.not.exist(res.decoded);
  // //       // validation errors come in arrays
  // //       res.body.message.email.should.be.a('array');
  // //       done();
  // //     });
  // // });

  // // // #7 register should fail on no password supplied
  // // it('register should fail on no password supplied', (done) => {
  // //   server
  // //     .post('/users/signup')
  // //     .send(registerNoPassword)
  // //     .expect('Content-type', /json/)
  // //     .expect(400)
  // //     .end((err, res) => {
  // //       // HTTP status should be 400
  // //       res.body.statusCode.should.equal(400);
  // //       // Error key should be false.
  // //       res.body.error.should.equal(true);
  // //       // No token should be supplied
  // //       should.not.exist(res.decoded);
  // //       // validation errors come in arrays
  // //       res.body.message.password.should.be.a('array');
  // //       done();
  // //     });
  // // });

  // // // #8 register should fail on invalid email supplied
  // // it('register should fail on no invalid email supplied', (done) => {
  // //   server
  // //     .post('/users/signup')
  // //     .send(registerNotEmail)
  // //     .expect('Content-type', /json/)
  // //     .expect(400)
  // //     .end((err, res) => {
  // //       // HTTP status should be 400
  // //       res.body.statusCode.should.equal(400);
  // //       // Error key should be false.
  // //       res.body.error.should.equal(true);
  // //       // No token should be supplied
  // //       should.not.exist(res.decoded);
  // //       // validation errors come in arrays
  // //       res.body.message.email.should.be.a('array');
  // //       done();
  // //     });
  // // });

  // // // #9 register should fail on invalid password supplied
  // // // The password field may only contain alpha-numeric characters,
  // // // as well as dashes and underscores.
  // // it('register should fail on invalid password supplied', (done) => {
  // //   server
  // //     .post('/users/signup')
  // //     .send(registerNotPassword)
  // //     .expect('Content-type', /json/)
  // //     .expect(400)
  // //     .end((err, res) => {
  // //       // HTTP status should be 400
  // //       res.body.statusCode.should.equal(400);
  // //       // Error key should be false.
  // //       res.body.error.should.equal(true);
  // //       // No token should be supplied
  // //       should.not.exist(res.decoded);
  // //       // validation errors come in arrays
  // //       res.body.message.password.should.be.a('array');
  // //       done();
  // //     });
  // // });

  // // // #10 register should fail on no password confirmation supplied
  // // it('register should fail on no password confirmation supplied', (done) => {
  // //   server
  // //     .post('/users/signup')
  // //     .send(registerNoPasswordConfirmation)
  // //     .expect('Content-type', /json/)
  // //     .expect(400)
  // //     .end((err, res) => {
  // //       // HTTP status should be 400
  // //       res.body.statusCode.should.equal(400);
  // //       // Error key should be false.
  // //       res.body.error.should.equal(true);
  // //       // No token should be supplied
  // //       should.not.exist(res.decoded);
  // //       // validation errors come in arrays
  // //       res.body.message.passwordConfirmation.should.be.a('array');
  // //       done();
  // //     });
  // });

  // // #10 should create account or return account already exists
  // /*
  // There should be a check for already created ccounts in the test


  // */
  // // #10 should allow a new user register and be automatically logged in
  // it('should allow a user sign up and sign in', (done) => {
  //   // calling home page api
  //   server
  //     .post('/users/signup')
  //     .send(registerDetails)
  //     .expect('Content-type', /json/)
  //     .expect(201)
  //     .end((err, res) => {
  //       // HTTP status should be 201
  //       res.body.statusCode.should.equal(201);
  //       // Error key should not exist.
  //       should.not.exist(res.body.error);
  //       // No token should be supplied
  //       should.exist(res.body.token);
  //       token1 = res.body.token;
  //       done();
  //     });
  // });
});
