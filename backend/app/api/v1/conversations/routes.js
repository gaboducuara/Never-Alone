import { Router } from "express";
import * as controller from "./controller.js"

export const router = Router();

router.route("/id/:id").get(controller.id)
router.route("/read").get(controller.read)
router.route("/create").post(controller.create)
router.route("/delete/:id").delete(controller.remove)
router.route("/archive/:id").put(controller.archive)
