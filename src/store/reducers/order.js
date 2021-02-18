import * as actionTypes from "../actions/actionTypes";

const initalState = {
  orders: [],
  loading: false,
  purchased: false,
};

//! functions that do reducing collapsed below
//#region
const purchaseInit = (state) => {
  return {
    ...state,
    purchased: false,
  };
};
const purchaseBurgerStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  return {
    ...state,
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  };
};
const purchaseBugerFail = (state) => {
  return {
    ...state,
    loading: false,
  };
};
const fetchOrdersStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};
const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    loading: false,
  };
};
const fetchOrdersFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};
//#endregion

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBugerFail(state);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
