import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions/index';

export function* initIngredientSaga(action) {
  const response = yield axios.get("https://react-burger-f7ab2.firebaseio.com/ingredients.json")
  try {
    yield put(actions.setIngredient(response.data))
  } catch (error) {
    yield put(actions.fetchIngredientFailed())
  }
}
