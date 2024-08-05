const {Sequelize } = require('sequelize')
const sequelize = new Sequelize('petsclinic', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = sequelize