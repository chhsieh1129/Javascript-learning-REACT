import * as actionTypes from "./actionTypes";
// import axios from "../../axios-orders";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT, //state
    ingredientName: ingName, //action
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients,
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED
  };
};

export const initIngredient = () => {
  return {
    type: actionTypes.INIT_INGREDIENT
  };
  // return (dispatch) => {
  //   axios
  //     .get("https://react-burger-f7ab2.firebaseio.com/ingredients.json")
  //     .then( response => {
  //       dispatch(setIngredient(response.data)) //async 內執行dispatch
  //     })
  //     .catch( error => {
  //       dispatch(fetchIngredientFailed())
  //     });
  // };
};
