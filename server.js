const express = require("express");
const mongoose = require("mongoose");
const rankingRoutes = require("./routes/rankingRoutes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// Connexion à la base de données MongoDB
mongoose.connect("mongodb://localhost/secret_story", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("Connecté à MongoDB");
});

// Middleware pour gérer les requêtes POST JSON
app.use(express.json());

// Utilisez CORS pour permettre les requêtes depuis localhost:3000
app.use(cors());

// Utilisez les routes API avec le préfixe '/api'
app.use("/api", rankingRoutes);

// Route pour l'URL racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur la page d'accueil de mon application.");
});

// Définissez d'autres routes et fonctionnalités Express.js ici

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
