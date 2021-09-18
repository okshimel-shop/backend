const Sequelize = require('sequelize')
const { sequelize } = require('../../db/config')
const models = require('../../db')

const db = { sequelize, Sequelize, ...models }

module.exports = db