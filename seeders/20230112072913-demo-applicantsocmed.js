'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('ApplicantSocmeds', [
      {
        idApplicant: 1,
        idSocmed: 1,
        username: '@anu',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        idApplicant: 1,
        idSocmed: 2,
        username: '@anuoge',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ApplicantSocmeds', null, {});
  }
};
