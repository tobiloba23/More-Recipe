import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Mask from '../../components/UI/Mask/Mask';
import Signin from '../../components/Auth/Signin/Signin';
import Register from '../../components/Auth/Register/Register';
import classes from './Auth.css';
import claases2 from '../../components/UI/Mask/Mask.css';

import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {
  constructor(props) {
    super(props);
    props.setPage('Auth');
    props.onInit();
    this.submitHandler = this.submitHandler.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.clearErrorHandler = this.clearErrorHandler.bind(this);
    this.state = {
      controls: {
        email: {
          elementType: 'input',
          symbol: 'fa fa-envelope',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
            valid: false,
          },
          touched: false,
        },
        password: {
          elementType: 'input',
          symbol: 'fa fa-lock',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          value: '',
          validation: {
            required: true,
            isPassword: true,
            valid: false,
          },
          touched: false,
        },
        passwordConfirmation: {
          elementType: 'input',
          symbol: 'fa fa-key',
          elementConfig: {
            type: 'password',
            placeholder: 'Confirm Password',
          },
          value: '',
          validation: {
            required: true,
            isPassword: true,
            valid: false,
          },
          touched: false,
        },
        userName: {
          elementType: 'input',
          symbol: 'fa fa-user',
          elementConfig: {
            type: 'text',
            placeholder: 'User Name',
          },
          value: '',
          validation: {
            required: true,
            minLength: 4,
            valid: false,
          },
          touched: false,
        },
        firstName: {
          elementType: 'input',
          symbol: 'fa fa-user-circle',
          elementConfig: {
            type: 'text',
            placeholder: 'First Name',
          },
          value: '',
          validation: {
            required: true,
            minLength: 1,
            valid: false,
          },
          touched: false,
        },
        lastName: {
          elementType: 'input',
          symbol: 'fa fa-user-circle',
          elementConfig: {
            type: 'text',
            placeholder: 'Last Name',
          },
          value: '',
          validation: {
            required: true,
            minLength: 1,
            valid: false,
          },
          touched: false,
        },
        phoneNumber: {
          elementType: 'input',
          symbol: 'fa fa-phone',
          elementConfig: {
            type: 'text',
            placeholder: 'Phone Number',
          },
          value: '',
          validation: {
            minLength: 7,
            isNumeric: true,
            valid: false,
          },
          touched: false,
        },
      },
    };

    this.showPasswordHandler = (id) => {
      const el = document.getElementById(id);
      if (el) {
        if (el.type === 'password') {
          el.type = 'text';
        } else {
          el.type = 'password';
        }
      }
    };
  }

  componentDidMount() {
    if (this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler(event, controlName) {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        validation: {
          ...this.state.controls[controlName].validation,
          valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        },
        touched: true,
      },
    };

    this.setState({
      controls: updatedControls,
    });
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.controls.passwordConfirmation.value,
      this.state.controls.userName.value,
      this.state.controls.firstName.value,
      this.state.controls.lastName.value,
      this.state.controls.phoneNumber.value,
      this.props.isSignup,
    );
  }

  clearErrorHandler() {
    this.props.onRegisterSigninToggle();
  }

  render() {
    const { loading, error, isAuthenticated } = this.props;
    const formElementsArray = [];
    Object.keys(this.state.controls).forEach((key) => {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    });

    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    let element = (<div />);
    if (!this.props.isSignup) {
      const formElementsArrayCut = [];
      formElementsArrayCut.push(formElementsArray[3]);
      formElementsArrayCut.push(formElementsArray[1]);
      element = (<Signin
        formElementsArray={formElementsArrayCut}
        showPassword={this.showPasswordHandler}
        inputChanged={this.inputChangedHandler}
        submit={this.submitHandler}
        loading={loading}
        error={error}
        clearError={this.clearErrorHandler}
      />);
    } else {
      element = (<Register
        formElementsArray={formElementsArray}
        showPassword={this.showPasswordHandler}
        inputChanged={this.inputChangedHandler}
        submit={this.submitHandler}
        loading={loading}
        error={error}
        clearError={this.clearErrorHandler}
      />);
    }

    return (
      <Mask className={classes.formDark} backImage={claases2.authPage}>
        <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
          {authRedirect}
          {element}
        </div>
      </Mask>
    );
  }
}

Auth.propTypes = {
  isSignup: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  // eslint-disable-next-line
  error: PropTypes.object,
  setPage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onRegisterSigninToggle: PropTypes.func.isRequired,
  onInit: PropTypes.func.isRequired,
  onAuth: PropTypes.func.isRequired,
  authRedirectPath: PropTypes.string.isRequired,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
};

Auth.defaultProps = {
  isSignup: null,
  error: null,
};

const mapReduxStateToCompProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isSignup: state.auth.isSignup,
  isAuthenticated: state.auth.token !== null,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onInit: () => dispatch(actions.authInit()),
  onAuth: (
    email,
    password,
    passwordConfirmation,
    userName,
    firstName,
    lastName,
    phoneNumber,
    isSignup,
  ) => dispatch(actions.auth(
    email,
    password,
    passwordConfirmation,
    userName,
    firstName,
    lastName,
    phoneNumber,
    isSignup,
  )),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  onRegisterSigninToggle: () => dispatch(actions.toggleRegisterSignin()),
});

export default connect(mapReduxStateToCompProps, mapDispatchToProps)((Auth));
