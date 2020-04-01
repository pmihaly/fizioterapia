import { success, notFound, authorOrAdmin } from '../../services/response/';
import { Exercise } from '.';

export const create = ({ user, bodymen: { body } }, res, next) => {
  body.thumbnail = `https://img.youtube.com/vi/${body.youtubeLink.split('v=')[1]}/hqdefault.jpg`;

  Exercise.create({ ...body, trainer: user })
    .then((exercise) => exercise.view(true))
    .then(success(res, 201))
    .catch(next);
};

export const index = ({ user, querymen: { query, select, cursor } }, res, next) =>
  Exercise.find(query, select, cursor)
    .then((exercises) =>
      exercises.filter((exercise) => exercise.trainer.toString() == user._id.toString())
    )
    .then((exercises) => exercises.map((exercise) => exercise.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Exercise.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'trainer'))
    .then((exercise) => (exercise ? exercise.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Exercise.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'trainer'))
    .then((exercise) => (exercise ? Object.assign(exercise, body).save() : null))
    .then((exercise) => (exercise ? exercise.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ user, params }, res, next) =>
  Exercise.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'trainer'))
    .then((exercise) => (exercise ? exercise.remove() : null))
    .then(success(res, 204))
    .catch(next);
