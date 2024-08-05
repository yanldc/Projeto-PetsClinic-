const {DataTypes} = require('sequelize')
const db = require('../db/connection')

const Tutor = db.define('Tutor', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dateOfBirth:{
        type: DataTypes.STRING,
        allowNull: false
    },
    zipCode:{
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Tutor