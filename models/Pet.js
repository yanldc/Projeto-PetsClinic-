const {DataTypes} = require('sequelize')
const db = require('../db/connection')
const Tutor = require('./Tutor')

const Pet = db.define('Pet', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    species:{
        type: DataTypes.STRING,
        allowNull: false
    },
    carry:{
        type: DataTypes.STRING,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dateOfBirth:{
        type: DataTypes.STRING,
        allowNull: true
    },
})

module.exports = Pet