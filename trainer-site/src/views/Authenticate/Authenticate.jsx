import withStyles from '@material-ui/core/styles/withStyles';
import Error from '@material-ui/icons/Error';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from 'components/CustomInput/CustomInput';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Snackbar from 'components/Snackbar/Snackbar.jsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn, register } from '../../actions/AuthActions';

const Authenticate = (props) => {
  const [registration, setRegistration] = useState({
    email: '',
    name: '',
    password: '',
    passwordVerification: '',
    description: '',
  });

  const [login, setLogin] = useState({ loginEmail: '', loginPassword: '' });

  const handleRegistrationInput = (e) => {
    setRegistration({ ...registration, [e.target.id]: e.target.value });
  };

  const handleLoginInput = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  return (
    <GridContainer>
      {props.user.token && <Redirect to="/tornász"></Redirect>}
      <GridItem xs={12} sm={12} md={7}>
        <Snackbar
          place="bc"
          color="danger"
          icon={Error}
          message="Hiba történt a regisztráció közben. Kérlek ellenőrizd az adataidat és próbálkozz meg mégegyszer"
          open={props.registrationError}
        ></Snackbar>
        <Card>
          <CardHeader color="primary">
            <h4 className={props.classes.cardTitleWhite}>Regisztráció</h4>
            <p className={props.classes.cardCategoryWhite}>Hozz létre egy új tornász fiókot</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Email cím"
                  id="email"
                  error={
                    !registration.email.match(
                      // eslint-disable-next-line no-useless-escape
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    ) && !!registration.email
                  }
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'email',
                    onChange: handleRegistrationInput,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Megjelenített név"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  id="name"
                  inputProps={{
                    onChange: handleRegistrationInput,
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Jelszó"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  error={registration.password.length < 6 && registration.password}
                  id="password"
                  inputProps={{
                    type: 'password',
                    onChange: handleRegistrationInput,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Jelszó megerősítése"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  id="passwordVerification"
                  error={
                    registration.passwordVerification !== registration.password &&
                    registration.passwordVerification
                  }
                  inputProps={{
                    type: 'password',
                    onChange: handleRegistrationInput,
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Adj meg egy rövid leírást magadról, hogy könnyebben megtaláljanak a páciensek (Opcionális)"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  id="description"
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    onChange: handleRegistrationInput,
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button
              color="primary"
              onClick={() => {
                props.register({
                  email: registration.email,
                  name: registration.name,
                  password: registration.password,
                  description: registration.description,
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
          open={props.loginError}
        ></Snackbar>
        <Card>
          <CardHeader color="rose">
            <h4 className={props.classes.cardTitleWhite}>Bejelentkezés</h4>
            <p className={props.classes.cardCategoryWhite}>Ha már regisztráltál az oldalunkon</p>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="Email cím"
              id="loginEmail"
              error={
                !login.loginEmail.match(
                  // eslint-disable-next-line no-useless-escape
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ) && !!login.loginEmail
              }
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: 'email',
                onChange: handleLoginInput,
              }}
            />

            <CustomInput
              labelText="Jelszó"
              formControlProps={{
                fullWidth: true,
              }}
              error={login.loginPassword.length < 6 && login.loginPassword}
              id="loginPassword"
              inputProps={{
                type: 'password',
                onChange: handleLoginInput,
              }}
            />
          </CardBody>
          <CardFooter>
            <Button
              color="rose"
              onClick={() => {
                props.logIn({
                  email: login.loginEmail,
                  password: login.loginPassword,
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
};

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  tableUpgradeWrapper: {
    display: 'block',
    width: '100%',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    MsOverflowStyle: '-ms-autohiding-scrollbar',
  },
  table: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: '1rem',
    backgroundColor: 'transparent',
    borderCollapse: 'collapse',
    display: 'table',
    borderSpacing: '2px',
    borderColor: 'grey',
    '& thdead tr th': {
      fontSize: '1.063rem',
      padding: '12px 8px',
      verticalAlign: 'middle',
      fontWeight: '300',
      borderTopWidth: '0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      textAlign: 'inherit',
    },
    '& tbody tr td': {
      padding: '12px 8px',
      verticalAlign: 'middle',
      borderTop: '1px solid rgba(0, 0, 0, 0.06)',
    },
    '& td, & th': {
      display: 'table-cell',
    },
  },
  center: {
    textAlign: 'center',
  },
};

Authenticate.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loginError: PropTypes.bool.isRequired,
  registrationError: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.authenticatedUser,
  loginError: state.error.loginError,
  registrationError: state.error.registrationError,
});

const mapDispatchToProps = {
  logIn,
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Authenticate));
