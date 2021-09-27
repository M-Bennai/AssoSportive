import express from "express";
import GymnaseCtrl from "./gymnase.controller.js";

const router = express.Router();

const gymDB = (app) => {
  router.route("/").get(GymnaseCtrl.apiGetGymnases);
};

export default gymDB;
