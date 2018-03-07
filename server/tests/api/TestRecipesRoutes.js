import chai from 'chai';
import supertest from 'supertest';
import Faker from 'faker';
import app from '../../../server/app';

const should = chai.should();

// This agent refers to PORT where program is runninng.

const server = supertest(app);
let userToken, user2Token, exstnRecipeId, exstnReviewId;
const firstName = Faker.name.firstName(),
  lastName = Faker.name.lastName(),
  email = Faker.internet.email(),
  userName = Faker.internet.userName(),
  password = '123_abc',
  passwordConfirmation = '123_abc',
  firstName2 = Faker.name.firstName(),
  lastName2 = Faker.name.lastName(),
  email2 = Faker.internet.email(),
  userName2 = Faker.internet.userName(),
  title = Faker.lorem.words(2),
  description = Faker.lorem.paragraph(5),
  instructions = Faker.lorem.paragraph(10),
  comment = Faker.lorem.paragraph(2),
  comment2 = Faker.lorem.paragraph(2);

const registerDetails = {
  firstName,
  lastName,
  email,
  userName,
  password,
  passwordConfirmation
};

const register2Details = {
  firstName: firstName2,
  lastName: lastName2,
  email: email2,
  userName: userName2,
  password,
  passwordConfirmation
};

const recipeDetails = {
  title,
  description,
  instructions
};

const reviewDetails = {
  vote: true,
  comment
};

const updateVote = {
  vote: true
};

const updateReview = {
  vote: false,
  comment: comment2
};

// UNIT test begin

describe('/Recipes unit test', () => {
  before(async () => {
    let res = await server.post('/api/v2/users/signup').send(registerDetails);
    userToken = res.body.token;
    res = await server.post('/api/v2/users/signup').send(register2Details);
    user2Token = res.body.token;
  });

  // #1 should not allow an unregistered user create a recipe
  it('POST /recipes not allow an unregistered user create a recipe', (done) => {
    server
      .post('/api/v2/recipes')
      .send(recipeDetails)
      .expect('Content-type', /json/)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.error.message.should.equal('No token provided.');
        done();
      });
  });

  // #2 should fail on no title and description supplied'
  it('POST /recipes should fail on no title and description supplied', (done) => {
    server
      .post('/api/v2/recipes')
      .send({ })
      .set({ 'x-access-token': userToken })
      .expect('Content-type', /json/)
      .expect(422)
      .end((err, res) => {
        res.status.should.equal(422);
        res.body.error.message.title.should.be.a('array');
        res.body.error.message.description.should.be.a('array');
        done();
      });
  });

  // #3 should successfully create a recipe'
  it('POST /recipes should successfully create a recipe', (done) => {
    server
      .post('/api/v2/recipes')
      .send(recipeDetails)
      .set({ 'x-access-token': userToken })
      .expect('Content-type', /json/)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        exstnRecipeId = res.body.data.recipeId;
        should.not.exist(res.body.error);
        done();
      });
  });

  // #4 should successfully update a recipe'
  it('PUT /recipes/:recipeIdshould successfully update a recipe', (done) => {
    server
      .put(`/api/v2/recipes/${exstnRecipeId}`)
      .send(recipeDetails)
      .set({ 'x-access-token': userToken })
      .expect('Content-type', /json/)
      .expect(202)
      .end((err, res) => {
        res.status.should.equal(202);
        should.not.exist(res.body.error);
        done();
      });
  });

  // #5 should not allow a user vote on his own recipe'
  it('POST /recipes/:recipeId/reviews should not allow a user vote on his own recipe', (done) => {
    server
      .post(`/api/v2/recipes/${exstnRecipeId}/reviews`)
      .send(reviewDetails)
      .set({ 'x-access-token': userToken })
      .expect('Content-type', /json/)
      .expect(403)
      .end((err, res) => {
        res.body.error.message.should.equal('You cannot vote on your own recipe');
        done();
      });
  });

  // #6 should successfully create a review'
  it('POST /recipes/:recipeIdreviews should successfully create a review', (done) => {
    server
      .post(`/api/v2/recipes/${exstnRecipeId}/reviews`)
      .send(reviewDetails)
      .set({ 'x-access-token': user2Token })
      .expect('Content-type', /json/)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        exstnReviewId = res.body.data.recipeReviewId;
        res.body.data.comment.should.equal(comment);
        res.body.data.vote.should.equal(true);
        should.not.exist(res.body.error);
        done();
      });
  });

  // #7 should not grant access
  it('GET /recipes/:recipeIdshould not grant access', (done) => {
    server
      .get(`/api/v2/recipes/${exstnRecipeId}`)
      .expect('Content-type', /json/)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.error.message.should.equal('No token provided.');
        done();
      });
  });

  // #8 should return all information on a recipe
  it('GET /recipes/:recipeId/reviews should return all information on a recipe', (done) => {
    server
      .get(`/api/v2/recipes/${exstnRecipeId}/reviews`)
      .set({ 'x-access-token': user2Token })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.data.recipeReviews.should.be.a('array');
        res.body.data.upvotes.should.equal(1);
        res.body.data.downvotes.should.equal(0);
        should.not.exist(res.body.error);
        done();
      });
  });

  // #9 should successfully update a vote'
  it('POST /recipes/:recipeId/reviews should successfully update a vote', (done) => {
    server
      .post(`/api/v2/recipes/${exstnRecipeId}/reviews`)
      .send(updateVote)
      .set({ 'x-access-token': user2Token })
      .expect('Content-type', /json/)
      .expect(202)
      .end((err, res) => {
        res.status.should.equal(202);
        res.body.data.comment.should.equal(comment);
        should.not.exist(res.body.data.vote);
        should.not.exist(res.body.error);
        done();
      });
  });

  // #10 should successfully update a review'
  it('PUT /recipes/:recipeIdreviews/:reviewId should successfully update a review', (done) => {
    server
      .put(`/api/v2/recipes/${exstnRecipeId}/reviews/${exstnReviewId}`)
      .send(updateReview)
      .set({ 'x-access-token': user2Token })
      .expect('Content-type', /json/)
      .expect(202)
      .end((err, res) => {
        res.status.should.equal(202);
        res.body.data.vote.should.equal(false);
        res.body.data.comment.should.equal(comment2);
        should.not.exist(res.body.error);
        done();
      });
  });

  // #11 should reflect the users change in vote on recipe
  it('GET /recipes/:recipeIdreviews should reflect the users change in vote on recipe', (done) => {
    server
      .get(`/api/v2/recipes/${exstnRecipeId}/reviews`)
      .set({ 'x-access-token': userToken })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.data.recipeReviews.should.be.a('array');
        res.body.data.upvotes.should.equal(0);
        res.body.data.downvotes.should.equal(1);
        should.not.exist(res.body.error);
        done();
      });
  });

  // #12 should return recipes
  it('GET /recipes should return recipes', (done) => {
    server
      .get('/api/v2/recipes')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.data.should.be.a('array');
        should.not.exist(res.body.error);
        done();
      });
  });

  // #13 should return sorted recipes
  it('GET /recipes?sort=createdAt&order=desc should return sorted recipes', (done) => {
    server
      .get('/api/v2/recipes?sort=createdAt&order=desc')
      .expect('Content-type', /json/)
      .expect(200)
      .end(async (err, res) => {
        res.status.should.equal(200);
        res.body.data.should.be.a('array');
        (res.body.data.length <= 9).should.equal(true);
        if (res.body.data.length > 1) {
          (res.body.data[0].createdAt > res.body.data[res.body.data.length - 1].createdAt)
            .should.equal(true);
        }
        should.not.exist(res.body.error);
        await server.delete('/api/v2/users').send(registerDetails).set('x-access-token', userToken);
        await server.delete('/api/v2/users').send(register2Details).set('x-access-token', user2Token);
        done();
      });
  });
});
