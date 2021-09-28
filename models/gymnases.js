module.exports = (mongoose) => {
  const Gymnases = mongoose.model(
    "gymnases",
    mongoose.Schema({
      IdGymnase: Number,
      NomGymnase: String,
      Adresse: String,
      Ville: String,
      Surface: Number,
      Seances: [
        {
          IdSportifEntraineur: Number,
          Jour: String,
          Horaire: Number,
          Duree: Number,
          Libelle: String,
        },
      ],
    })
  );
  return Gymnases;
};
