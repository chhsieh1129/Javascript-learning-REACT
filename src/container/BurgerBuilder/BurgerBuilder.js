import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
// import * as actionType from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    // loading: false,
    // error: false
  };

  componentDidMount () {
    // axios.get('https://react-burger-f7ab2.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data})
    //   })
    //   .catch(error => {
    //     this.setState({error: true})
    //   })
      this.props.onInitIngredient();
  }

  updatedPurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return ( sum > 0 );
  };

  // addIngredinetHandler = (type) => { 沒用redux寫法
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     //new object
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceAddition = INGREDIENTS_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updatedPurchaseState(updatedIngredients); // 要連結最新state，否則setState完無法更新
  // };

  // removeIngredinetHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     //new object
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceDeduction = INGREDIENTS_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;

  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updatedPurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout")
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => { //傳遞state至別的容器，未使用redux方法
    // this.setState({loading: true})
    
    // const queryParams = [];
    // for (let i in this.state.ingredients) { 
    //   queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i])); //encodeURIComponent():對URL中有特殊意義的字作編碼動作。
    // }
    // queryParams.push('price=' + this.state.totalPrice)
    // const queryString = queryParams.join('&')
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; //<=0 則將true存入 disabledInfo[key]內
    }

    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (this.props.ings) { // 非同步代碼驗證
      burger = 
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addedIngredients={this.props.onIngredientAdded}
            removedIngredients={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatedPurchaseState(this.props.ings)} //另一方法為redux管理state
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            price={this.props.price}
          />
        </Aux>
      orderSummary = 
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
    }

    // if(this.state.loading) {
    //   orderSummary = <Spinner />
    // }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName}),
    // onIngredientRemoved: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName})
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)), // 轉換成actionCreator
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
