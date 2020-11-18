import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) { //function generator
  yield localStorage.removeItem('token'); //每行yield行完才會執行下一行
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout()); //與dispatch(authLogout())相同功能
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEMYVSoxol9a60wRzI6IsGkSt59j2ZavU';
  if (!action.isSignup) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEMYVSoxol9a60wRzI6IsGkSt59j2ZavU'
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));//將所需的data傳入action，再由reducer端接收action.payload改變state
    yield put(actions.checkAuthTimeout(response.data.expiresIn)); // expiresIn為憑證有效時間(秒)
  } catch(err) {
    yield put(action.authFail(err.response.data.error));
  }
}

export function* authCheckState(action) {
  const token = yield localStorage.getItem('token')
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date()) {
      yield put(actions.authLogout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)); //getTime 毫秒
    }
  }
}