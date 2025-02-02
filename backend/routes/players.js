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
    const playersSnapshot = await getDocs(collection(firestoreDb, "players"));
    const players = playersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name = "",
      salary = 0,
      position = "",
      age = 0,
      joiningYear = new Date().getFullYear(),
      seasonStats = {},
      isInjured = {
        injuryDetails: { status: false },
      },
      yellowCards = 0,
      hasRedCard = false,
    } = req.body;

    const newPlayer = {
      name,
      salary,
      position,
      age,
      joiningYear,
      seasonStats,
      isInjured,
      yellowCards,
      hasRedCard,
    };

    const docRef = await addDoc(collection(firestoreDb, "players"), newPlayer);
    res
      .status(201)
      .json({ message: "Player added successfully", id: docRef.id });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ error: "Failed to add player" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const playerId = req.params.id;
    const docRef = doc(firestoreDb, "players", playerId);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.status(200).json({ id: docSnapshot.id, ...docSnapshot.data() });
  } catch (error) {
    console.error("Error fetching player:", error);
    res.status(500).json({ error: "Failed to fetch player" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const playerId = req.params.id;
    const updates = req.body;
    const docRef = doc(firestoreDb, "players", playerId);
    await updateDoc(docRef, updates);
    res.status(200).json({ message: "Player updated successfully" });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ error: "Failed to update player" });
  }
});

router.delete("/deletePlayer/:id", async (req, res) => {
  try {
    const playerId = req.params.id;
    const docRef = doc(firestoreDb, "players", playerId);
    await deleteDoc(docRef);
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ error: "Failed to delete player" });
  }
});

router.get("/eligible-players", async (req, res) => {
  try {
    const playersSnapshot = await getDocs(collection(firestoreDb, "players"));

    const eligiblePlayers = playersSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (player) =>
          !(player.isInjured && player.isInjured.status) &&
          player.yellowCards < 5 &&
          !player.hasRedCard
      );

    res.status(200).json(eligiblePlayers);
  } catch (error) {
    console.error("Error fetching eligible players:", error);
    res.status(500).json({ error: "Failed to fetch eligible players" });
  }
});

router.post("/signPlayer", async (req, res) => {
  try {
    const { name, age, position, salary, profileImage } = req.body;

    const currentYear = new Date().getFullYear();

    const newPlayer = {
      name,
      age,
      position,
      salary,
      profileImage: profileImage || "",
      isInjured: {
        injuryDetails: {
          status: false,
          type: "",
          estimatedUntil: "",
        },
      },
      yellowCards: 0,
      redCards: 0,
      joiningYear: currentYear,
      seasonStats: {
        "2024-2025": {
          matchesPlayed: 0,
          goals: 0,
          assists: 0,
        },
      },
    };

    const docRef = await addDoc(collection(firestoreDb, "players"), newPlayer);

    res.status(201).json({
      message: "Player signed successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Error signing player:", error);
    res.status(500).json({ error: "Failed to sign player" });
  }
});

module.exports = router;
