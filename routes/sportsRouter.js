module.exports = (app) => {
  const sports = require("../controllers/sports.controller.js");

  var router = require("express").Router();

  //Update "Sports" array in gymnase
  router.put("/updateSportsById/:id", sports.updateSports);
  app.use("/api/sports", router);
};
