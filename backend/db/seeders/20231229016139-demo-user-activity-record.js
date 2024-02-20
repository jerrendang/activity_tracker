'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('User_activities', [
      {
        title: 1,
        user_id: 1,
        activity_id: 1,
        activity_name: 'Chest'
      },
      {
        title: 2,
        user_id: 1,
        activity_id: 1,
        activity_name: 'Chest'
      },
      {
        title: 3,
        user_id: 1,
        activity_id: 1,
        activity_name: 'Chest'
      },
      {
        title: 4,
        user_id: 1,
        activity_id: 1,
        activity_name: 'Chest'
      },
      {
        title: 5,
        user_id: 1,
        activity_id: 1,
        activity_name: 'Chest'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User_activities', {
      id: 1
    })
  }
};
