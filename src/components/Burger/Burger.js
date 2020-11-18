import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgeIngredient";

const burger = (props) => {
  let transformedIngredient = Object.keys(props.ingredients)
    .map((igkey) => {
      //igkey = salad, bacon, cheese, meat 。  // props.ingredients[igkey] = 1, 1, 2, 2
      return [...Array(props.ingredients[igkey])].map((_, i) => {
        //...Array(props.ingredients[igkey]) = [Array(1), Array(1), Array(2), Array(2)]
        return <BurgerIngredient key={igkey + i} type={igkey} />;
      });
    })
    .reduce((arr, el) => {
      //reduce( (preValue, curValue) => {}, iniValue) 目的要使用length
      return arr.concat(el); //arr.concat(arr2) 將arr2內的元素拉出來放到arr內
    }, []);


  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
