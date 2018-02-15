import React from 'react';
import { NavLink, Card, CardBody, CardTitle, CardText, Container, Row, Col, View, Media } from 'mdbreact';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';

const recipeCards = (props) => {
  const slides = props.items.map((item, idx) => (
    <Col key={item.title}>
      <Card className="mx-auto mb-2 relative" style={{ maxWidth: '20rem' }}>
        <View className="overlay hm-white-slight z-depth-4 mx-auto centerElementXInRelative" style={{ borderRadius: '20px', minWidth: '23rem' }} >
          <img src={item.imageUrl} className="img-fluid" alt="" />
          <a href="#">
            <div className="mask" />
          </a>
        </View>
        <CardBody>
          <Media>
            <Media left className="waves-light">
              <img style={{ borderRadius: '20px', maxHeight: '40px', maxWidth: '40px' }} src={item.ownerImage} alt="Owner" />
            </Media>
            <Media body>
              <small style={{ fontSize: '1rem', color: 'black' }}>{item.owner}</small>
              <div className="d-flex justify-content-end">
                <small className="text-muted mr-auto" style={{ fontSize: '0.8rem' }}>{item.createdAt ? Math.round((Date.now() - new Date(item.createdAt.replace(' ', 'T'))) / 86400000).toLocaleString() : 0} days ago</small>
                <a style={{ fontSize: '0.8rem' }} className="fa fa-eye text-muted mr-1 my-auto" aria-hidden="true">{item.views ? item.views.toLocaleString() : 0}</a>
                { props.isAuthenticated && item.owner !== localStorage.getItem('userName') ?
                  <Aux>
                    <a
                      style={{ fontSize: '0.8rem' }}
                      className={`fa fa-thumbs-up text-muted mr-1 my-auto ${item.currentUserHasUpVoted ? 'highlightIcon' : null}`}
                      aria-hidden="true"
                      onClick={() => props.vote(idx, true)}
                    >
                      {item.upvotes ? item.upvotes.toLocaleString() : 0}
                    </a>
                    <a
                      style={{ fontSize: '0.8rem' }}
                      className={`fa fa-thumbs-down text-muted mr-1 my-auto ${item.currentUserHasDownVoted ? 'highlightIcon' : null}`}
                      aria-hidden="true"
                      onClick={() => props.vote(idx, false)}
                    >
                      {item.downvotes ? item.downvotes.toLocaleString() : 0}
                    </a>
                  </Aux>
                      : null
                  }
              </div>
            </Media>
          </Media>
          <CardTitle className="text-center">{item.title}</CardTitle>
          <CardText className="text-center">{item.description}</CardText>
          <NavLink className="btn btn-outline-white buttonsColor" style={{ backgroundColor: '#eab126' }} to="/">Details</NavLink>
        </CardBody>
      </Card>
    </Col>
  ));

  return (
    <div className="layerText">
      <Container>
        <Row>
          {slides}
        </Row>
      </Container>
    </div>
  );
};

recipeCards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  isAuthenticated: PropTypes.bool.isRequired,
};

recipeCards.defaultProps = {
  items: null,
};

export default recipeCards;
