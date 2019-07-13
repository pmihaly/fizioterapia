import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Exercise } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, exercise

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  exercise = await Exercise.create({})
})

test('POST /exercises 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', thumbnail: 'test', youtubeLink: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.thumbnail).toEqual('test')
  expect(body.youtubeLink).toEqual('test')
})

test('POST /exercises 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /exercises 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /exercises 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /exercises 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /exercises/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${exercise.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(exercise.id)
})

test('GET /exercises/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${exercise.id}`)
  expect(status).toBe(401)
})

test('GET /exercises/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /exercises/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${exercise.id}`)
    .send({ access_token: adminSession, name: 'test', thumbnail: 'test', youtubeLink: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(exercise.id)
  expect(body.name).toEqual('test')
  expect(body.thumbnail).toEqual('test')
  expect(body.youtubeLink).toEqual('test')
})

test('PUT /exercises/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${exercise.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /exercises/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${exercise.id}`)
  expect(status).toBe(401)
})

test('PUT /exercises/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', thumbnail: 'test', youtubeLink: 'test' })
  expect(status).toBe(404)
})

test('DELETE /exercises/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${exercise.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /exercises/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${exercise.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /exercises/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${exercise.id}`)
  expect(status).toBe(401)
})

test('DELETE /exercises/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
