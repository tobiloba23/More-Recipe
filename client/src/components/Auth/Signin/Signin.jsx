import React from 'react';
import { Row, Col } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextInputElements from '../../UI/FormElements/TextInputElements';
import Aux from '../../../hoc/Aux/Aux';
import Spinner from '../../../components/UI/Spinner/Spinner';

const signin = (props) => {
  let form = <Spinner />;
  if (!props.loading) {
    form = (<TextInputElements
      formElementsArray={props.formElementsArray}
      showPassword={props.showPassword}
      inputChanged={props.inputChanged}
      formErrors={props.error && typeof props.error.message === 'object' ? props.error.message : null}
    />);
  }

  let errorMessage = null;
  if (props.error && typeof props.error.message === 'string') {
    errorMessage = (
      <p style={{ color: 'red' }}>{props.error.message}</p>
    );
  }

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
      {errorMessage}
      <form onSubmit={props.submit}>
        {form}
        <Row className="d-flex align-items-center mb-4">
          <Col md="12" className="text-center mb-3">
            {errorMessage}
            <button type="submit" className="btn btn-outline-white buttonsColor">
              Sign in
              <i className="fa fa-sign-in ml-2" />
            </button>
          </Col>
        </Row>
      </form>
      <Row style={{ width: '80vw', maxWidth: '620px' }}>
        <Col md="6">
          <p className="font-small white-text d-flex justify-content-start">Forgot your password?
            <NavLink to="/" className="green-text ml-1 font-bold"> Reset password</NavLink>
          </p>
        </Col>
        <Col md="6">
          <p className="font-small white-text d-flex justify-content-end">
            {'Don\'t have an account?'}
            <NavLink
              to="/register"
              onClick={props.clearError}
              className="green-text ml-1 font-bold"
            > Register
            </NavLink>
          </p>
        </Col>
      </Row>
    </Aux>
  );
};

signin.propTypes = {
  loading: PropTypes.bool.isRequired,
  formElementsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line
  error: PropTypes.object,
  showPassword: PropTypes.func.isRequired,
  inputChanged: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

signin.defaultProps = {
  error: null,
};

export default signin;
