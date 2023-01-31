'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicantSocmed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ApplicantSocmed.belongsTo(models.SocialMedia,{foreignKey: 'idSocmed'});
      ApplicantSocmed.belongsTo(models.Applicant,{foreignKey: 'idApplicant'});
    }
  }
  ApplicantSocmed.init({
    idApplicant: DataTypes.INTEGER,
    idSocmed: DataTypes.INTEGER,
    username: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ApplicantSocmed',
  });
  return ApplicantSocmed;
};