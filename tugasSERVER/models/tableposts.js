'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TablePosts extends Model {
    static associate(models) {
      // Relasi: Post milik 1 User
      TablePosts.belongsTo(models.TableUsers, { foreignKey: 'userId' });
    }
  }

  TablePosts.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'TablePosts',
      tableName: 'tableposts'
    }
  );

  return TablePosts;
};
