import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];

  if (!props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <texta
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      let optionsArr = Object.entries(props.elementConfig.options);
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {optionsArr.map((item, index) => {
            return (
              <option key={index} value={item[1].value}>
                {item[1].displayValue}
              </option>
            );
          })}
          value={props.value}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default Input;
