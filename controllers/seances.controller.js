const db = require("../models");
const Gymnases = db.gymnases;

exports.updateSeance = (req, res) => {
  const id = req.params.id;

  Gymnases.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update seance with id=${id}. Maybe seance was not found!`,
        });
      } else res.send({ message: "seance was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating seance with id=" + id,
      });
    });
};
