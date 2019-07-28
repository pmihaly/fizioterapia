import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getExercises } from "../../actions/ExerciseActions";
import { getTrainings } from "../../actions/TrainingActions";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";

const TrainingDashboard = props => {
  useEffect(() => {
    const access_token = props.token;
    if (props.exercises.length === 0) props.getExercises({ access_token });
    if (props.trainings.length === 0) props.getTrainings({ access_token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridContainer direction="column" alignItems="center" justify="center">
      <GridItem xs={12} sm={12} md={8}>
        <GridContainer>
          {props.trainings.map(training => (
            <Card>
              <CardHeader>{training.name}</CardHeader>
              <CardBody>
                <img
                  src={`data:image/jpeg;base64, ${training.thumbnail}`}
                  alt={`${training.name} gyakorlatsor képe`}
                />
              </CardBody>
            </Card>
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
                <GridListTile key={exercise._id}>
                  <img
                    src={`data:image/jpeg;base64, ${exercise.thumbnail}`}
                    alt={`${exercise.name} gyakorlat képe`}
                  />
                  <GridListTileBar title={exercise.name}></GridListTileBar>
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
  exercise: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  getExercises: PropTypes.func.isRequired,
  getTrainings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  exercises: state.exercises.exercises,
  token: state.auth.authenticatedUser.token,
  trainings: state.trainings.trainings
});

const mapDispatchToProps = {
  getExercises,
  getTrainings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingDashboard);
