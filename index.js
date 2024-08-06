const express = require('express')
const con = require('./db/connection')

const Tutor = require('./models/Tutor')
const Pet = require('./models/Pet')

const app = express()

app.use(express.json())

app.post('/tutors', async(req, res) => {
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email
    const date_of_birth = req.body.date_of_birth
    const zip_code = req.body.zip_code

    await Tutor.create({name, phone, email, date_of_birth, zip_code })

    res.json(Tutor)
})

app.get('/tutors', async(req, res) => {
    const name = req.query.name
    const phone = req.query.phone
    const email = req.query.email
    const date_of_birth = req.query.date_of_birth
    const zip_code = req.query.zip_code

    const tutors = await Tutor.findAll( {attributes: ['id','name','phone','email','date_of_birth','zip_code']})

    res.json(tutors)
})

app.put('/tutors/:id', async (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email
    const date_of_birth = req.body.date_of_birth
    const zip_code = req.body.zip_code

    const userData = {
        id,
        name,
        phone,
        email,
        date_of_birth,
        zip_code
    }

    await Tutor.update(userData, {where: {id: id}})
    res.json(Tutor)
})

con.sync()
   .then(() => {app.listen(3000)} )