const express = require("express");
const router = express.Router();

const PetController = require("../controllers/PetController");

router.post("/pet/:tutorId", PetController.postPet);
router.put("/pet/:petId/tutor/:tutorId", PetController.putPet);
router.delete("/pet/:petId/tutor/:tutorId", PetController.deletePet);

module.exports = router;
