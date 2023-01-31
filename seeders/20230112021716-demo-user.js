'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'Nurul Ahyar',
        email: 'ahyar@gmail.com',
        password: 'ahyar123',
        role: 0,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        fullName: 'Benny',
        email: 'benny@gmail.com',
        password: 'benny123',
        role: 0,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        fullName: 'Galih',
        email: 'galih@gmail.com',
        password: 'galih123',
        role: 0,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
