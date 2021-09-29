module.exports = (app) => {
  const gymnases = require("../controllers/seances.controller.js");
  const seances = require("../controllers/seances.controller.js");

  var router = require("express").Router();

  //test
  router.put("/updateSeanceById/:id", gymnases.updateSeance);
  app.use("/api/seances", router);
};
