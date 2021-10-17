module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    subcategoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    price: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    amount: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    descriptions: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    keywords: {
      allowNull: false,
      type: DataTypes.STRING
    },
    images: {
      allowNull: false,
      defaultValue: [],
      type: DataTypes.JSON
    },
    views: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    allviews: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
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
  Product.associate = function(models) {
    this.belongsTo(models.Subcategory, { foreignKey: 'subcategoryId', as: 'subcategory' })

    this.addScope('withAssociatedData', {
      include: {
        model: models.Subcategory,
        as: "subcategory",
        include: {
          model: models.Category,
          as: "category",
          include: {
            model: models.Type,
            as: "type"
          }
        }
      },
    })
  }
  return Product
}