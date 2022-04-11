'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class GeneralSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GeneralSettings.init(
    {
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Logo is required' },
          notEmpty: { msg: 'Logo must not be empty' },
        },
      },
      favicon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Favicon is required' },
          notEmpty: { msg: 'Favicon must not be empty' },
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
      tableName: 'general-settings',
      modelName: 'GeneralSettings',
    }
  )
  return GeneralSettings
}
