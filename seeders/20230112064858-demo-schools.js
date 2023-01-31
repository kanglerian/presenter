'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Schools', [
      {
        name: 'SMKN 2 Tasikmalaya',
        teacher: 'Mang Endang',
        address: 'Jl. Konoha RT.05 RW.16 Tasikmalaya',
        contact: '081285444333',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'SMKN 3 Tasikmalaya',
        teacher: 'Mang Entis',
        address: 'Jl. Gunung Elang RT.05 RW.16 Bandung',
        contact: '085212444333',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schools', null, {});
  }
};
