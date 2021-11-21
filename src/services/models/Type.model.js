module.exports = (sequelize, Sequelize) => {
  const Type = sequelize.define('Type', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      unique: true,
      allowNull: false,
      type: Sequelize.STRING
    },
    dirTag: {
      unique: true,
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