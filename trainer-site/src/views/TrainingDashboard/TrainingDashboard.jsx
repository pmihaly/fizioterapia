import { Dialog, withStyles, GridListTile, Paper } from '@material-ui/core';
import cardImagesStyles from 'assets/jss/material-dashboard-react/cardImagesStyles.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import Button from 'components/CustomButtons/Button';
import CustomInput from 'components/CustomInput/CustomInput';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { createExercise, deleteExercise, getExercises } from '../../actions/ExerciseActions';
import { createTraining, deleteTraining, getTrainings } from '../../actions/TrainingActions';
import NewExercise from './NewExercise';
import { GridListTileBar, IconButton } from '@material-ui/core';

const TrainingDashboard = (props) => {
  useEffect(() => {
    if (props.exercises.length === 0) props.getExercises(props.token);
    if (props.trainings.length === 0) props.getTrainings(props.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showNewTrainingDialog, setShowNewTrainingDialog] = useState(false);
  const [showNewExerciseDialog, setShowNewExerciseDialog] = useState(false);
  const [training, setTraining] = useState({
    name: '',
    description: '',
    exercises: [],
  });
  const [trainingExerciseCards, setTrainingExerciseCards] = useState([]);

  const onDragEnd = (result) => {
    const { destination, draggableId, source } = result;
    if (!destination) return;

    if (
      destination.droppableId === 'exerciseInTraining' &&
      source.droppableId === 'exerciseSelection'
    ) {
      const newExercise = { id: draggableId, number: 0 };
      setTraining({
        // TODO: 1-nél több gyakorlatokat nem tud beírni
        ...training,
        exercises: training.exercises.push(newExercise),
      });
      refreshExerciseCards();
    }
  };

  const refreshExerciseCards = () => {
    setTrainingExerciseCards([
      ...trainingExerciseCards,
      training.exercises.map(({ id, number }, index) => {
        const exercise = props.exercises.filter(
          (exerciseIteration) => id === exerciseIteration.id
        )[0];

        return (
          <Card
            key={index}
            style={{
              maxWidth: '15rem',
              margin: '1.5rem',
            }}
          >
            <img
              src={exercise.thumbnail}
              alt={`${exercise.name} gyakorlat képe`}
              className={props.classes.cardImgTop}
              data-holder-rendered="true"
            />

            <CardBody>
              <h4>{exercise.name}</h4>
              <CustomInput
                labelText="Ennyit kell elvégezni"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: 'number',
                  onChange: (e) => {
                    // TODO: frissítse a gyakorlatok számát a training.exercise-ban lévő gyakorlatok között
                  },
                }}
              ></CustomInput>
            </CardBody>
          </Card>
        );
      }),
    ]);
  };

  return (
    <div>
      <Dialog open={showNewTrainingDialog} maxWidth={'lg'} fullScreen>
        <Card>
          <CardHeader color="primary">
            <h4>Új gyakorlatsor</h4>
          </CardHeader>
          <CardBody>
            <DragDropContext onDragEnd={onDragEnd}>
              <CustomInput
                labelText="Gyakorlatsor neve"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  style: { width: '75%' },
                }}
              ></CustomInput>
              <CustomInput
                labelText="Gyakorlatsor leírása"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  style: { width: '75%' },
                }}
              ></CustomInput>
              <Card>
                <CardBody>
                  <h4>Edzés gyakorlatai</h4>
                </CardBody>
                <CardBody>
                  <Droppable droppableId="exerciseInTraining" direction="horizontal">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          minWidth: '1rem',
                          minHeight: '4rem',
                          maxHeight: '25rem',
                        }}
                      >
                        {provided.placeholder}
                        {trainingExerciseCards}
                      </div>
                    )}
                  </Droppable>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h4>Elérhető gyakorlatok</h4>
                  <Dialog open={showNewExerciseDialog}>
                    <NewExercise setShowDialog={setShowNewExerciseDialog}></NewExercise>
                  </Dialog>
                </CardBody>
                <CardBody>
                  <Droppable droppableId="exerciseSelection" direction="horizontal">
                    {(provided, snapshot) => (
                      <Paper
                        cols={2.5}
                        style={{
                          flexWrap: 'nowrap',
                          transform: 'translateZ(0)',
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <Card>
                          <CardBody color="success">
                            <GridContainer direction="column" alignItems="center" justify="center">
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

                        {props.exercises.map((exercise, index) => (
                          <Draggable draggableId={exercise.id} index={index} key={exercise.id}>
                            {(providedDraggable) => (
                              <div>
                                <GridListTile
                                  ref={providedDraggable.innerRef}
                                  {...providedDraggable.draggableProps}
                                  {...providedDraggable.dragHandleProps}
                                >
                                  <img
                                    src={exercise.thumbnail}
                                    alt={`${exercise.name} gyakorlat képe`}
                                  />
                                  <GridListTileBar
                                    title={exercise.name}
                                    actionIcon={
                                      <div>
                                        <IconButton
                                          style={{
                                            color: 'rgba(255, 255, 255, 0.54)',
                                          }}
                                        >
                                          <i className="material-icons">edit</i>
                                        </IconButton>
                                        <IconButton
                                          style={{
                                            color: 'rgba(255, 255, 255, 0.54)',
                                          }}
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
                                {provided.placeholder}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </Paper>
                    )}
                  </Droppable>
                </CardBody>
              </Card>
            </DragDropContext>
          </CardBody>

          <GridContainer>
            <GridItem xs={12} sm={12} lg={4}>
              <Button color="danger" onClick={() => setShowNewTrainingDialog(false)}>
                <i className="material-icons">close</i> Mégse
              </Button>
            </GridItem>
          </GridContainer>
        </Card>
      </Dialog>
      <Card>
        <CardBody color="success">
          <GridContainer direction="column" alignItems="center" justify="center">
            <GridItem>
              <Button justIcon round color="success" onClick={() => setShowNewTrainingDialog(true)}>
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
                style={{ display: 'block' }}
                className={props.classes.cardImgTop}
                data-holder-rendered="true"
              />

              <CardBody>
                <h4>{training.name}</h4>
                <GridContainer direction="row" alignItems="baseline" justify="space-around">
                  <GridItem>
                    <Button color="primary">
                      <i className="material-icons">edit</i> szerkesztés
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Button
                      color="rose"
                      onClick={() => props.deleteTraining(props.token, training.id)}
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
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  exercises: state.exercises.exercises,
  trainings: state.trainings.trainings,
  token: state.auth.authenticatedUser.token,
});

const mapDispatchToProps = {
  getExercises,
  createExercise,
  deleteExercise,
  getTrainings,
  createTraining,
  deleteTraining,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(cardImagesStyles)(TrainingDashboard));
