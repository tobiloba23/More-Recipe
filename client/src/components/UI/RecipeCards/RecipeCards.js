import React from 'react';
import { NavLink, Card, CardBody, CardTitle, CardText, Container, Row, Col, View, Media } from 'mdbreact';

const recipeCards = (props) => {

  const slides = props.items.map((item, idx) => {
    return (
      <Col key={idx}>
        <Card className="mx-auto mb-2 relative" style={{ maxWidth: '20rem'}}>
          <View className="overlay hm-white-slight z-depth-4 mx-auto centerElementXInRelative" style={{borderRadius: '20px', minWidth: '23rem'}} >
              <img src={item.image} className="img-fluid" alt=""/>
              <a href="#">
                <div className="mask"></div>
              </a>
          </View>
          <CardBody>
            <Media>
              <Media left className="waves-light">
                  <img style={{borderRadius: '20px', maxHeight: '40px', maxWidth: '40px'}} src={item.ownerImage} alt="Owner" />
              </Media>
              <Media body>
                <small style={{fontSize: '1rem', color: 'black'}}>{item.owner}</small>
                <div className="d-flex justify-content-end">
                  <small className="text-muted mr-auto" style={{fontSize: '0.8rem'}}>{item.datePosted ? Math.round((Date.now() - item.datePosted)/86400000).toLocaleString() : 0} days ago</small>
                  <a style={{fontSize: '0.8rem'}} className="fa fa-eye text-muted mr-1 my-auto" aria-hidden="true">{item.views ? item.views.toLocaleString() : 0}</a>
                  <a style={{fontSize: '0.8rem'}} className={`fa fa-thumbs-up text-muted mr-1 my-auto ${item.hasUpVoted ? 'highlightIcon' : null}`} aria-hidden="true" onClick={() => props.upvote(idx)}>{item.upvotes ? item.upvotes.toLocaleString() : 0}</a>
                  <a style={{fontSize: '0.8rem'}} className={`fa fa-thumbs-down text-muted mr-1 my-auto ${item.hasDownVoted ? 'highlightIcon' : null}`} aria-hidden="true" onClick={() => props.downvote(idx)}>{item.downvotes ? item.downvotes.toLocaleString() : 0}</a>
                </div>
              </Media>
            </Media>
            <CardTitle className="text-center">{item.title}</CardTitle>
            <CardText className="text-center">{item.descriptionSumm}</CardText>
            <NavLink className={`btn btn-outline-white buttonsColor`} style={{backgroundColor: '#eab126'}} to="/">Details</NavLink>
          </CardBody>
        </Card>
      </Col>
    );
  });

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

export default recipeCards;
