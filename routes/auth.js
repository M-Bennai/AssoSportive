module.exports = (app) => {
  const AuthController = require("../controllers/auth.controller");

  var router = require("express").Router();

  router.post("/register", AuthController.register);
  router.post("/login", AuthController.login);

  //test
  app.use("/api/", router);
};
