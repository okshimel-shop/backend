module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('Product', {
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
    size: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    material: {
      allowNull: false,
      type: Sequelize.STRING
    },
    color: {
      allowNull: false,
      type: Sequelize.STRING
    },
    age: {
      allowNull: false,
      type: Sequelize.STRING
    },
    gender: {
      allowNull: false,
      type: Sequelize.STRING
    },
    descriptions: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    keywords: {
      allowNull: false,
      type: Sequelize.STRING
    },
    video: {
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