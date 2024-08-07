const express = require("express");
const con = require("./db/connection");

const Tutor = require("./models/Tutor");
const Pet = require("./models/Pet");

const app = express();

app.use(express.json());

/* TUTORES */

app.get("/tutors", async (req, res) => {
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

  res.json(result);
});


app.post("/tutors", async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const date_of_birth = req.body.date_of_birth;
  const zip_code = req.body.zip_code;

  await Tutor.create({ name, phone, email, date_of_birth, zip_code });

  res.json(Tutor);
});


app.put("/tutor/:id", async (req, res) => {
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

  await Tutor.update(userData, { where: { id: id } });
  res.json(Tutor);
});


app.delete("/tutor/:id", async (req, res) => {
  const id = req.params.id;

    await Pet.destroy({ where: { TutorId: id } });
    await Tutor.destroy({ where: { id: id } });

});

/* PETS */

app.get("/pets", async (req, res) => {
  const name = req.query.name;
  const species = req.query.species;
  const carry = req.query.carry;
  const weight = req.query.weight;
  const date_of_birth = req.query.date_of_birth;

  const pet = await Pet.findAll({
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

  res.json(pet);
});


app.post("/pet/:tutorId", async (req, res) => {
  const tutorId = req.params.tutorId;
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

  res.json(Pet);
});


app.put("/pet/:petId/tutor/:tutorId", async (req, res) => {
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

  await Pet.update(userData, { where: { id: petId, TutorId: tutorId } });
  res.json(Pet);
});


app.delete("/pet/:petId/tutor/:tutorId", async (req, res) => {
  const tutorId = req.params.tutorId;
  const petId = req.params.petId;

  await Pet.destroy({ where: { id: petId, TutorId: tutorId } });

  res.json("status code 204");
});

con
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
