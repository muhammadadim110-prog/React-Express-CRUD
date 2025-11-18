'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'categoryId'
      });
    }
  }

  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,      // Updated to support large values
    stock: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });

  return Product;
};
