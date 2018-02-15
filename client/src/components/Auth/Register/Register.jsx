import React from 'react';
import { Row, Col } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextInputElements from '../../UI/FormElements/TextInputElements';
import Aux from '../../../hoc/Aux/Aux';
import Spinner from '../../../components/UI/Spinner/Spinner';

const register = (props) => {
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
            <strong> UP</strong>
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
              Register
              <i className="fa fa-sign-in ml-2" />
            </button>
          </Col>
        </Row>
      </form>
      <Row style={{ width: '80vw', maxWidth: '620px' }}>
        <Col md="12">
          <p className="font-small white-text d-flex justify-content-end">Have an account?
            <NavLink
              to="/signin"
              onClick={props.clearError}
              className="green-text ml-1 font-bold"
            >Log in
            </NavLink>
          </p>
        </Col>
      </Row>
    </Aux>
  );
};

register.propTypes = {
  loading: PropTypes.bool.isRequired,
  formElementsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line
  error: PropTypes.object,
  showPassword: PropTypes.func.isRequired,
  inputChanged: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

register.defaultProps = {
  error: null,
};

export default register;
