'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlogSettings.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    keywords: DataTypes.STRING,
    seo_title: DataTypes.STRING,
    seo_description: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'blog-settings',
    modelName: 'BlogSettings',
  });
  return BlogSettings;
};