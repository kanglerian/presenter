'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Applicant.hasMany(models.ApplicantSocmed, {as: 'Socmed', foreignKey: 'idApplicant'});

      Applicant.belongsTo(models.User,{foreignKey: 'idPresenter'});
      Applicant.belongsTo(models.School,{foreignKey: 'idSchool'});
      Applicant.belongsTo(models.Profession,{as: 'Father', foreignKey: 'fatherProfession'});
      Applicant.belongsTo(models.Profession,{as: 'Mother', foreignKey: 'motherProfession'});
    }
  }
  Applicant.init({
    pmb: DataTypes.STRING,
    idPresenter: DataTypes.INTEGER,
    officer: DataTypes.STRING,
    knowLP3I: DataTypes.BOOLEAN,
    interestLP3I: DataTypes.BOOLEAN,
    planning: DataTypes.STRING,
    fullName: DataTypes.STRING,
    placeOfBirth: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    idSchool: DataTypes.INTEGER,
    class: DataTypes.STRING,
    major: DataTypes.STRING,
    achievement: DataTypes.TEXT,
    schoolarship: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.TEXT,
    fatherName: DataTypes.STRING,
    fatherProfession: DataTypes.INTEGER,
    motherName: DataTypes.STRING,
    motherProfession: DataTypes.INTEGER,
    parentContact: DataTypes.STRING,
    incomeParent: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Applicant',
  });
  return Applicant;
};