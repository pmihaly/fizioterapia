import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import Button from 'components/CustomButtons/Button';
import CustomInput from 'components/CustomInput/CustomInput';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createExercise, deleteExercise, getExercises } from '../../actions/ExerciseActions';

const NewExercise = (props) => {
  const [newExercise, setNewExercise] = useState({
    exerciseName: '',
    youtubeLink: '',
  });

  const handleNewExerciseInput = (e) => {
    setNewExercise({ ...newExercise, [e.target.id]: e.target.value });
  };
  return (
    <Card>
      <CardHeader color="primary">
        <h4>Új gyakorlat</h4>
      </CardHeader>
      <CardBody>
        <CustomInput
          labelText="Gyakorlat neve"
          id="exerciseName"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: handleNewExerciseInput,
          }}
        />
        <CustomInput
          labelText="Gyakorlatot bemutató YouTube videó linkje"
          id="youtubeLink"
          formControlProps={{
            fullWidth: true,
          }}
          error={
            !newExercise.youtubeLink.match(
              // eslint-disable-next-line no-useless-escape
              /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
            ) && !!newExercise.youtubeLink
          }
          inputProps={{
            onChange: handleNewExerciseInput,
          }}
        />
        <Button
          color="success"
          onClick={() => {
            props.createExercise(props.token, {
              name: newExercise.exerciseName,
              youtubeLink: newExercise.youtubeLink,
            });
            props.setShowDialog(false);
          }}
        >
          <i className="material-icons">save</i> Gyakorlat rögzítése
        </Button>
        <Button color="danger" onClick={() => props.setShowDialog(false)}>
          <i className="material-icons">close</i> Mégse
        </Button>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  exercises: state.exercises.exercises,
  token: state.auth.authenticatedUser.token,
});

const mapDispatchToProps = {
  getExercises,
  createExercise,
  deleteExercise,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewExercise);
