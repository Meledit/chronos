'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ModuleCours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ModuleCours.belongsTo(models.BlocCompetence, { foreignKey: 'blocCompetenceId', onDelete: 'SET NULL' });
    }
  }
  ModuleCours.init({
    libelle: DataTypes.STRING,
    codeApogee: DataTypes.STRING,
    blocCompetenceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BlocCompetence',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'ModuleCours',
  });
  return ModuleCours;
};