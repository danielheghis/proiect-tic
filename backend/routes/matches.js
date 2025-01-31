const express = require("express");
const {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");
const { getFirestoreDb } = require("../firebase/firebase");

const router = express.Router();
const firestoreDb = getFirestoreDb();

router.get("/", async (req, res) => {
  try {
    const matchesSnapshot = await getDocs(collection(firestoreDb, "matches"));
    const matches = matchesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

router.post("/scheduled", async (req, res) => {
  try {
    const { season, date, home_team, away_team, isHomeTeam } = req.body;

    if (
      !season ||
      !date ||
      !home_team ||
      !away_team ||
      isHomeTeam === undefined
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const newMatch = {
      season,
      date,
      home_team,
      away_team,
      home_team_players: { first_eleven: [], bench: [] },
      away_team_players: { first_eleven: [], bench: [] },
      status: "scheduled",
      isHomeTeam,
    };

    const docRef = await addDoc(collection(firestoreDb, "matches"), newMatch);
    res
      .status(201)
      .json({ message: "Scheduled match created successfully", id: docRef.id });
  } catch (error) {
    console.error("Error creating scheduled match:", error);
    res.status(500).json({ error: "Failed to create scheduled match" });
  }
});

router.post("/ready", async (req, res) => {
  try {
    const {
      season,
      date,
      home_team,
      away_team,
      home_team_players,
      away_team_players,
      isHomeTeam,
    } = req.body;

    if (
      !season ||
      !date ||
      !home_team ||
      !away_team ||
      !home_team_players ||
      !away_team_players ||
      !isHomeTeam
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const newMatch = {
      season,
      date,
      home_team,
      away_team,
      home_team_players,
      away_team_players,
      status: "ready",
      isHomeTeam,
    };

    const docRef = await addDoc(collection(firestoreDb, "matches"), newMatch);
    res
      .status(201)
      .json({ message: "Ready match created successfully", id: docRef.id });
  } catch (error) {
    console.error("Error creating ready match:", error);
    res.status(500).json({ error: "Failed to create ready match" });
  }
});

router.post("/finished", async (req, res) => {
  try {
    const {
      season,
      date,
      home_team,
      away_team,
      home_team_players,
      away_team_players,
      goals_home_team,
      goals_away_team,
      events,
    } = req.body;

    if (
      !season ||
      !date ||
      !home_team ||
      !away_team ||
      !home_team_players ||
      !away_team_players ||
      goals_home_team === undefined ||
      goals_away_team === undefined ||
      !events
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const newMatch = {
      season,
      date,
      home_team,
      away_team,
      home_team_players,
      away_team_players,
      goals_home_team,
      goals_away_team,
      events,
      status: "finished",
    };

    const docRef = await addDoc(collection(firestoreDb, "matches"), newMatch);
    res
      .status(201)
      .json({ message: "Finished match created successfully", id: docRef.id });
  } catch (error) {
    console.error("Error creating finished match:", error);
    res.status(500).json({ error: "Failed to create finished match" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const matchId = req.params.id;
    const updates = req.body;

    const matchRef = doc(firestoreDb, "matches", matchId);
    await updateDoc(matchRef, updates);

    res.status(200).json({ message: "Match updated successfully" });
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({ error: "Failed to update match" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const matchId = req.params.id;

    const matchRef = doc(firestoreDb, "matches", matchId);
    await deleteDoc(matchRef);

    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    console.error("Error deleting match:", error);
    res.status(500).json({ error: "Failed to delete match" });
  }
});

module.exports = router;
