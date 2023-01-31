'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applicants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pmb: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      idPresenter: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      officer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      knowLP3I: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      interestLP3I: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      planning: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      placeOfBirth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      idSchool: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      class: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      major: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      achievement: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      schoolarship: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fatherName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fatherProfession: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      motherName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      motherProfession: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      parentContact: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      incomeParent: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      impression: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Applicants');
  }
};