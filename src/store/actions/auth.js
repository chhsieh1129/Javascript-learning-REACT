// import axios from 'axios';

import * as actionTypes from './actionTypes'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => { //產生side effect
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch(authLogout())
  //   }, expirationTime * 1000)
  // }
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup
  };
  // return dispatch => {
  //   dispatch(authStart())
  //   const authData = {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   }
  //   let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEMYVSoxol9a60wRzI6IsGkSt59j2ZavU';
  //   if (!isSignup) {
  //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEMYVSoxol9a60wRzI6IsGkSt59j2ZavU'
  //   }
  //   axios.post(url, authData)
  //     .then(response => {
  //       const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
  //       localStorage.setItem('token', response.data.idToken);
  //       localStorage.setItem('expirationDate', expirationDate);
  //       localStorage.setItem('userId', response.data.localId);
  //       dispatch(authSuccess(response.data.idToken, response.data.localId))//將所需的data傳入action，再由reducer端接收action.payload改變state
  //       dispatch(checkAuthTimeout(response.data.expiresIn)) // expiresIn為憑證有效時間(秒)
  //     })
  //     .catch(err => {
  //       dispatch(authFail(err.response.data.error))
  //     })
  // }
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
  // return dispatch => {
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     dispatch(authLogout());
  //   } else {
  //     const expirationDate = new Date(localStorage.getItem('expirationDate'))
  //     if (expirationDate <= new Date()) {
  //       dispatch(authLogout());
  //     } else {
  //       const userId = localStorage.getItem('userId');
  //       dispatch(authSuccess(token, userId));
  //       dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)) //getTime 毫秒
  //     }
  //   }
  // }
};