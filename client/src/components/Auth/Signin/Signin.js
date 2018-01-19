import React from 'react';
import { Row, Col } from 'mdbreact';
import { NavLink } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';

const signin = (props) => {
  return (
    <Aux>
      <div className="text-center">
        <h3 className="white-text mb-5 mt-4 font-bold">
          <strong>SIGN</strong>
          <a className="green-text font-bold">
            <strong> IN</strong>
          </a>
        </h3>
      </div>
      <div className="md-form">
        <i className="fa fa-user prefix grey-text"></i>
        <input type="text" className="form-control white-text" placeholder="User Name" />
      </div>
      <div className="md-form">
        <i className="fa fa-lock prefix grey-text"></i>
        <input id="password" type="password" className="form-control white-text" placeholder="Password" />
        <i className="fa fa-lock prefix grey-text" style={{ opacity: 0 }}></i>
      </div>
      <label onClick={() => props.showPassword('password')} >
        Show Password: <input type="checkbox"/>
      </label>
      <Row className="d-flex align-items-center mb-4">
        <Col md="12" className="text-center mb-3">
          <NavLink to="/">
            <button type="button" className="btn btn-success btn-block z-depth-1">Sign in</button>
          </NavLink>
        </Col>
      </Row>
      <Row style={{width: '80vw', maxWidth: '620px'}}>
        <Col md="6">
          <p className="font-small white-text d-flex justify-content-start">Forgot your password?
          <NavLink to="/" className="green-text ml-1 font-bold"> Reset password</NavLink>
          </p>
        </Col>
        <Col md="6">
          <p className="font-small white-text d-flex justify-content-end">Don't have an account?
          <NavLink to="/register" className="green-text ml-1 font-bold"> Register</NavLink>
          </p>
        </Col>
      </Row>
    </Aux>
  );
};

export default signin;
