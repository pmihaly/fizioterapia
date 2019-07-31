import { Dialog, GridListTile } from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import {
  createExercise,
  deleteExercise,
  getExercises
} from "../../actions/ExerciseActions";
import NewExercise from "./NewExercise";

const SelectExercises = props => {
  const [showNewExerciseDialog, setShowNewExerciseDialog] = useState(false);

  return (
    
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
