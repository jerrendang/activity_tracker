'use strict';
const {Op} = require('sequelize');

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
   await queryInterface.bulkInsert('Exercise_records', [
    {
      exercise_id: 1,
      exercise_name: 'Barbell Press',
      activity_id: 1,
      user_record_id: 1,
      user_id: 1,
      reps: 7,
      sets: 4,
    },
     {
       exercise_id: 1,
       exercise_name: 'Barbell Press',
       activity_id: 1,
       user_record_id: 1,
       user_id: 1,
       reps: 7,
       sets: 4,
     },
     {
       exercise_id: 1,
       exercise_name: 'Barbell Press',
       activity_id: 1,
       user_record_id: 1,
       user_id: 1,
       reps: 7,
       sets: 4,
     },
     {
       exercise_id: 1,
       exercise_name: 'Barbell Press',
       activity_id: 1,
       user_record_id: 1,
       user_id: 1,
       reps: 7,
       sets: 4,
     },
     {
       exercise_id: 2,
       exercise_name: 'Dumbell Flies',
       activity_id: 1,
       user_record_id: 1,
       user_id: 1,
       reps: 10,
       sets: 4,
     },
     {
       exercise_id: 3,
       exercise_name: 'Machine Flies',
       activity_id: 1,
       user_record_id: 1,
       user_id: 1,
       reps: 10,
       sets: 4,
     },
     {
       exercise_id: 4,
       exercise_name: 'Machine Press',
       activity_id: 1,
       user_record_id: 1,
       user_id: 1,
       reps: 10.5,
       sets: 4,
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
    await queryInterface.bulkDelete('Exercise_records', {
      id: {
        [Op.in]: [1,2,3,4]
      }
    })
  }
};
