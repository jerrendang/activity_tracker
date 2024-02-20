'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Exercises', [
      {
        name: 'Barbell Press',
        activity_id: 1,
      },
      {
        name: 'Dumbell Flies',
        activity_id: 1,
      },
      {
        name: 'Machine Flies',
        activity_id: 1,
      },
      {
        name: 'Machine Press',
        activity_id: 1,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Exercises', {
      activity_id: 1
    })
  }
};
