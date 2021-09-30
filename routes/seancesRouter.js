module.exports = (app) => {
  const gymnases = require("../controllers/seances.controller.js");
  const seances = require("../controllers/seances.controller.js");

  var router = require("express").Router();

  //Update "Seances" array in gymnase
  router.put("/updateSeanceById/:id", gymnases.updateSeance);
  app.use("/api/seances", router);
};
