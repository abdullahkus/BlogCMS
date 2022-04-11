'use strict'
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('blog-settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keywords: {
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
    await queryInterface.dropTable('blog-settings')
  },
}
