import * as actionTypes from './actionTypes';
// import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    token: token
  };
  // return dispatch => {
  //   dispatch(purchaseBurgerStart());
  //   axios
  //     .post("/orders.json?auth=" + token, orderData)
  //     .then((response) => {
  //       dispatch(purchaseBurgerSuccess(response.data.name, orderData))
  //     })
  //     .catch((error) => {
  //       dispatch(purchaseBurgerFail(error))
  //     }); 
  // }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId
  };
  // return dispatch => { //或使用getState抓token
  //   dispatch(fetchOrdersStart())
  //   const quertParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'// firebase內建:當userId = userId時顯示 用""包起來
  //   axios.get('/orders.json' + quertParam)
  //     .then(res => { //從firebase 抓訂單下來
  //       const fetchedOrders = [];
  //       for (let key in res.data) {
  //         fetchedOrders.push({
  //           ...res.data[key],
  //           id: key
  //         })
  //       }
  //       dispatch(fetchOrdersSuccess(fetchedOrders));
  //     })
  //     .catch(err => {
  //       dispatch(fetchOrdersFail(err))
  //     })
  // }
};