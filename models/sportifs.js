module.exports = (mongoose) => {
  const Sportifs = mongoose.model(
    "sportifs",
    mongoose.Schema({
      IdSportif: { type: Number, required: true },
      Nom: { type: String, required: true },
      Prenom: { type: String, required: true },
      Sexe: { type: String, required: true },
      Age: { type: Number, required: true },
      Sports: {
        Jouer: [],
        Arbitrer: [],
        Entrainer: [],
      },
    })
  );
  return Sportifs;
};
