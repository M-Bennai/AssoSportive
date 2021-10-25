const db = require("../models");
const Sportifs = db.sportifs;

// get all by id
exports.findAll = (req, res) => {
  Sportifs.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving sportifs.",
      });
    });
};

// get element by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sportifs.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Gymnase with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Gymnase with id=" + id });
    });
};

exports.create = (req, res) => {
  //validate request
  if (!req.body.Nom) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // Create a sportifs
  const sportif = new Sportifs({
    IdSportif: req.body.IdSportif,
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Sexe: req.body.Sexe,
    Age: req.body.Age,
    Sports: {
      Jouer: [req.body.Jouer],
      Arbitrer: [req.body.Arbitrer],
      Entrainer: [req.body.Entrainer],
    },
  });

  // Save sportif in database
  sportif
    .save(sportif)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving gymnases.",
      });
    });
};

// delete sportif by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Sportifs.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Sportif with id=${id}. Maybe Sportif was not found!`,
        });
      } else {
        res.send({
          message: "Sportif was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Sportif with id=" + id,
      });
    });
};

// Update Gymnase by id

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "data to update can not be empty!",
    });
  }
  const id = req.params.id;

  Sportifs.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Sportifs with id=${id}. Maybe Sportifs was not found!`,
        });
      } else res.send({ message: "Sportifs was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Sportifs with id=" + id,
      });
    });
};

exports.searchSportifs = async (req, res) => {
  let query = {};
  if (req.query.keyword) {
    query.$or = [
      { Nom: { $regex: req.query.keyword } },
      { Prenom: { $regex: req.query.keyword } },
    ];
  }
  let sport = await Sportifs.find(query);
  return res.status(200).send({ message: "successfully fetched", data: sport });
};
