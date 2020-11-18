import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {
  render() {
    let ingrendient = null;
    switch (this.props.type) {
      case ('bread-bottom'):
        ingrendient = <div className={classes.BreadBottom}></div>
        break;
      
      case ('bread-top'):
        ingrendient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        )
        break;

      case ('meat'):
        ingrendient = <div className={classes.Meat}></div>
        break;

      case ('cheese'):
        ingrendient = <div className={classes.Cheese}></div>
        break;
      
      case ('salad'):
        ingrendient = <div className={classes.Salad}></div>
        break;

      case ('bacon'):
        ingrendient = <div className={classes.Bacon}></div>
        break;

      default: ingrendient = null;
    }
  
    return ingrendient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient;