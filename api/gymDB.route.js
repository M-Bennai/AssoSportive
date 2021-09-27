import express from "express";
import GymnaseCtrl from "./gymnase.controller.js";

const router = express.Router();

router.route("/").get(GymnaseCtrl.apiGetGymnases);

export default router;
