import React, { Component } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";

import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
  setAuthPath,
} from "../../store/actions/index";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.setAuthPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchased();
    this.props.history.push({
      pathname: "/checkout",
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ing,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <h2 style={{ textAlign: "center" }}>Error!</h2>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.addItem}
            ingredientRemoved={this.props.removeItem}
            disabled={disabledInfo}
            purchasable={this.props.finalPrice > 4}
            ordered={this.purchaseHandler}
            price={this.props.finalPrice}
            isAuth={this.props.loggedIn}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          price={this.props.finalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

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

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    finalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    loggedIn: state.auth.token !== null,
    authPath: state.auth.authRedirect,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (ingName) => dispatch(addIngredient(ingName)),
    removeItem: (ingName) => dispatch(removeIngredient(ingName)),
    initIngredients: () => dispatch(initIngredients()),
    onInitPurchased: () => dispatch(purchaseInit()),
    setAuthPath: (path) => dispatch(setAuthPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
