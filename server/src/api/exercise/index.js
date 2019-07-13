import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Exercise, { schema } from './model'

const router = new Router()
const { name, thumbnail, youtubeLink } = schema.tree

/**
 * @api {post} /exercises Create exercise
 * @apiName CreateExercise
 * @apiGroup Exercise
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Exercise's name.
 * @apiParam thumbnail Exercise's thumbnail.
 * @apiParam youtubeLink Exercise's youtubeLink.
 * @apiSuccess {Object} exercise Exercise's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Exercise not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, thumbnail, youtubeLink }),
  create)

/**
 * @api {get} /exercises Retrieve exercises
 * @apiName RetrieveExercises
 * @apiGroup Exercise
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} exercises List of exercises.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /exercises/:id Retrieve exercise
 * @apiName RetrieveExercise
 * @apiGroup Exercise
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} exercise Exercise's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Exercise not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /exercises/:id Update exercise
 * @apiName UpdateExercise
 * @apiGroup Exercise
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Exercise's name.
 * @apiParam thumbnail Exercise's thumbnail.
 * @apiParam youtubeLink Exercise's youtubeLink.
 * @apiSuccess {Object} exercise Exercise's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Exercise not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, thumbnail, youtubeLink }),
  update)

/**
 * @api {delete} /exercises/:id Delete exercise
 * @apiName DeleteExercise
 * @apiGroup Exercise
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Exercise not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
