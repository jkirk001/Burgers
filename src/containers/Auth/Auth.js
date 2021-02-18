import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { auth, setAuthPath } from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
          shouldValidate: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 7,
          isNumeric: true,
          shouldValidate: true,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirect !== "/") {
      this.props.onSetRedirectPath();
    }
  }
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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    let updatedOrderForm = { ...this.state.controls };
    let updatedOrderEl = { ...updatedOrderForm[inputIdentifier] };
    updatedOrderEl.value = event.target.value;
    updatedOrderEl.touched = true;

    updatedOrderEl.valid = this.checkValidity(
      updatedOrderEl.value,
      updatedOrderEl.validation
    );
    updatedOrderForm[inputIdentifier] = updatedOrderEl;

    //let formIsValid = true;
    //for (let inputIdentifier in updatedOrderForm) {
    //formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    //}
    this.setState({ controls: updatedOrderForm });
  };

  submitHandler = (event) => {
    event.preventDefault();
    let method = "login";
    if (this.state.isSignUp) {
      method = "signUp";
    }
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      method
    );
  };
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    let destructured = Object.entries(this.state.controls);

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
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }
    let loginMain = <Spinner />;
    if (!this.props.loading) {
      loginMain = (
        <form onSubmit={(e) => this.submitHandler(e)} className={classes.Form}>
          {this.props.error ? errorMessage : null}
          {inputs}
          <Button btnType="Success">
            {this.state.isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>
      );
    }
    return (
      <div className={classes.Main}>
        {loginMain}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignUp ? "Login" : "Sign-Up"}
        </Button>
        {this.props.loggedIn ? <Redirect to={this.props.authRedirect} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    loggedIn: state.auth.token !== null,
    authRedirect: state.auth.authRedirect,
    building: state.burgerBuilder.bulding,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, method) =>
      dispatch(auth(email, password, method)),
    onSetRedirectPath: () => dispatch(setAuthPath("/")),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(Auth);
