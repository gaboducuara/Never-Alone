import { Router } from "express";
import * as controller from "./controller.js";
import { auth } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router();
/**

 *
 */

router.route("/myMatchesSent").get(auth, controller.myMatchesSent);
router.route("/myMatchesReceived").get(auth, controller.myMatchesReceived);
router.route("/myMatchesAccepted").get(auth, controller.myMatchesAccepted);
router.route("/add").post(auth, controller.add);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .put(auth, controller.update)
  .patch(auth, controller.update)
  .delete(auth, controller.remove);
