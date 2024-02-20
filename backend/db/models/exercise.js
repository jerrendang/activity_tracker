'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static createExercise = async (exerciseName, activityID) => {
      const newExercise = await Exercise.create({
        name: exerciseName,
        activity_id: activityID
      })

      return await Exercise.findByPk(newExercise.id)
    }

    static associate(models) {
      Exercise.belongsTo(
        models.Activity,
        {
          foreignKey: 'activity_id'
        }
      );
      Exercise.hasMany(
        models.Exercise_record,
        {
          foreignKey: 'exercise_id',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  Exercise.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activity_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};