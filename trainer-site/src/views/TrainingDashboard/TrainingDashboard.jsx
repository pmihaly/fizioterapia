import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  withStyles
} from "@material-ui/core";
import cardImagesStyles from "assets/jss/material-dashboard-react/cardImagesStyles.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteExercise, getExercises } from "../../actions/ExerciseActions";
import { deleteTraining, getTrainings } from "../../actions/TrainingActions";

const TrainingDashboard = props => {
  useEffect(() => {
    if (props.exercises.length === 0) props.getExercises(props.token);
    if (props.trainings.length === 0) props.getTrainings(props.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridContainer direction="column" alignItems="center" justify="center">
      <GridItem xs={12} sm={12} md={8}>
        <GridContainer>
          {props.trainings.map((training, index) => (
            <GridItem xs={12} sm={12} md={4} key={index}>
              <Card>
                <img
                  src={`data:image/jpeg;base64, ${training.thumbnail}`}
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
                          props.deleteTraining(
                            { access_token: props.token },
                            training.id
                          )
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
      </GridItem>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4>Elérhető gyakorlatok</h4>
          </CardHeader>
          <CardBody>
            <GridList
              cols={2.5}
              style={{
                flexWrap: "nowrap",
                transform: "translateZ(0)"
              }}
            >
              {props.exercises.map(exercise => (
                <GridListTile key={exercise.id}>
                  <img
                    src={`data:image/jpeg;base64, ${exercise.thumbnail}`}
                    alt={`${exercise.name} gyakorlat képe`}
                  />
                  <GridListTileBar
                    title={exercise.name}
                    actionIcon={
                      <div>
                        <IconButton
                          style={{ color: "rgba(255, 255, 255, 0.54)" }}
                        >
                          <i className="material-icons">edit</i>
                        </IconButton>
                        <IconButton
                          style={{ color: "rgba(255, 255, 255, 0.54)" }}
                          onClick={() =>
                            props.deleteExercise(
                              { access_token: props.token },
                              exercise.id
                            )
                          }
                        >
                          <i className="material-icons">delete</i>
                        </IconButton>
                      </div>
                    }
                  ></GridListTileBar>
                </GridListTile>
              ))}
            </GridList>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
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
  deleteExercise,
  getTrainings,
  deleteTraining
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(cardImagesStyles)(TrainingDashboard));
