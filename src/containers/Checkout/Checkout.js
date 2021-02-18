import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CheckoutS from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Contact from "./Contact/Contact";

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.replace("/");
  };
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ing) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          <CheckoutS
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
            ingredients={this.props.ing}
          />
          <Route
            path={this.props.match.path + "/contact"}
            component={Contact}
          />

          {purchasedRedirect}
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    finalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
