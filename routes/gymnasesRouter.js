const gymnases = require("../models/gymnases.js");

module.exports = (app) => {
  const gymnases = require("../controllers/gymnases.controller.js");

  var router = require("express").Router();

  // Retrieve all Gymnases
  router.get("/allGym", gymnases.findAll);

  // Retrieve a single Gymnase with id
  router.get("/oneGym/:id", gymnases.findOne);

  // Create new Gymnase
  router.post("/postGym", gymnases.create);

  // Delete a Gymnase with id
  router.delete("/deleteById/:id", gymnases.delete);

  // Update a Gymnase by id
  router.put("/updateGymnase/:id", gymnases.update);

  //find by ville
  router.get("/findByVille/:Ville", gymnases.find);

  //test
  app.use("/api/gymnases", router);
};
