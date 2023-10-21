const mongoose = require("mongoose");

// Définissez un schéma pour les données de classement
const rankingSchema = new mongoose.Schema({
  name: String,
  secret: String,
  cagnotte: Number,
  find: Number,
  show: Number,
});

// Créez un modèle à partir du schéma
const Ranking = mongoose.model("Ranking", rankingSchema);

module.exports = Ranking;
