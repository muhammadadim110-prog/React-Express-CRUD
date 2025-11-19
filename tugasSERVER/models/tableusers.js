'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TableUsers extends Model {
    static associate(models) {
      // Relasi: 1 User -> banyak Post
      TableUsers.hasMany(models.TablePosts, { foreignKey: 'userId' });
    }
  }

  TableUsers.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'TableUsers',
      tableName: 'tableusers'
    }
  );

  return TableUsers;
};
