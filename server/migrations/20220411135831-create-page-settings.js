'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('page-settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      pageName: {
        type: DataTypes.STRING
      },
      pageDescription: {
        type: DataTypes.STRING
      },
      seoTitle: {
        type: DataTypes.STRING
      },
      seoDescription: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('page-settings');
  }
};