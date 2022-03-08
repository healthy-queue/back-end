'use strict'
module.exports = (sequelize, DataTypes) => {
  const Patient_Info = sequelize.define('patient_info',{
    name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    dob:{
      type: DataTypes.STRING,
      allowNull:false
    },
  },{
    tableName: 'patient_info',
    freezeTableName: true
  })

  Patient_Info.associate = ({ patient }) => {
    Patient_Info.belongsTo(patient, {
      foreignKey: { name: 'patient_id' }, 
      onDelete: 'CASCADE', 
      onUpdate:'CASCADE' 
    })
  }

  return Patient_Info
}
