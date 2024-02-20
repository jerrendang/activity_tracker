'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Exercise_record extends Model {
    static createRecord = async (record, user_id, activity_id, user_record_id) => {
      for (let x in record){
        let avgReps = 0;
        for (let i in record[x].reps){
          avgReps += record[x].reps[i];
        }
        avgReps = Number((avgReps / record[x].reps.length).toFixed(2))
        await Exercise_record.create({
          exercise_id: parseInt(x),
          user_id,
          activity_id,
          exercise_name: record[x].name,
          user_record_id,
          reps: avgReps,
          sets: record[x].reps.length
        })
      }
    }

    static associate(models) {
      Exercise_record.belongsTo(
        models.User,
        {
          foreignKey: 'user_id',
          onDelete: 'CASCADE'
        }
      );
      Exercise_record.belongsTo(
        models.Activity,
        {
          foreignKey: 'activity_id',
          onDelete: 'CASCADE'
        }
      );
      Exercise_record.belongsTo(
        models.Exercise,
        {
          foreignKey: 'exercise_id',
          onDelete: 'CASCADE'
        }
      );
      Exercise_record.belongsTo(
        models.User_activity,
        {
          foreignKey: 'user_record_id',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  Exercise_record.init({
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exercise_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reps: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    sets: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
  }, {
    sequelize,
    modelName: 'Exercise_record',
  });
  return Exercise_record;
};