import axios from "../../axios-orders";
import React, { Component } from "react";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let finalOrders = <Spinner />;
    if (!this.props.loading) {
      let orders = [...this.props.orders];
      finalOrders = orders.map((order, i) => {
        return (
          <Order key={i} price={order.price} ingredients={order.ingredients} />
        );
      });
    }

    return <div>{finalOrders}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
