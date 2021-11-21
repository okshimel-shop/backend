'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn("Products", 'size', {
        type: Sequelize.INTEGER,
        after: 'amount',
      }),
      await queryInterface.addColumn("Products", 'material', {
        type: Sequelize.STRING,
        after: 'size',
      }),
      await queryInterface.addColumn("Products", 'color', {
        type: Sequelize.STRING,
        after: 'material',
      }),
      await queryInterface.addColumn("Products", 'age', {
        type: Sequelize.STRING,
        after: 'color',
      }),
      await queryInterface.addColumn("Products", 'gender', {
        type: Sequelize.STRING,
        after: 'age',
      }),
      await queryInterface.addColumn("Products", 'video', {
        type: Sequelize.STRING,
        after: 'keywords',
      }),
    ]
  },

  down: async (queryInterface, _Sequelize) => {
    return [
      await queryInterface.removeColumn("Products", 'video'),
      await queryInterface.removeColumn("Products", 'gender'),
      await queryInterface.removeColumn("Products", 'age'),
      await queryInterface.removeColumn("Products", 'color'),
      await queryInterface.removeColumn("Products", 'material'),
      await queryInterface.removeColumn("Products", 'size'),
    ]
  },
}