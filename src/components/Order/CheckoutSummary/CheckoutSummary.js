import React from "react";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.module.css";
import Button from "../../UI/Button/Button";

const CheckoutS = (props) => {
  return (
    <div className={classes.CheckoutSum}>
      <h1>Your Burger</h1>
      <div className={classes.BurgerSample}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div className={classes.Buttons}>
        <Button btnType="Danger" clicked={props.checkoutCancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CheckoutS;
