import { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/index";

class Logout extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
