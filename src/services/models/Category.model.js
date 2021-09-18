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
  }, {})
  Category.associate = function(models) {
    this.belongsTo(models.Category, { foreignKey: 'id' })
  }
  return Category
}