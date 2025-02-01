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
const opponentTeamMock = require("../utils/opponentTeamMock");

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
    const { season, date, ownTeam } = req.body;

    if (!season || !date || !ownTeam) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const newMatch = {
      season,
      date,
      ownTeam,
      opponentTeam: "Real Madrid",
      status: "scheduled",
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
    const { season, date, ownTeam, ownTeamPlayers } = req.body;

    if (!season || !date || !ownTeam || !ownTeamPlayers) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const newMatch = {
      season,
      date,
      ownTeam,
      ownTeamPlayers,
      opponentTeam: opponentTeamMock,
      status: "ready",
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
    console.log(opponentTeamMock);
    const {
      season,
      date,
      ownTeam,
      ownTeamPlayers,
      goals_own_team,
      goals_opponent_team,
      events,
    } = req.body;

    if (
      !season ||
      !date ||
      !ownTeam ||
      !ownTeamPlayers ||
      goals_own_team === undefined ||
      goals_opponent_team === undefined ||
      !events
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const newMatch = {
      season,
      date,
      ownTeam,
      ownTeamPlayers,
      opponentTeam: opponentTeamMock,
      goals_own_team,
      goals_opponent_team,
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
