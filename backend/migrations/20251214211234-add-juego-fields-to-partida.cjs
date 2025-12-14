'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('partida', 'eleccionCreador', {
      type: Sequelize.ENUM('piedra', 'papel', 'tijeras'),
      allowNull: true,
    });
    await queryInterface.addColumn('partida', 'eleccionRival', {
      type: Sequelize.ENUM('piedra', 'papel', 'tijeras'),
      allowNull: true,
    });
    await queryInterface.addColumn('partida', 'victoriasCreador', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.addColumn('partida', 'victoriasRival', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('partida', 'eleccionCreador');
    await queryInterface.removeColumn('partida', 'eleccionRival');
    await queryInterface.removeColumn('partida', 'victoriasCreador');
    await queryInterface.removeColumn('partida', 'victoriasRival');
  }
};
