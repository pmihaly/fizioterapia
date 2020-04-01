import { logOut } from 'actions/AuthActions';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const LogOut = (props) => {
  useEffect(() => {
    props.logOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Redirect to="/főoldal" />;
};

LogOut.propTypes = {
  logOut: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  logOut,
};

export default connect(null, mapActionsToProps)(LogOut);
