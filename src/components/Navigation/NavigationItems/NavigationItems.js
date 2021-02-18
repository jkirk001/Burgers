import React from "react";
import { connect } from "react-redux";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.loggedIn ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {props.loggedIn ? (
      <NavigationItem link="/logout">Logout!</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Login!</NavigationItem>
    )}
  </ul>
);
const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.token !== null,
  };
};
export default connect(mapStateToProps, null)(navigationItems);
