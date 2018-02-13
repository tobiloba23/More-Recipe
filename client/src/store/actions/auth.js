import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userName, imageUrl) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userName,
    imageUrl
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userName');
  localStorage.removeItem('imageUrl');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime)
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email, password, passwordConfirmation, userName, firstName, lastName, phoneNumber, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      passwordConfirmation,
      userName, 
      firstName, 
      lastName, 
      phoneNumber
    };
    let url = 'users/signup';
    if (!isSignup) {
      url = 'users/signin'
    };
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('imageUrl', response.data.imageUrl);
        dispatch(authSuccess(response.data.token, response.data.userName, response.data.imageUrl));
        dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error.response ? error.response.data.error : error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userName = localStorage.getItem('userName');
        const imageUrl = localStorage.getItem('imageUrl');
        dispatch(authSuccess(token, userName, imageUrl));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};

export const toggleRegisterSignin = () => {
  return {
    type: actionTypes.AUTH_TOGGLE_REGISTER_SIGNIN,
  };
};
