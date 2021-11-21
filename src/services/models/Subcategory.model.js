module.exports = (sequelize, Sequelize) => {
  const Subcategory = sequelize.define('Subcategory', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    categoryId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
          model: {
            tableName: 'Categories',
          },
          key: 'id'
        },
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    dirTag: {
      allowNull: false,
      type: Sequelize.STRING 
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {})
  Subcategory.associate = function(models) {
    this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' })
    this.hasMany(models.Product, { foreignKey: 'subcategoryId', as: "products" })
  }
  return Subcategory
}