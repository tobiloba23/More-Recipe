import React from 'react';
import { Row, Col } from 'mdbreact';
import { NavLink } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';

const register = (props) => {
  return (
    <Aux>
      <div className="text-center">
        <h3 className="white-text mb-5 mt-4 font-bold">
          <strong>SIGN</strong>
          <a className="green-text font-bold">
            <strong> UP</strong>
          </a>
        </h3>
      </div>
      <div className="md-form">
        <i className="fa fa-envelope prefix grey-text"></i>
        <input type="text" className="form-control white-text" placeholder="Email" />
      </div>
      <div className="md-form">
        <i className="fa fa-lock prefix grey-text"></i>
        <input id="password" type="password" className="form-control white-text" placeholder="Password" />
      </div>
      <label onClick={() => props.showPassword('password')} >
        Show Password: <input type="checkbox" />
      </label>
      <div className="md-form">
        <i className="fa fa-key prefix grey-text"></i>
        <input type="password" className="form-control white-text" placeholder="Confirm password" />
      </div>
      <div className="md-form">
        <i className="fa fa-user prefix grey-text"></i>
        <input type="text" className="form-control white-text" placeholder="User Name" />
      </div>
      <div className="md-form">
        <i className="fa fa-user-circle prefix grey-text"></i>
        <input type="text" className="form-control white-text" placeholder="First Name" />
      </div>
      <div className="md-form">
        <i className="fa fa-user-circle prefix grey-text"></i>
        <input type="text" className="form-control white-text" placeholder="Last Name" />
      </div>
      <div className="md-form">
        <i className="fa fa-phone prefix grey-text"></i>
        <input type="text" className="form-control white-text" placeholder="Phone Number" />
      </div>
      <Row className="d-flex align-items-center mb-4">
        <Col md="12" className="text-center mb-3">
          <NavLink to="/">
            <button type="button" className="btn btn-success btn-block z-depth-1">Register</button>
          </NavLink>
        </Col>
      </Row>
      <Row style={{width: '80vw', maxWidth: '620px'}}>
        <Col md="12">
          <p className="font-small white-text d-flex justify-content-end">Have an account?
          <NavLink to="/signin" className="green-text ml-1 font-bold"> Log in</NavLink>
          </p>
        </Col>
      </Row>
    </Aux>
  );
};

export default register;
