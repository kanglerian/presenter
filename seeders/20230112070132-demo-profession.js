'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Professions', [
      {
        name: 'PNS',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'BUMN',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Nelayan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Professions', null, {});
  }
};
