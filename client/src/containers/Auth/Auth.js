import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Mask from '../../components/UI/Mask/Mask';
import Signin from '../../components/Auth/Signin/Signin';
import Register from '../../components/Auth/Register/Register';
import classes from './Auth.css';
import claases2 from '../../components/UI/Mask/Mask.css';

import { checkValidity } from '../../shared/utility';
import axios from 'axios';

class Auth extends Component {
  constructor(props) {
    super(props);
    props.setPage('Auth');
    this.submitHandler = this.submitHandler.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.showPasswordHandler = this.showPasswordHandler.bind(this);
    this.state = {
      controls: {
        email: {
          elementType: 'input',
          symbol: 'fa fa-envelope',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
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
          symbol: 'fa fa-lock',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            isPassword: true,
            valid: false
          },
          touched: false
        },
        confirmPassword: {
          elementType: 'input',
          symbol: 'fa fa-key',
          elementConfig: {
            type: 'password',
            placeholder: 'Confirm Password'
          },
          value: '',
          validation: {
            required: true,
            isPassword: true,
            valid: false
          },
          touched: false
        },
        userName: {
          elementType: 'input',
          symbol: 'fa fa-user',
          elementConfig: {
            type: 'text',
            placeholder: 'User Name'
          },
          value: '',
          validation: {
            required: true,
            minLength: 4,
            valid: false
          },
          touched: false
        },
        firstName: {
          elementType: 'input',
          symbol: 'fa fa-user-circle',
          elementConfig: {
            type: 'text',
            placeholder: 'First Name'
          },
          value: '',
          validation: {
            required: true,
            minLength: 1,
            valid: false
          },
          touched: false
        },
        lastName: {
          elementType: 'input',
          symbol: 'fa fa-user-circle',
          elementConfig: {
            type: 'text',
            placeholder: 'Last Name'
          },
          value: '',
          validation: {
            required: true,
            minLength: 1,
            valid: false
          },
          touched: false
        },
        phoneNumber: {
          elementType: 'input',
          symbol: 'fa fa-phone',
          elementConfig: {
            type: 'text',
            placeholder: 'Phone Number'
          },
          value: '',
          validation: {
            minLength: 7,
            isNumeric: true,
            valid: false
          },
          touched: false
        }
      },
      isSignup: !props.signin || props.register,
      loading: false
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
    };

    this.setState({
      controls: updatedControls
    });
  };

  authRedirect = null;

  onAuth = (email, password, /*userName, firstName, lastName, phoneNumber,*/ isSignup) => {
    this.setState({
      loading: true
    });
    const authData = {
      email,
      password,
      // userName, 
      // firstName, 
      // lastName, 
      // phoneNumber,
      returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBnmUJfqF9kWfATJpA42F8_WjBGMIwiZbE';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBnmUJfqF9kWfATJpA42F8_WjBGMIwiZbE'
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      loading: false
    });
    this.authRedirect = <Redirect to="/" />
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,      
      // this.state.controls.userName.value,
      // this.state.controls.firstName.value,
      // this.state.controls.lastName.value,
      // this.state.controls.phoneNumber.value,
      this.state.isSignup
    );
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
    // if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
    //   this.props.onSetAuthRedirectPath();
    // }
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    };

    // let errorMessage = null;
    // if (this.props.error) {
    //   errorMessage = (
    //     <p>{this.props.error.message}</p>
    //   )
    // };

    // let authRedirect = null;
    // if (this.props.isAuthenticated) {
    //   authRedirect = <Redirect to={this.props.authRedirectPath} />;
    // };

    let element = (<div></div>);
    if (!this.state.isSignup) {
      let formElementsArrayCut = [];
      formElementsArrayCut.push(formElementsArray[0]);
      formElementsArrayCut.push(formElementsArray[1]);
      element = <Signin
                  formElementsArray={formElementsArrayCut}
                  showPassword={this.showPasswordHandler}
                  inputChanged={this.inputChangedHandler}
                  submit={this.submitHandler}
                  loading={this.state.loading} />
    } else {
      element = <Register
                  formElementsArray={formElementsArray}
                  showPassword={this.showPasswordHandler}
                  inputChanged={this.inputChangedHandler}
                  submit={this.submitHandler}
                  loading={this.state.loading} />
    }

    return (
      <Mask className={classes.formDark} backImage={claases2.authPage}>
        {this.authRedirect}
        <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
          {element}
        </div>
      </Mask>
    );
  };
};

export default Auth;
