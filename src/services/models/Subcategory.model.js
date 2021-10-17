module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define('Subcategory', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    categoryId: {
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
  Subcategory.associate = function(models) {
    this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' })
    this.hasMany(models.Product, { foreignKey: 'subcategoryId', as: "products" })
  }
  return Subcategory
}