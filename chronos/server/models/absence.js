'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Absence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Absence.belongsTo(models.Eleve, { foreignKey: 'eleveId', onDelete: 'SET NULL' });
      Absence.belongsTo(models.Cours, { foreignKey: 'coursId', onDelete: 'SET NULL' });
    }
  }
  Absence.init({
    valide: DataTypes.BOOLEAN,
    justificatif: DataTypes.STRING,
    message: DataTypes.STRING,
    eleveId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Eleve',
        key: 'id',
      },
    },
    coursId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cours',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Absence',
  });
  return Absence;
};