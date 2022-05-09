'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CategorySettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategorySettings.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name must not be empty' },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Title is required' },
          notEmpty: { msg: 'Title must not be empty' },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Description is required' },
          notEmpty: { msg: 'Description must not be empty' },
        },
      },
      seo_title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'SEO Title is required' },
          notEmpty: { msg: 'SEO Title must not be empty' },
        },
      },
      seo_description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'SEO Description is required' },
          notEmpty: { msg: 'SEO Description must not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'category-settings',
      modelName: 'CategorySettings',
    }
  )
  return CategorySettings
}
