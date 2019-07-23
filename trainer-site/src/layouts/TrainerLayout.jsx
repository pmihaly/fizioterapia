// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import logo from "assets/img/logo.png";
import image from "assets/img/sidebar-2.jpg";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Footer from "components/Footer/Footer.jsx";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../routes/authenticatedRoutes";
import { setUser } from "actions/AuthActions";
import { connect } from "react-redux";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/tornász") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/tornász" to="/tornász/vezérlőpult" />
  </Switch>
);

class TrainerLayout extends React.Component {
  state = {
    image: image,
    color: "blue",
    hasImage: true,
    fixedClasses: "dropdown show",
    mobileOpen: false
  };
  mainPanel = React.createRef();
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return window.location.pathname !== "/tornász/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
    }
    window.addEventListener("resize", this.resizeFunction);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.props.LogIn(user);
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        {!this.props.user.token && <Redirect to="/" />}
        <Sidebar
          routes={routes}
          logoText={"Fizioterápia"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

TrainerLayout = withStyles(dashboardStyle)(TrainerLayout);

TrainerLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.authenticatedUser
  };
};

const mapActionsToProps = {
  LogIn: setUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TrainerLayout);
