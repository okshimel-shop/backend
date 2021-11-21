'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subcategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      descriptions: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      keywords: {
        allowNull: false,
        type: Sequelize.STRING
      },
      images: {
        allowNull: false,
        defaultValue: [],
        type: Sequelize.JSON
      },
      views: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      allviews: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};
