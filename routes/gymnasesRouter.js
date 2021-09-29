const gymnases = require("../models/gymnases.js");

module.exports = (app) => {
  const gymnases = require("../controllers/gymnases.controller.js");

  var router = require("express").Router();

  // Retrieve all Gymnases
  router.get("/allGym", gymnases.findAll);

  // Create new Gymnase
  router.post("/postGym", gymnases.create);

  // Delete a Gymnase with id
  router.delete("/deleteById/:id", gymnases.delete);

  // Update a GYmnase by id
  router.put("/updateById/:id", gymnases.update);

  //test
  app.use("/api/gymnases", router);
};
