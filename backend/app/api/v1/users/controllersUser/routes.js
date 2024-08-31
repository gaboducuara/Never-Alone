import { Router } from "express";
import * as controllerUser from "./controllerUser.js";

// eslint-disable-next-line new-cap
export const router = Router();

router.route("/").get(controllerUser.getAllUser);

router
  .route("/:id")
  .get(controllerUser.getUserById)
  .patch(controllerUser.UpdateUser)
  .put(controllerUser.UpdateUser)
  .delete(controllerUser.UserDelete);

router.route("/:username").get(controllerUser.getUserByUsername);
