'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SocialMedia', [
      {
        name: 'Instagram',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Tiktok',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    Example:
    await queryInterface.bulkDelete('SocialMedia', null, {});

  }
};
