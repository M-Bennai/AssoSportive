const db = require("../models");
const Sportifs = db.sportifs;

exports.updateSports = (req, res) => {
  const id = req.params.id;

  Sportifs.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Sports with id=${id}. Maybe sports was not found!`,
        });
      } else res.send({ message: "Sports was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating seance with id=" + id,
      });
    });
};
