'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Applicants', [
      {
        pmb: '2021/2022',
        idPresenter: 1,
        officer: "Asep Manarul",
        knowLP3I: true,
        interestLP3I: true,
        planning: "Lorem",
        fullName: "Rigai Kamaludin",
        placeOfBirth: "Tasikmalaya",
        dateOfBirth: "2000-01-26",
        idSchool: 1,
        class: "12",
        major: "IPA 2",
        achievement: "Ranking bro!",
        schoolarship: false,
        contact: "081222333444",
        address: "Jl. Konoha Kec. Mangkubumi Kota Tasikmalaya",
        fatherName: "Endang Somantri",
        fatherProfession: 1,
        motherName: "Neng Siska",
        motherProfession: 2,
        parentContact: "081555666777",
        incomeParent: 2000000,
        impression: "Euah!",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Applicants', null, {});
  }
};
