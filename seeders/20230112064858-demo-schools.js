'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Schools', [
      {
        name: 'SMKN 2 Tasikmalaya',
        teacher: 'Mang Endang',
        address: 'Jl. Konoha RT.05 RW.16 Tasikmalaya',
        contact: '6281285444333',
        status: true,
        createdAt: '2022-12-1',
        updatedAt: '2022-12-1'
      },{
        name: 'SMKN 3 Tasikmalaya',
        teacher: 'Mang Entis',
        address: 'Jl. Gunung Elang RT.05 RW.16 Bandung',
        contact: '6285212444333',
        status: true,
        createdAt: '2022-12-3',
        updatedAt: '2022-12-1'
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schools', null, {});
  }
};
