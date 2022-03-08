'use strict'

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('patient',{
    priority:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    isQueued:{
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    time_entered:{
      type: DataTypes.BIGINT,
      allowNull:false
    },
  },{
    timestamps:true,
    tableName: 'patient',
    freezeTableName:true
  })

  Patient.associate = ({ patient_info }) => {
    Patient.hasOne(patient_info,{
      foreignKey: { name: 'patient_id' },
      onDelete: 'CASCADE', 
      onUpdate:'CASCADE' 
    })
  }

  return Patient
}
