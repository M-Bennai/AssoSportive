module.exports = (app) => {
  const seances = require("../controllers/seances.controller.js");

  var router = require("express").Router();

  //Update "Seances" array in gymnase
  router.put("/updateSeanceById/:id", seances.updateSeance);
  app.use("/api/seances", router);
};
