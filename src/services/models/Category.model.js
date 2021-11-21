module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    typeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
          model: {
            tableName: 'Types',
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
  Category.associate = function(models) {
    this.belongsTo(models.Type, { foreignKey: 'typeId', as: "type" })
    this.hasMany(models.Subcategory, { foreignKey: 'categoryId', as: "subcategories" })
  }
  return Category
}