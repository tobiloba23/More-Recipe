import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userName: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userName: action.userName,
        error: null,
        loading: false
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userName: null
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      };
    case actionTypes.AUTH_TOGGLE_REGISTER_SIGNIN:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default reducer;
