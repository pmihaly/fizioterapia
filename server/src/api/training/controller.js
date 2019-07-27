import { success, notFound, authorOrAdmin } from "../../services/response/";
import { Training } from ".";
import { Exercise } from "../exercise/index";

const createTraining = (user, body, res, next) => {
  Training.create({ ...body, trainer: user })
    .then(training => training.view(true))
    .then(success(res, 201))
    .catch(next);
};

export const create = ({ user, bodymen: { body } }, res, next) => {
  if (!body.thumbnail) {
    Exercise.findById(body.exercises[0].id).then(exercise => {
      body.thumbnail = exercise.thumbnail;
      createTraining(user, body, res, next);
    });
  } else {
    createTraining(user, body, res, next);
  }
};

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Training.find(query, select, cursor)
    .then(trainings => trainings.map(training => training.view()))
    .then(success(res))
    .catch(next);

export const show = (user, { params }, res, next) =>
  Training.findById(params.id)
    .then(notFound(res))
    .then(trainings =>
      trainings.filter(
        training => training.trainer.toString() == user._id.toString()
      )
    )
    .then(training => (training ? training.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Training.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "trainer"))
    .then(training => (training ? Object.assign(training, body).save() : null))
    .then(training => (training ? training.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ user, params }, res, next) =>
  Training.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "trainer"))
    .then(training => (training ? training.remove() : null))
    .then(success(res, 204))
    .catch(next);
