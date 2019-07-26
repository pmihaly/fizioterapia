import { success, notFound } from "../../services/response/";
import { Training } from ".";
import { Exercise } from "../exercise/index";

const createTraining = (body, res, next) => {
  Training.create(body)
    .then(training => training.view(true))
    .then(success(res, 201))
    .catch(next);
};

export const create = ({ bodymen: { body } }, res, next) => {
  if (!body.thumbnail) {
    Exercise.findById(body.exercises[0].id).then(exercise => {
      body.thumbnail = exercise.thumbnail;
      createTraining(body, res, next);
    });
  } else {
    createTraining(body, res, next);
  }
};

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Training.find(query, select, cursor)
    .then(trainings => trainings.map(training => training.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Training.findById(params.id)
    .then(notFound(res))
    .then(training => (training ? training.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Training.findById(params.id)
    .then(notFound(res))
    .then(training => (training ? Object.assign(training, body).save() : null))
    .then(training => (training ? training.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Training.findById(params.id)
    .then(notFound(res))
    .then(training => (training ? training.remove() : null))
    .then(success(res, 204))
    .catch(next);
