import {
  Dialog,
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
import CustomInput from "components/CustomInput/CustomInput";
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
import { deleteTraining, getTrainings } from "../../actions/TrainingActions";

const TrainingDashboard = props => {
  useEffect(() => {
    if (props.exercises.length === 0) props.getExercises(props.token);
    if (props.trainings.length === 0) props.getTrainings(props.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showDialogs, setShowDialogs] = useState({ newExercise: false });
  const [newExercise, setNewExercise] = useState({
    exerciseName: "",
    youtubeLink: ""
  });

  const handleNewExerciseInput = e => {
    setNewExercise({ ...newExercise, [e.target.id]: e.target.value });
  };

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
      </GridItem>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4>Elérhető gyakorlatok</h4>
            <p>
              Shift + görgetéssel tudsz oldalra görgetni a görgetősáv
              hansználata nélkül
            </p>

            <Dialog open={showDialogs.newExercise}>
              <Card>
                <CardHeader color="primary">
                  <h4>Új gyakorlat</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Gyakorlat neve"
                    id="exerciseName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: handleNewExerciseInput
                    }}
                  />
                  <CustomInput
                    labelText="Gyakorlatot bemutató YouTube videó linkje"
                    id="youtubeLink"
                    formControlProps={{
                      fullWidth: true
                    }}
                    error={
                      !newExercise.youtubeLink.match(
                        // eslint-disable-next-line no-useless-escape
                        /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
                      ) && !!newExercise.youtubeLink
                    }
                    inputProps={{
                      onChange: handleNewExerciseInput
                    }}
                  />
                  <Button
                    color="success"
                    onClick={() => {
                      props.createExercise(props.token, {
                        name: newExercise.exerciseName,
                        youtubeLink: newExercise.youtubeLink
                      });
                      setShowDialogs({ ...showDialogs, newExercise: false });
                    }}
                  >
                    <i className="material-icons">save</i> Gyakorlat rögzítése
                  </Button>
                  <Button
                    color="danger"
                    onClick={() =>
                      setShowDialogs({ ...showDialogs, newExercise: false })
                    }
                  >
                    <i className="material-icons">close</i> Mégse
                  </Button>
                </CardBody>
              </Card>
            </Dialog>
          </CardHeader>
          <CardBody>
            <GridList
              cols={2.5}
              style={{
                flexWrap: "nowrap",
                transform: "translateZ(0)"
              }}
            >
              <GridListTile>
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
                          onClick={() =>
                            setShowDialogs({
                              ...showDialogs,
                              newExercise: true
                            })
                          }
                        >
                          <i className="material-icons">add</i>
                        </Button>
                      </GridItem>
                      <GridItem>
                        <h4 color="success">Gyakorlat hozzáadása</h4>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridListTile>

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
                            props.deleteExercise(props.token, exercise.id)
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
  createExercise,
  deleteExercise,
  getTrainings,
  deleteTraining
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(cardImagesStyles)(TrainingDashboard));
