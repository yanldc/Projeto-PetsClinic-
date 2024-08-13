const Tutor = require("../models/Tutor");
const Pet = require("../models/Pet");

module.exports = class PetController {
  static async postPet(req, res) {
    const tutorId = req.params.tutorId;
    console.log;
    const name = req.body.name;
    const species = req.body.species;
    const carry = req.body.carry;
    const weight = req.body.weight;
    const date_of_birth = req.body.date_of_birth;

    await Pet.create({
      name,
      species,
      carry,
      weight,
      date_of_birth,
      TutorId: tutorId,
    });

    res.status(201);
    res.json(Pet);
  }

  static async putPet(req, res) {
    const tutorId = req.params.tutorId;
    const petId = req.params.petId;
    const name = req.body.name;
    const species = req.body.species;
    const carry = req.body.carry;
    const weight = req.body.weight;
    const date_of_birth = req.body.date_of_birth;

    const userData = {
      name,
      species,
      carry,
      weight,
      date_of_birth,
    };

    const pet = await Pet.findOne({ where: { id: petId, TutorId: tutorId } });
    if (!pet) {
      res.status(404);
      res.json("Pet not found");
    } else {
      await Pet.update(userData, { where: { id: petId, TutorId: tutorId } });
      res.status(202);
      res.json(Pet);
    }
  }

  static async deletePet(req, res) {
    const tutorId = req.params.tutorId;
    const petId = req.params.petId;

    const pet = await Pet.findOne({ where: { id: petId, TutorId: tutorId } });
    if (!pet) {
      res.status(404);
      res.json("Pet not found");
    } else {
      await Pet.destroy({ where: { id: petId, TutorId: tutorId } });

      res.status(204);
      res.json("status code 204");
    }
  }
};
