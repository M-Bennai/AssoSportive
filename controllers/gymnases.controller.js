const db = require("../models");
const Gymnases = db.gymnases;

exports.findAll = (req, res) => {
  Gymnases.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving gymnases.",
      });
    });
};

exports.find = (req, res) => {
  const ville = req.params.Ville;
  const nomGym = req.params.NomGymnase;
  // const nomGymnase = req.params.NomGymnase

  Gymnases.find({ Ville: ville })
    .then((data) => {
      if (data)
        if (!data) res.status(404).send({ message: "Not found Ville" + Ville });
        else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Ville" + Ville });
    });
};

exports.findOne = (req, res) => {
  const IdGymnase = req.params.id;

  Gymnases.findOne({ IdGymnase: IdGymnase })
    .then((data) => {
      console.log("req.params", req.params)
      if (!data)
        res.status(404).send({ message: "Not found Gymnase with id " });
      else res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: `Error retrieving Gymnase with id=${IdGymnase}`});
    });
};

exports.create = (req, res) => {
  //validate request
  if (!req.body.NomGymnase) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // Create a gymnase
  const gymnase = new Gymnases({
    IdGymnase: Date.now(),
    NomGymnase: req.body.NomGymnase,
    Adresse: req.body.Adresse,
    Ville: req.body.Ville,
    Surface: req.body.Surface,
    Seances: []
    // Seances: [
    //   {
    //     IdSportifEntraineur: req.body.IdSportifEntraineur,
    //     Jour: req.body.Jour,
    //     Horaire: req.body.Horaire,
    //     Duree: req.body.Duree,
    //     Libelle: req.body.Libelle,
    //   },
    // ],
  });

  // Save gmynase in database
  gymnase
    .save(gymnase)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving gymnases.",
      });
    });
};

// delete gymnase by id
exports.delete = (req, res) => {
  const id = req.params.id;
  // const objectID = req.params.id;

  Gymnases.deleteOne({ IdGymnase: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Gymnase with id=${id}. Maybe Gymnase was not found!`,
        });
      } else {
        res.send({
          message: "Gymnase was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Gymnase with id=" + id,
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

  Gymnases.findOneAndUpdate({IdGymnase:id}, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Gymnase with id=${id}. Maybe Gymnase was not found!`,
        });
      } else res.send({ message: "Gymnase was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Gymnase with id=" + id,
      });
    });
};
