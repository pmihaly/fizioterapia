import { Dialog, withStyles } from "@material-ui/core";
import cardImagesStyles from "assets/jss/material-dashboard-react/cardImagesStyles.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  createExercise,
  deleteExercise,
  getExercises
} from "../../actions/ExerciseActions";
import {
  createTraining,
  deleteTraining,
  getTrainings
} from "../../actions/TrainingActions";
import SelectExercises from "./SelectExercises";
import CustomInput from "components/CustomInput/CustomInput";

const TrainingDashboard = props => {
  useEffect(() => {
    if (props.exercises.length === 0) props.getExercises(props.token);
    if (props.trainings.length === 0) props.getTrainings(props.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showNewTrainingDialog, setShowNewTrainingDialog] = useState(false);

  return (
    <div>
      <Dialog open={showNewTrainingDialog} maxWidth={"lg"}>
        <Card>
          <CardHeader color="primary">
            <h4>Új gyakorlatsor</h4>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="Gyakorlatsor neve"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                style: { width: "75%" }
              }}
            ></CustomInput>
            <CustomInput
              labelText="Gyakorlatsor leírása"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                style: { width: "75%" }
              }}
            ></CustomInput>
            <Card>
              <CardBody>
                <h4>Edzés gyakorlatai</h4>
              </CardBody>
              <CardBody></CardBody>
            </Card>
            <SelectExercises></SelectExercises>
          </CardBody>

          <GridContainer>
            <GridItem xs={12} sm={12} lg={4}>
              <Button
                color="danger"
                onClick={() => setShowNewTrainingDialog(false)}
              >
                <i className="material-icons">close</i> Mégse
              </Button>
            </GridItem>
          </GridContainer>
        </Card>
      </Dialog>
      <Card>
        <CardBody color="success">
          <GridContainer
            direction="column"
            alignItems="center"
            justify="center"
          >
            <GridItem>
              <Button
                justIcon
                round
                color="success"
                onClick={() => setShowNewTrainingDialog(true)}
              >
                <i className="material-icons">add</i>
              </Button>
            </GridItem>
            <GridItem>
              <h4 color="success">Gyakorlatsor összállítása</h4>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
      <GridContainer>
        {props.trainings.map((training, index) => (
          <GridItem xs={12} sm={12} md={4} key={index}>
            <Card>
              <img
                src={training.thumbnail}
                alt={`${training.name} gyakorlatsor képe`}
                style={{ display: "block" }}
                className={props.classes.cardImgTop}
                data-holder-rendered="true"
              />

              <CardBody>
                <h4>{training.name}</h4>
                <GridContainer
                  direction="row"
                  alignItems="baseline"
                  justify="space-around"
                >
                  <GridItem>
                    <Button color="primary">
                      <i className="material-icons">edit</i> szerkesztés
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Button
                      color="rose"
                      onClick={() =>
                        props.deleteTraining(props.token, training.id)
                      }
                    >
                      <i className="material-icons">delete</i> törlés
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
};

TrainingDashboard.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercises: PropTypes.object.isRequired,
  getTrainings: PropTypes.func.isRequired,
  trainings: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  exercises: state.exercises.exercises,
  trainings: state.trainings.trainings,
  token: state.auth.authenticatedUser.token
});

const mapDispatchToProps = {
  getExercises,
  createExercise,
  deleteExercise,
  getTrainings,
  createTraining,
  deleteTraining
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(cardImagesStyles)(TrainingDashboard));
