import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "actions/AuthActions";
import { Redirect } from "react-router-dom";

export class LogOut extends Component {
  componentWillMount() {
    this.props.LogOut();
  }
  render() {
    return <div>{!this.props.user.token && <Redirect to="/főoldal" />}</div>;
  }
}

const mapActionsToProps = {
  LogOut: logOut
};

const mapStateToProps = state => ({
  user: state.auth.authenticatedUser
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LogOut);
