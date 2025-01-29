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
    const staffSnapshot = await getDocs(collection(firestoreDb, "staff"));
    const staffMembers = staffSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(staffMembers);
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ error: "Failed to fetch staff" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name = "", salary = 0, department = "", jobTitle = "" } = req.body;

    const newStaffMember = {
      name,
      salary,
      department,
      jobTitle,
    };

    const docRef = await addDoc(
      collection(firestoreDb, "staff"),
      newStaffMember
    );
    res
      .status(201)
      .json({ message: "Staff member added successfully", id: docRef.id });
  } catch (error) {
    console.error("Error adding staff member:", error);
    res.status(500).json({ error: "Failed to add staff member" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const staffId = req.params.id;
    const docRef = doc(firestoreDb, "staff", staffId);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    res.status(200).json({ id: docSnapshot.id, ...docSnapshot.data() });
  } catch (error) {
    console.error("Error fetching staff member:", error);
    res.status(500).json({ error: "Failed to fetch staff member" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const staffId = req.params.id;
    const updates = req.body;
    const docRef = doc(firestoreDb, "staff", staffId);
    await updateDoc(docRef, updates);
    res.status(200).json({ message: "Staff member updated successfully" });
  } catch (error) {
    console.error("Error updating staff member:", error);
    res.status(500).json({ error: "Failed to update staff member" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const staffId = req.params.id;
    const docRef = doc(firestoreDb, "staff", staffId);
    await deleteDoc(docRef);
    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff member:", error);
    res.status(500).json({ error: "Failed to delete staff member" });
  }
});

module.exports = router;
