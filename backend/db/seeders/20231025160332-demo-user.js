'use strict';
const bcrypt = require('bcryptjs');

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
   await queryInterface.bulkInsert('Users', [
    {
      username: 'Jayjay',
      email: 'jj@gmail.com',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      username: 'poopoo',
      email: 'poopoo@gmail.com',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      username: 'AnotherUser',
      email: 'user@gmail.com',
      hashedPassword: bcrypt.hashSync('fakePassword')
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Jayjay', 'poopoo', 'AnotherUser']},
    }, {});
  }
};
