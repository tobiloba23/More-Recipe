import React from 'react';
import { Col, Container, View } from 'mdbreact';

import SectionTitle from '../SectionTitle/SectionTitle';
import classes from './JoinUs.css';

const joinUs = (props) => {
  return (
    <div className="layerText">
      <SectionTitle id="joinComm" destination="copyright" title="Join the Community" />
      <View id="midView" className={`${classes.midView} text-center infoViewHeight d-flex`}>
        <Container className="d-flex justify-content-center align-self-center">
          <Col md="8" lg="11" xs="12">
            <div className="rgba-stylish-strong layerColor">
              <h3>About us</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima culpa nostrum voluptates praesentium
                quia, quae, dolor aperiam possimus architecto, tempore unde! Quasi fugit voluptate, maiores
                adipisci commodi nemo rem cumque.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem
                qui possimus ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit,
                eligendi. Illum quod esse voluptatibus.
              </p>
              <h5>Follow us on the web</h5>
              <a href="" className="btn btn-sm btn-secondary-outline">twitter</a>
              <a href="" className="btn btn-sm btn-secondary-outline">facebook</a>
              <a href="" className="btn btn-sm btn-secondary-outline">youtube</a>
            </div>
          </Col>
        </Container>
      </View>
    </div>
  );
};

export default joinUs;
