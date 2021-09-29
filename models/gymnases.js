module.exports = (mongoose) => {
  const Gymnases = mongoose.model(
    "gymnases",
    mongoose.Schema({
      IdGymnase: { type: Number, required: true },
      NomGymnase: { type: String, required: true },
      Adresse: { type: String, required: true },
      Ville: { type: String, required: true },
      Surface: { type: Number, required: true },
      Seances: [
        {
          IdSportifEntraineur: { type: Number, required: false },
          Jour: { type: String, required: false },
          Horaire: { type: Number, required: false },
          Duree: { type: Number, required: false },
          Libelle: { type: String, required: false },
        },
      ],
    })
  );
  return Gymnases;
};
