const sportifs = require("../models/sportifs.js");
module.exports = (app) => {
  const sportifs = require("../controllers/sportifs.controller.js");

  var router = require("express").Router();

  //Retrieve all Sportifs
  router.get("/allSportifs", sportifs.findAll);

  // Retrieve a single sportif with id
  router.get("/oneSportif/:id", sportifs.findOne);

  //create new sportif
  router.post("/createSportif", sportifs.create);

  //delete by id sportif
  router.delete("/deleteSportif/:id", sportifs.delete);

  //update by id sportif
  router.put("/updateSportif/:id", sportifs.update);

  app.use("/api/sportifs", router);
};
