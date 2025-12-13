'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: Sequelize.STRING,
      apellido1: Sequelize.STRING,
      apellido2: Sequelize.STRING,
      email: Sequelize.STRING,
      nick: Sequelize.STRING,
      pass: Sequelize.STRING
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario');
  }
};
