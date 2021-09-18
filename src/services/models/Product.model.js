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
    category: {
      allowNull: false,
      type: DataTypes.STRING
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
  Product.associate = function(_models) {
  // associations can be defined here
  }
  return Product
}