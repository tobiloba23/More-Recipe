import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Mask from '../../components/UI/Mask/Mask';
import Signin from '../../components/Auth/Signin/Signin';
import Register from '../../components/Auth/Register/Register';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import claases2 from '../../components/UI/Mask/Mask.css';

import { checkValidity } from '../../shared/utility';

class Auth extends Component {
  constructor(props) {
    super(props);
    props.setPage('Auth');
    this.switchAuthModeHandler = this.switchAuthModeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.showPasswordHandler = this.showPasswordHandler.bind(this);
    this.state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'email Address'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
            valid: false
          },
          touched: false
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
            valid: false
          },
          touched: false
        }
      },
      isSignup: !props.signin || props.register
    };
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        validation: {
          ...this.state.controls[controlName].validation,
          valid: checkValidity(event.target.value, this.state.controls[controlName].validation)
        },
        touched: true
      }
    }

    this.setState({
      controls: updatedControls
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  showPasswordHandler = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (el.type === 'password') {
        el.type = 'text';
      } else {
        el.type = 'password';
      };
    };
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      // this.props.onSetAuthRedirectPath();
    }
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    };

    let form = formElementsArray.map(formElement => (
      <input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!(formElement.config.validation && formElement.config.validation.valid)}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ));

    if (this.props.loading) {
      form = <Spinner />
    };

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    let element = (<div></div>);
    if (!this.state.isSignup) {
      element = <Signin showPassword={this.showPasswordHandler} />
    } else {
      element = <Register showPassword={this.showPasswordHandler} />
    }

    return (
      <Mask className={classes.formDark} backImage={claases2.authPage}>
        <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
          {element}
        </div>
      </Mask>
    );
  };
};

export default Auth;
