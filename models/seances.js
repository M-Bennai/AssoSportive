module.exports = (mongoose) => {
  const Seances = mongoose.model(
    "Seances",
    mongoose.Schema({
      IdSportifEntraineur: { type: Number, required: false },
      Jour: { type: String, required: false },
      Horaire: { type: Number, required: false },
      Duree: { type: Number, required: false },
      Libelle: { type: String, required: false },
    })
  );
  return Seances;
};
