import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  View,
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
  const created = timeSince(props.recipe.createdAt);
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
        {/* <!--First review--> */}
        <Media className="mb-1">
          <Media left className="waves-light">
            <img className="rounded-circle" style={{ maxHeight: '40px' }} src="https://mdbootstrap.com/img/Photos/Avatars/avatar-13.jpg" alt="No Photo" />
          </Media>
          <div className="d-flex w-100 justify-content-between">

            <Media heading className="layerText">John Doe</Media>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="layerText">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate
                          temporibus iure soluta. Quasi mollitia maxime nemo quam accusamus
                          possimus, voluptatum expedita assumenda. Earum sit id ullam eum vel
                          delectus!
          </p>
        </Media>
      </ModalBody>
      <ModalFooter className="row">
        <Col md="12">
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
                  { props.isAuthenticated && props.recipe.owner
                    !== localStorage.getItem('userName') ?
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
                        : null
                    }
                </div>
              </Media>
              <div className="md-form">
                <textarea type="text" id="comment" className="md-textarea" placeholder="Leave a review..." />
              </div>
              {/* <textarea className="span6" rows="6" placeholder="Leave a review..." /> */}
            </Media>
          </Media>
        </Col>
        <NavLink to="/register1" className="btn btn-success">Comment</NavLink>{' '}
        <Button color="danger" onClick={props.toggle}>Close</Button>
      </ModalFooter>
    </Aux>
  );
};

recipeDetail.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  toggle: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

recipeDetail.defaultProps = {
  recipe: null,
};

export default recipeDetail;
