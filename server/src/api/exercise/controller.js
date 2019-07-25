import { success, notFound } from "../../services/response/";
import { Exercise } from ".";
import axios from "axios";

function videoIdToBase64(videoId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://img.youtube.com/vi/${videoId}/0.jpg`, {
        responseType: "arraybuffer"
      })
      .then(img => resolve(Buffer.from(img.data).toString("base64")));
  });
}

export const create = ({ bodymen: { body } }, res, next) => {
  const videoId = body.youtubeLink.split("v=")[1];
  console.log(videoId);
  videoIdToBase64(videoId).then(thumbnail => {
    body.thumbnail = thumbnail;
    Exercise.create(body)
      .then(exercise => exercise.view(true))
      .then(success(res, 201))
      .catch(next);
  });
};

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Exercise.find(query, select, cursor)
    .then(exercises => exercises.map(exercise => exercise.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Exercise.findById(params.id)
    .then(notFound(res))
    .then(exercise => (exercise ? exercise.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Exercise.findById(params.id)
    .then(notFound(res))
    .then(exercise => (exercise ? Object.assign(exercise, body).save() : null))
    .then(exercise => (exercise ? exercise.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Exercise.findById(params.id)
    .then(notFound(res))
    .then(exercise => (exercise ? exercise.remove() : null))
    .then(success(res, 204))
    .catch(next);
