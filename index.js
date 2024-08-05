const express = require('express')
const con = require('./db/connection')

const Tutor = require('./models/Tutor')
const Pet = require('./models/Pet')

application.use(express.json())