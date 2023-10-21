// api.js

const express = require("express");
const router = express.Router();
const Ranking = require("../models/ranking");

// Route pour gérer les nominations
router.post("/nominate", async (req, res) => {
  try {
    const { nominant, nominee, secret } = req.body;

    // Votre logique de vérification de la nomination et du secret ici
    // Exemple : vérifier si le secret correspond au secret de nomine
    const nomineRanking = await Ranking.findOne({ nom: nominee });

    if (nomineRanking) {
      // Vérification du secret
      if (nomineRanking.secret === secret) {
        console.log(nomineRanking);
        // Mettez à jour la cagnotte du nominant et de nomine selon les règles du jeu
        const nominantRanking = await Ranking.findOne({ nom: nominant });

        nominantRanking.cagnotte += 5000;

        // Soustrayez 5000 de la cagnotte du nominé
        nomineRanking.cagnotte -= 5000;
        nomineRanking.find = 1;
        nomineRanking.show = 1;

        // Vérifiez si la cagnotte du nominé est devenue négative
        if (nomineRanking.cagnotte < 0) {
          nomineRanking.cagnotte = 0; // Réglez la cagnotte à 0 si elle est devenue négative
        }

        await nominantRanking.save();
        await nomineRanking.save();

        res.json({ message: "Nomination réussie" });
      } else {
        res.status(500).json({ error: "Le secret ne correspond pas" });
      }
    } else {
      res.status(500).json({ error: "Aucun nomine trouvé avec ce nom" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la nomination." });
  }
});

// Obtenez le classement
router.get("/rankings", async (req, res) => {
  try {
    const rankings = await Ranking.find().sort({ cagnotte: -1 });

    res.json(rankings);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du classement." });
  }
});

// Définissez d'autres routes API ici

module.exports = router;
