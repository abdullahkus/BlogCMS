'use strict'
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('general-settings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      favicon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seo_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seo_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('general-settings')
  },
}
