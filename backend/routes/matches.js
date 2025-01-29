const express = require("express");
const {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
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

router.post("/", async (req, res) => {
  try {
    const { team1, team2, date, location } = req.body;
    const newMatch = { team1, team2, date, location, status: "scheduled" };
    const docRef = await addDoc(collection(firestoreDb, "matches"), newMatch);
    res
      .status(201)
      .json({ message: "Match added successfully", id: docRef.id });
  } catch (error) {
    console.error("Error adding match:", error);
    res.status(500).json({ error: "Failed to add match" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const matchId = req.params.id;
    const docRef = doc(firestoreDb, "matches", matchId);
    const matchSnapshot = await getDoc(docRef);

    if (!matchSnapshot.exists()) {
      return res.status(404).json({ error: "Match not found" });
    }

    res.status(200).json({ id: matchSnapshot.id, ...matchSnapshot.data() });
  } catch (error) {
    console.error("Error fetching match:", error);
    res.status(500).json({ error: "Failed to fetch match" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const matchId = req.params.id;
    const updates = req.body;
    const docRef = doc(firestoreDb, "matches", matchId);
    await updateDoc(docRef, updates);
    res.status(200).json({ message: "Match updated successfully" });
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({ error: "Failed to update match" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const matchId = req.params.id;
    const docRef = doc(firestoreDb, "matches", matchId);
    await deleteDoc(docRef);
    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    console.error("Error deleting match:", error);
    res.status(500).json({ error: "Failed to delete match" });
  }
});

module.exports = router;
