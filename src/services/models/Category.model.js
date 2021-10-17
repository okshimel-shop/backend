module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    typeId: {
      allowNull: false,
      type: DataTypes.INTEGER 
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dirTag: {
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
  }, {})
  Category.associate = function(models) {
    this.belongsTo(models.Type, { foreignKey: 'typeId', as: "type" })
    this.hasMany(models.Subcategory, { foreignKey: 'categoryId', as: "subcategories" })
  }
  return Category
}