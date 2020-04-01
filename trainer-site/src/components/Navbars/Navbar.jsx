import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/icons/Menu';
import headerStyle from 'assets/jss/material-dashboard-react/components/headerStyle.jsx';
import classNames from 'classnames';
import Button from 'components/CustomButtons/Button.jsx';
import PropTypes from 'prop-types';
import React from 'react';

function Header({ ...props }) {
  const { classes, color } = props;
  const appBarClasses = classNames({
    [' ' + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Hidden mdUp implementation="css">
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            {/* Here we create navbar brand, based on route name */}
            <Button color="transparent" href="#" className={classes.title}>
              Fizioterápia
            </Button>
          </div>
          <IconButton color="inherit" aria-label="open drawer" onClick={props.handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Toolbar>
      </Hidden>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(headerStyle)(Header);
