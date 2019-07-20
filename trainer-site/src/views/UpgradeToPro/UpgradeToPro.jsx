import withStyles from "@material-ui/core/styles/withStyles";
import Error from "@material-ui/icons/Error";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { logIn, register } from "../../actions/AuthActions";

class UpgradeToPro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registrationEmail: "",
      registrationName: "",
      registrationPassword: "",
      registrationPasswordValidation: "",
      registrationDescription: "",
      loginEmail: "",
      loginPassword: ""
    };
  }
  static propTypes = {
    classes: PropTypes.object
  };

  handleUserInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={7}>
          <Snackbar
            place="bc"
            color="danger"
            icon={Error}
            message="Hiba történt a regisztráció közben. Kérlek ellenőrizd az adataidat és próbálkozz meg mégegyszer"
            open={this.props.RegistrationError}
          ></Snackbar>
          <Card>
            <CardHeader color="primary">
              <h4 className={this.props.classes.cardTitleWhite}>
                Regisztráció
              </h4>
              <p className={this.props.classes.cardCategoryWhite}>
                Hozz létre egy új tornász fiókot
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Email cím"
                    id="registrationEmail"
                    error={
                      !this.state.registrationEmail.match(
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      ) && !!this.state.registrationEmail
                    }
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email",
                      onChange: this.handleUserInput
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Megjelenített név"
                    formControlProps={{
                      fullWidth: true
                    }}
                    id="registrationName"
                    inputProps={{
                      onChange: this.handleUserInput
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Jelszó"
                    formControlProps={{
                      fullWidth: true
                    }}
                    error={
                      this.state.registrationPassword.length < 6 &&
                      this.state.registrationPassword
                    }
                    id="registrationPassword"
                    inputProps={{
                      type: "password",
                      onChange: this.handleUserInput
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Jelszó megerősítése"
                    formControlProps={{
                      fullWidth: true
                    }}
                    id="registrationPasswordValidation"
                    error={
                      this.state.registrationPasswordValidation !==
                        this.state.registrationPassword &&
                      this.state.registrationPasswordValidation
                    }
                    inputProps={{
                      type: "password",
                      onChange: this.handleUserInput
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Adj meg egy rövid leírást magadról, hogy könnyebben megtaláljanak a páciensek (Opcionális)"
                    formControlProps={{
                      fullWidth: true
                    }}
                    id="registrationDescription"
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      onChange: this.handleUserInput
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                onClick={() => {
                  this.props.Register({
                    email: this.state.registrationEmail,
                    name: this.state.registrationName,
                    password: this.state.registrationPassword,
                    description: this.state.registrationDescription
                  });
                }}
              >
                Regisztráció
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <Snackbar
            place="bc"
            color="danger"
            icon={Error}
            message="Hiba történt a bejelentkezés közben. Kérlek ellenőrizd az adataidat és próbálkozz meg mégegyszer"
            open={this.props.LoginError}
          ></Snackbar>
          <Card>
            <CardHeader color="rose">
              <h4 className={this.props.classes.cardTitleWhite}>
                Bejelentkezés
              </h4>
              <p className={this.props.classes.cardCategoryWhite}>
                Ha már regisztráltál az oldalunkon
              </p>
            </CardHeader>
            <CardBody>
              <CustomInput
                labelText="Email cím"
                id="loginEmail"
                error={
                  !this.state.loginEmail.match(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  ) && !!this.state.loginEmail
                }
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "email",
                  onChange: this.handleUserInput
                }}
              />

              <CustomInput
                labelText="Jelszó"
                formControlProps={{
                  fullWidth: true
                }}
                error={
                  this.state.loginPassword.length < 6 &&
                  this.state.loginPassword
                }
                id="loginPassword"
                inputProps={{
                  type: "password",
                  onChange: this.handleUserInput
                }}
              />
            </CardBody>
            <CardFooter>
              <Button
                color="rose"
                onClick={() => {
                  this.props.LogIn({
                    email: this.state.loginEmail,
                    password: this.state.loginPassword
                  });
                }}
              >
                Bejelentkezés
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  tableUpgradeWrapper: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    MsOverflowStyle: "-ms-autohiding-scrollbar"
  },
  table: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    borderCollapse: "collapse",
    display: "table",
    borderSpacing: "2px",
    borderColor: "grey",
    "& thdead tr th": {
      fontSize: "1.063rem",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontWeight: "300",
      borderTopWidth: "0",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      textAlign: "inherit"
    },
    "& tbody tr td": {
      padding: "12px 8px",
      verticalAlign: "middle",
      borderTop: "1px solid rgba(0, 0, 0, 0.06)"
    },
    "& td, & th": {
      display: "table-cell"
    }
  },
  center: {
    textAlign: "center"
  }
};

UpgradeToPro = withStyles(styles)(UpgradeToPro);

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.authenticatedUser,
    LoginError: state.error.loginError,
    RegistrationError: state.error.registrationError
  };
};

const mapActionsToProps = {
  LogIn: logIn,
  Register: register
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UpgradeToPro);
