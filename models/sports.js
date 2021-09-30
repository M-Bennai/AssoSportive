module.exports = (mongoose) => {
  const Sports = mongoose.model(
    "Sports",
    mongoose.Schema({
      Sports: {
        Jouer: [{ type: String, required: false }],
        Arbitrer: [{ type: String, required: false }],
        Entrainer: [{ type: String, required: false }],
      },
    })
  );
  return Sports;
};
