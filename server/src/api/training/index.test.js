import request from 'supertest';
import { apiRoot } from '../../config';
import { signSync } from '../../services/jwt';
import express from '../../services/express';
import { User } from '../user';
import routes, { Training } from '.';

const app = () => express(apiRoot, routes);

let userSession, adminSession, training;

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' });
  const trainer = await User.create({
    email: 'c@c.com',
    password: '123456',
    role: 'trainer',
  });
  userSession = signSync(user.id);
  adminSession = signSync(trainer.id);
  training = await Training.create({});
});

test('POST /trainings 201 (trainer)', async () => {
  const { status, body } = await request(app()).post(`${apiRoot}`).send({
    access_token: adminSession,
    name: 'test',
    thumbnail: 'test',
    patient: 'test',
    exercises: 'test',
  });
  expect(status).toBe(201);
  expect(typeof body).toEqual('object');
  expect(body.name).toEqual('test');
  expect(body.thumbnail).toEqual('test');
  expect(body.patient).toEqual('test');
  expect(body.exercises).toEqual('test');
});

test('POST /trainings 401 (user)', async () => {
  const { status } = await request(app()).post(`${apiRoot}`).send({ access_token: userSession });
  expect(status).toBe(401);
});

test('POST /trainings 401', async () => {
  const { status } = await request(app()).post(`${apiRoot}`);
  expect(status).toBe(401);
});

test('GET /trainings 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
});

test('GET /trainings 401', async () => {
  const { status } = await request(app()).get(`${apiRoot}`);
  expect(status).toBe(401);
});

test('GET /trainings/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${training.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(training.id);
});

test('GET /trainings/:id 401', async () => {
  const { status } = await request(app()).get(`${apiRoot}/${training.id}`);
  expect(status).toBe(401);
});

test('GET /trainings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession });
  expect(status).toBe(404);
});

test('PUT /trainings/:id 200 (trainer)', async () => {
  const { status, body } = await request(app()).put(`${apiRoot}/${training.id}`).send({
    access_token: adminSession,
    name: 'test',
    thumbnail: 'test',
    patient: 'test',
    exercises: 'test',
  });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(training.id);
  expect(body.name).toEqual('test');
  expect(body.thumbnail).toEqual('test');
  expect(body.patient).toEqual('test');
  expect(body.exercises).toEqual('test');
});

test('PUT /trainings/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${training.id}`)
    .send({ access_token: userSession });
  expect(status).toBe(401);
});

test('PUT /trainings/:id 401', async () => {
  const { status } = await request(app()).put(`${apiRoot}/${training.id}`);
  expect(status).toBe(401);
});

test('PUT /trainings/:id 404 (trainer)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({
      access_token: adminSession,
      name: 'test',
      thumbnail: 'test',
      patient: 'test',
      exercises: 'test',
    });
  expect(status).toBe(404);
});

test('DELETE /trainings/:id 204 (trainer)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${training.id}`)
    .query({ access_token: adminSession });
  expect(status).toBe(204);
});

test('DELETE /trainings/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${training.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(401);
});

test('DELETE /trainings/:id 401', async () => {
  const { status } = await request(app()).delete(`${apiRoot}/${training.id}`);
  expect(status).toBe(401);
});

test('DELETE /trainings/:id 404 (trainer)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession });
  expect(status).toBe(404);
});
