module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
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
    dirTag: {
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
    }
  }, {})
    Type.associate = function(models) {
      this.hasMany(models.Category, { foreignKey: 'typeId', as: "categories" })

      this.addScope('withAssociatedData', {
        include: {
          model: models.Category,
          as: "categories",
          include: {
            model: models.Subcategory,
            as: "subcategories",
            include: {
              model: models.Product,
              as: "products",
              attributes: ['id'],
            },
          }
        },
      })
  }
  return Type
}