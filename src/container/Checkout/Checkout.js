import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   price: 0
  // }

  //使用redux 不需再用此方法接收從BurgerBuilder的state
  // componentWillMount () { //因state中ingredients改成null，如使用componentDidMount，底下render={() => (<ContactData ingredients={this.state.ingredients} ...將會出錯
  //   const query = new URLSearchParams(this.props.location.search); //Web API，抓URL問號(search)後面的東東，搭配.entries(), for...of解析data
  //   const ingredients = {};
  //   let totalPrice = 0;
  //   for (let param of query.entries()) {
  //     //['salad', '1'] 名子 數量
  //     if (param[0] === 'price') {
  //       totalPrice = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ingredients: ingredients, price: totalPrice}); 
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect} 
          <CheckoutSummary 
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
          {/* <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={Number.parseFloat(this.state.price).toFixed(2)} {...props}/>)} /> 利用render將ingredients傳遞至<ContactData> {...props}=>將所有route props一同傳遞 */}
          <Route 
            path={this.props.match.path + '/contact-data'} 
            component={ContactData}/>
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);