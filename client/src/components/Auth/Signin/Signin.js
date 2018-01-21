import React from 'react';
import { Row, Col } from 'mdbreact';
import { NavLink } from 'react-router-dom';

import TextInputElements from '../../UI/FormElements/TextInputElements';
import Aux from '../../../hoc/Aux/Aux';
import Spinner from '../../../components/UI/Spinner/Spinner';

const signin = (props) => {
  let form = <Spinner />;
  if (!props.loading) {
    form = <TextInputElements 
              formElementsArray={props.formElementsArray} 
              showPassword={props.showPassword} 
              inputChanged={props.inputChanged}              
            />;
  };

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
      <form>
        {form}
        <Row className="d-flex align-items-center mb-4">
          <Col md="12" className="text-center mb-3">          
          <NavLink to="/" className={`btn btn-outline-white buttonsColor`} onClick={props.submit} >Sign in
            <i className="fa fa-sign-in ml-2"></i>
          </NavLink>
          </Col>
        </Row>
      </form>
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
