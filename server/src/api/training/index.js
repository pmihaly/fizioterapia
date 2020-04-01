import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Training, { schema } from './model';

const router = new Router();
const { name, thumbnail, patient, exercises, description } = schema.tree;

/**
 * @api {post} /trainings Create training
 * @apiName CreateTraining
 * @apiGroup Training
 * @apiPermission trainer
 * @apiParam {String} access_token trainer access token.
 * @apiParam name Training's name.
 * @apiParam thumbnail Training's thumbnail.
 * @apiParam patient Training's patient.
 * @apiParam exercises Training's exercises.
 * @apiSuccess {Object} training Training's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Training not found.
 * @apiError 401 trainer access only.
 */
router.post(
  '/',
  token({ required: true, roles: ['trainer'] }),
  body({ name, thumbnail, patient, exercises, description }),
  create
);

/**
 * @api {get} /trainings Retrieve trainings
 * @apiName RetrieveTrainings
 * @apiGroup Training
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} trainings List of trainings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/', token({ required: true }), query(), index);

/**
 * @api {get} /trainings/:id Retrieve training
 * @apiName RetrieveTraining
 * @apiGroup Training
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} training Training's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Training not found.
 * @apiError 401 user access only.
 */
router.get('/:id', token({ required: true }), show);

/**
 * @api {put} /trainings/:id Update training
 * @apiName UpdateTraining
 * @apiGroup Training
 * @apiPermission trainer
 * @apiParam {String} access_token trainer access token.
 * @apiParam name Training's name.
 * @apiParam thumbnail Training's thumbnail.
 * @apiParam patient Training's patient.
 * @apiParam exercises Training's exercises.
 * @apiSuccess {Object} training Training's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Training not found.
 * @apiError 401 trainer access only.
 */
router.put(
  '/:id',
  token({ required: true, roles: ['trainer'] }),
  body({ name, thumbnail, patient, exercises, description }),
  update
);

/**
 * @api {delete} /trainings/:id Delete training
 * @apiName DeleteTraining
 * @apiGroup Training
 * @apiPermission trainer
 * @apiParam {String} access_token trainer access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Training not found.
 * @apiError 401 trainer access only.
 */
router.delete('/:id', token({ required: true, roles: ['trainer'] }), destroy);

export default router;
