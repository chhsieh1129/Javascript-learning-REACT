import { takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckState} from './auth';
import { initIngredientSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga} from './order';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga); //當actionTypes === true 執行下一個參數內的Saga function
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckState); 
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENT, initIngredientSaga);
}

export function*watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga)
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}