import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./Contact.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Aux/Aux";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions/index";

class Contact extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
          shouldValidate: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          shouldValidate: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Address",
        },
        value: "",
        validation: {
          required: true,
          shouldValidate: true,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
        validation: {
          required: true,
          shouldValidate: true,
        },
        valid: false,
        touched: false,
      },
      zip: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip",
        },
        value: "",
        validation: {
          required: true,
          shouldValidate: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      method: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "delivery", displayValue: "Delivery" },
            { value: "pickup", displayValue: "Pickup" },
          ],
        },
        value: "delivery",
        validation: {
          required: true,
          shouldValidate: false,
        },
        valid: true,
        touched: true,
      },
    },
    formIsValid: false,
  };
  componentDidMount() {
    let final = { ...this.state };
    final.ingredients = this.props.ing;
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loader: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ing,
      price: this.props.finalPrice,
      customer: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(this.props.token, order);
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid =
        value.length <= rules.minLength &&
        value.length >= rules.minLength &&
        isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    let updatedOrderForm = { ...this.state.orderForm };
    let updatedOrderEl = { ...updatedOrderForm[inputIdentifier] };
    updatedOrderEl.value = event.target.value;
    updatedOrderEl.touched = true;

    updatedOrderEl.valid = this.checkValidity(
      updatedOrderEl.value,
      updatedOrderEl.validation
    );
    updatedOrderForm[inputIdentifier] = updatedOrderEl;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    let destructured = Object.entries(this.state.orderForm);

    let inputs = destructured.map((inp, index) => {
      return (
        <Input
          elementType={inp[1].elementType}
          elementConfig={inp[1].elementConfig}
          value={inp[1].value}
          key={inp[0]}
          label={inp[0]}
          changed={(event) => this.inputChangedHandler(event, inp[0])}
          invalid={inp[1].valid}
          shouldValidate={inp[1].validation.shouldValidate}
          touched={inp[1].touched}
        />
      );
    });

    let form = (
      <Aux>
        <h4>Enter your contact info : </h4>
        <form onSubmit={this.orderHandler} style={{ width: "100%" }}>
          {inputs}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            Order
          </Button>
        </form>
      </Aux>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    finalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (token, orderData) =>
      dispatch(purchaseBurger(token, orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Contact, axios));
