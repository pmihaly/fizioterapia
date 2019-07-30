import {
  Dialog,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  createExercise,
  deleteExercise,
  getExercises
} from "../../actions/ExerciseActions";

const SelectExercises = props => {
  const [showNewExerciseDialog, setShowNewExerciseDialog] = useState(false);

  const [newExercise, setNewExercise] = useState({
    exerciseName: "",
    youtubeLink: ""
  });

  const handleNewExerciseInput = e => {
    setNewExercise({ ...newExercise, [e.target.id]: e.target.value });
  };
  return (
    <Card>
      <CardBody>
        <h4>Elérhető gyakorlatok</h4>
        <Dialog open={showNewExerciseDialog}>
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
                  setShowNewExerciseDialog(false);
                }}
              >
                <i className="material-icons">save</i> Gyakorlat rögzítése
              </Button>
              <Button
                color="danger"
                onClick={() => setShowNewExerciseDialog(false)}
              >
                <i className="material-icons">close</i> Mégse
              </Button>
            </CardBody>
          </Card>
        </Dialog>
      </CardBody>
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
                      onClick={() => setShowNewExerciseDialog(true)}
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
                src={exercise.thumbnail}
                alt={`${exercise.name} gyakorlat képe`}
              />
              <GridListTileBar
                title={exercise.name}
                actionIcon={
                  <div>
                    <IconButton style={{ color: "rgba(255, 255, 255, 0.54)" }}>
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
  );
};

const mapStateToProps = state => ({
  exercises: state.exercises.exercises,
  token: state.auth.authenticatedUser.token
});

const mapDispatchToProps = {
  getExercises,
  createExercise,
  deleteExercise
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectExercises);
