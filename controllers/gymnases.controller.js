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

exports.search = async (req, res) => {
  let query = {};
  if (req.query.keyword) {
    query.$or = [
      { Ville: { $regex: req.query.keyword } },
      { NomGymnase: { $regex: req.query.keyword } },
    ];
  }
  let gymn = await Gymnases.find(query);
  return res.status(200).send({ message: "successfully fetched", data: gymn });
};

// exports.find = (req, res) => {
//   const ville = req.params.Ville;
//   const nomGym = req.params.NomGymnase;
//   // const nomGymnase = req.params.NomGymnase

//   Gymnases.find({ Ville: ville, NomGymnase: nomGymnase }) //|| { NomGymnase: nomGym })
//     .then((data) => {
//       if (data)
//         if (!data) res.status(404).send({ message: "Not found Ville" + Ville });
//         else res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: "Error retrieving Ville" + Ville });
//     });
// };

exports.findOne = (req, res) => {
  const idGymnase = req.params.id;

  Gymnases.findOne({ _id: idGymnase })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Gymnase with " + idGymnase });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Gymnase with " + idGymnase });
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
    IdGymnase: req.body.IdGymnase,
    NomGymnase: req.body.NomGymnase,
    Adresse: req.body.Adresse,
    Ville: req.body.Ville,
    Surface: req.body.Surface,
    Seances: [
      {
        IdSportifEntraineur: req.body.IdSportifEntraineur,
        Jour: req.body.Jour,
        Horaire: req.body.Horaire,
        Duree: req.body.Duree,
        Libelle: req.body.Libelle,
      },
    ],
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
  const id = req.params.IdGymnase;
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

  Gymnases.findByIdAndUpdate(id, req.body, {
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
