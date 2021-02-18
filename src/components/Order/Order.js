import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  //! Breaks if some data is missing - heads up
  const ingredients = Object.entries(props.ingredients);
  const ingredientsOutput = ingredients.map((item, index) => {
    return (
      <span key={index}>
        {item[0]} : ({item[1]})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>
        <strong>Ingredients :</strong> {ingredientsOutput}{" "}
      </p>
      <p>
        Price: <strong>${props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default Order;
