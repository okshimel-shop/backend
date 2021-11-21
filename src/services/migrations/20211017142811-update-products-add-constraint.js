'use strict'

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return [
      await queryInterface.addConstraint("Products", {
        type: 'foreign key',
        fields: ['subcategoryId'],
        name: 'subcategoryId',
        references: {
          table: "Subcategories",
          field: 'id',
        },
      }),
    ]
  },

  down: async (queryInterface, _Sequelize) => {
    return [
      await queryInterface.removeConstraint("Products", 'subcategoryId'),
    ]
  },
}