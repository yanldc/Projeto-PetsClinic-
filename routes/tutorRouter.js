const express = require("express");
const router = express.Router();

const TutorController = require("../controllers/TutorController");

router.get("/tutors", TutorController.getTutors);
router.post("/tutors", TutorController.postTutor);
router.put("/tutor/:id", TutorController.putTutor);
router.delete("/tutor/:id", TutorController.deleteTutor);

module.exports = router;
