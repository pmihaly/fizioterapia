import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { logIn, register } from "../../actions/AuthActions";

class UpgradeToPro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      password: "",
      passwordValidation: "",
      description: ""
    };
  }
  static propTypes = {
    classes: PropTypes.object
  };

  validateAndRegister = () => {
    this.props.Register({
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      description: this.state.description
    });
  };

  handleChange = e => {
    console.log("handleChange");
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
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
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Megjelenített név"
                    formControlProps={{
                      fullWidth: true
                    }}
                    id="name"
                    inputProps={{
                      onChange: this.handleChange
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
                    id="password"
                    inputProps={{
                      type: "password",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Jelszó megerősítése"
                    formControlProps={{
                      fullWidth: true
                    }}
                    id="passwordValidation"
                    inputProps={{
                      type: "password",
                      onChange: this.handleChange
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
                    id="description"
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={this.validateAndRegister}>
                Regisztráció
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={require("assets/img/faces/marc.jpg")} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={this.props.classes.cardCategory}>
                CEO / CO-FOUNDER
              </h6>
              <h4 className={this.props.classes.cardTitle}>Alec Thompson</h4>
              <p className={this.props.classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
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
    user: state.authenticatedUser
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
