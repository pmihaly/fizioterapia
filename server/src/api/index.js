import { Router, static as Static } from "express";
import user from "./user";
import auth from "./auth";
import training from "./training";
import exercise from "./exercise";

import path from "path";

const router = new Router();

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine trainer Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use("/users", user);
router.use("/auth", auth);
router.use("/trainings", training);
router.use("/exercises", exercise);

const buildDest = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "trainer-site",
  "build"
);
router.use(Static(buildDest));
router.get("/*", (req, res) =>
  res.sendFile(path.join(buildDest, "index.html"))
);

export default router;
