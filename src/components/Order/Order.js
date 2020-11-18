import React from 'react';

import classes from './Order.css'

const Order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push(
      {
        name: ingredientName, 
        amount: props.ingredients[ingredientName] //value
      }
    )
  }

  console.log(ingredients)

  const ingredientsOutput = ingredients.map(ig => {
    return <span
      key={ig.name}
      style={{
        textTransform: 'capitalize',
        margin: '0 8px',
        display: 'inline-block',
        border: '1px solid #ccc',
        padding: '5px'
      }}>{ig.name} ({ig.amount})</span>
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  ) 
};

export default Order;