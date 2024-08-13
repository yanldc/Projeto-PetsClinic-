const Tutor = require("../models/Tutor");
const Pet = require("../models/Pet");

module.exports = class TutorController {
  static async getTutors(req, res) {
    const id = req.query.id;
    const phone = req.query.phone;
    const email = req.query.email;
    const date_of_birth = req.query.date_of_birth;
    const zip_code = req.query.zip_code;

    const tutors = await Tutor.findAll({
      attributes: ["id", "name", "phone", "email", "date_of_birth", "zip_code"],
    });

    const pets = await Pet.findAll({
      attributes: [
        "id",
        "name",
        "species",
        "carry",
        "date_of_birth",
        "weight",
        "TutorId",
      ],
    });

    const result = tutors.map((tutor) => ({
      tutor,
      pets: pets.filter((pet) => pet.TutorId === tutor.id),
    }));

    res.status(200);
    res.json(result);
  }

  static async postTutor(req, res) {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const date_of_birth = req.body.date_of_birth;
    const zip_code = req.body.zip_code;

    await Tutor.create({ name, phone, email, date_of_birth, zip_code });

    res.status(201);
    res.json(Tutor);
  }

  static async putTutor(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const date_of_birth = req.body.date_of_birth;
    const zip_code = req.body.zip_code;

    const userData = {
      id,
      name,
      phone,
      email,
      date_of_birth,
      zip_code,
    };

    const tutor = await Tutor.findOne({ where: { id } });
    if (!tutor) {
      res.status(404);
      res.json("Tutor not found");
    } else {
      await Tutor.update(userData, { where: { id: id } });
      res.status(202);
      res.json(Tutor);
    }
  }

  static async deleteTutor(req, res) {
    const id = req.params.id;

    const tutor = await Tutor.findOne({ where: { id } });
    if (!tutor) {
      res.status(404);
      res.json("Tutor not found");
    } else {
      await Pet.destroy({ where: { TutorId: id } });
      await Tutor.destroy({ where: { id: id } });

      res.status(204);
      res.json("status code 204");
    }
  }
};
