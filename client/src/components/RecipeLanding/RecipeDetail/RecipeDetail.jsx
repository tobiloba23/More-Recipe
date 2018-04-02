import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Media,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
  FormInline,
} from 'mdbreact';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import { timeSince } from '../../../shared/utility';

const recipeDetail = (props) => {
  const reviews = props.recipe.recipeReviews.length > 0
    ? props.recipe.recipeReviews.map((item, idx) => {
      const created = timeSince(item.createdAt);
      return (
        <Aux>
          <Media>
            <Media left className="waves-light">
              <img style={{ borderRadius: '20px', maxHeight: '40px', maxWidth: '40px' }} src={item.User.imageUrl} alt="Owner" />
            </Media>
            <Media body>
              <small style={{ fontSize: '1rem', color: 'black' }}>{item.User.userName}</small>
              <div className="d-flex justify-content-end">
                <small className="text-muted mr-auto" style={{ fontSize: '0.8rem' }}>{created}</small>
                <a
                  style={{ fontSize: '0.8rem' }}
                  className={`${
                    (item.vote === true || item.vote === false)
                    ? item.vote
                      ? 'fas fa-thumbs-up'
                      : 'fas fa-thumbs-down'
                    : null
                  } text-muted mr-1 my-auto`}
                  aria-hidden="true"
                />
              </div>
            </Media>
          </Media>
          <Aux>
            <Media body>{item.comment}</Media>
          </Aux>
          <br />
        </Aux>
      );
    })
    : (
      <Aux>
        {'There are no reviews on this recipe yet. Be the first to leave '}
        {'a review in the comment section below.'}
      </Aux>
    );

  return (
    <Aux>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start my-auto">
          <NavLink to="/register1"><i className="fas fa-expand-arrows-alt" /></NavLink>
        </Col>
        <Col style={{ flex: '85%' }}>
          <ModalHeader className="layerText" toggle={props.toggle} >{props.recipe.title}</ModalHeader>
        </Col>
      </Row>
      <ModalBody style={{ maxHeight: '60vh', overflow: 'scroll' }} >
        {/* {carousel} */}
        <Media heading className="layerText">Description</Media>
        {props.recipe.description}
        <Media heading className="layerText">Ingredients</Media>
        {props.recipe.ingredients}
        <ol className="layerText">
          <li>Rice</li>
          <li>Water</li>
          <li>Pepper</li>
          <li>Vegetable oil</li>
          <li>Spices</li>
          <li>Leaves</li>
        </ol>
        <Media heading className="layerText">Instructions</Media>
        {props.recipe.instructions}
        <ol className="layerText">
          <li>Wash Rice</li>
          <li>Boil Water</li>
          <li>Grind Pepper</li>
          <li>Add Vegetable oil</li>
          <li>Add Spices</li>
          <li>Wrap in leaves</li>
        </ol>
        <Media heading className="layerText">Reviews</Media>
        {reviews}
      </ModalBody>
      <ModalFooter className="row">
        <div className="col-12">
          {/* <!--Comment--> */}
          <Media className="mb-1 col-12">
            <Media body>
              <Media heading className="layerText d-flex justify-content-end">
                <span className="mr-auto">Comment</span>
                <div className="d-flex justify-content-end">
                  <a
                    style={{ fontSize: '0.8rem' }}
                    className="fas fa-eye text-muted mr-1 my-auto"
                    aria-hidden="true"
                  >{props.recipe.views ? props.recipe.views.toLocaleString() : 0}
                  </a>
                  { props.isAuthenticated && props.recipe.User.userName
                    !== localStorage.getItem('userName')
                    ? (
                      <Aux>
                        <a
                          style={{ fontSize: '0.8rem' }}
                          className={`fas fa-thumbs-up text-muted mr-1 my-auto
                            ${props.recipe.currentUserHasUpVoted ? 'highlightIcon' : null}`}
                          aria-hidden="true"
                          onClick={() => props.vote(null, props.recipe.recipeId, true)}
                        >
                          {props.recipe.upvotes ? props.recipe.upvotes.toLocaleString() : 0}
                        </a>
                        <a
                          style={{ fontSize: '0.8rem' }}
                          className={`fas fa-thumbs-down text-muted mr-1 my-auto
                            ${props.recipe.currentUserHasDownVoted ? 'highlightIcon' : null}`}
                          aria-hidden="true"
                          onClick={() => props.vote(null, props.recipe.recipeId, false)}
                        >
                          {props.recipe.downvotes ? props.recipe.downvotes.toLocaleString() : 0}
                        </a>
                      </Aux>
                    )
                    : null
                    }
                </div>
              </Media>
              { !props.isAuthenticated
                    ?
                      <Aux>
                        Kindly <Link to="/register">register/sign-in</Link> to leave a comment
                      </Aux>
                    :
                      <FormInline>
                        <div className="md-form mb-0 resizableElement">
                          <textarea
                            type="text"
                            className="md-textarea"
                            placeholder="Leave a review..."
                            value={props.comment}
                            onChange={event => props.commentChanged(event)}
                          />
                        </div>
                      </FormInline>
              }
            </Media>
          </Media>
        </div>
        <NavLink onClick={() => props.vote(null, props.recipe.recipeId, null)} className="btn btn-success">Comment</NavLink>{' '}
        <Button color="danger" onClick={props.toggle}>Close</Button>
      </ModalFooter>
    </Aux>
  );
};

recipeDetail.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  toggle: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  comment: PropTypes.string,
  commentChanged: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

recipeDetail.defaultProps = {
  recipe: null,
  comment: undefined,
};

export default recipeDetail;
