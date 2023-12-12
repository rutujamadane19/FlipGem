import * as api from '../../service/api'; // Assuming you have your API functions in api.js
export const loginRequest = () => ({ type: 'LOGIN_REQUEST' });
export const signupRequest = () => ({ type: 'SIGNUP_REQUEST' });
export const loginSuccess = (user) => ({ type: 'LOGIN_SUCCESS', payload: { user } });
export const signupSuccess = (user) => ({ type: 'SIGNUP_SUCCESS', payload: { user } });
export const loginFailure = (error) => ({ type: 'LOGIN_FAILURE', payload: { error } });
export const signupFailure = (error) => ({ type: 'SIGNUP_FAILURE', payload: { error } });

// Thunk action for login
export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await api.authenticateLogin(userData);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};
export const signup = (userData) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const response = await api.authenticateSignup(userData);
    console.log(response);
    dispatch(signupSuccess(response.data));
  } catch (error) {
    dispatch(signupFailure(error));
  }
};

// Similar action creators and thunk actions can be defined for signup, product, and payment
// You'll need to create SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, etc.


// Similar action creators and thunk actions can be defined for signup, product, and payment
// You'll need to create SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, etc.
