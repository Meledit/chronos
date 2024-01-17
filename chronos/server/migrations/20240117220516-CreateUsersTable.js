'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UTILISATEUR', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      mdp: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER
      },
      premiereConnexion: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.removeColumn('PROFESSEUR', 'premiereConnexion');
    await queryInterface.removeColumn('ELEVE', 'premiereConnexion');
    await queryInterface.removeColumn('SECRETAIRE', 'premiereConnexion');

    await queryInterface.addColumn(
      'PROFESSEUR', // table name
      'utilisateurId', // new field name
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'UTILISATEUR',
          key: 'id',
        },
      },
    );

    await queryInterface.addColumn(
      'ELEVE', // table name
      'utilisateurId', // new field name
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'UTILISATEUR',
          key: 'id',
        },
      },
    );

    await queryInterface.addColumn(
      'SECRETAIRE', // table name
      'utilisateurId', // new field name
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'UTILISATEUR',
          key: 'id',
        },
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UTILISATEURS');
    
    await queryInterface.addColumn(
      'ELEVE', // table name
      'premiereConnexion', // new field name
      {
        type: Sequelize.BOOLEAN,
      },
    );
    
    await queryInterface.addColumn(
      'PROFESSEUR', // table name
      'premiereConnexion', // new field name
      {
        type: Sequelize.BOOLEAN,
      },
    );

    await queryInterface.addColumn(
      'SECRETAIRE', // table name
      'premiereConnexion', // new field name
      {
        type: Sequelize.BOOLEAN,
      },
    );

    await queryInterface.removeColumn('ELEVE', 'utilisateurId');
    await queryInterface.removeColumn('PROFESSEUR', 'utilisateurId');
    await queryInterface.removeColumn('SECRETAIRE', 'utilisateurId');
  }
};

