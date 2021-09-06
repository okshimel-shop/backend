const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.config')

exports.Category = sequelize.define('Category', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING
  },
  directory: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
}, {
  // Other model options go here
});