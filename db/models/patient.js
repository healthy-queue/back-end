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

  return Patient
}
