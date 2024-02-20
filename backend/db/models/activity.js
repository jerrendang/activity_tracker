'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject = () => {
      const { id, name, user_id } = this;
      return { name, user_id };
    }

    static createActivity = async (activityName, userID) => {
      const newActivity = await Activity.create({
        name: activityName,
        user_id: userID
      })
      
      return await Activity.findByPk(newActivity.id);
    }

    static associate(models) {
      Activity.belongsTo(
        models.User,
        {
          foreignKey: 'user_id',
        }
      );
      Activity.hasMany(
        models.Exercise,
        {
          foreignKey: 'activity_id',
          onDelete: 'CASCADE'
        }
      );
      Activity.hasMany(
        models.Exercise_record,
        {
          foreignKey: 'activity_id',
          onDelete: 'CASCADE'
        }
      ),
      Activity.hasMany(
        models.User_activity,
        {
          foreignKey: 'activity_id',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  Activity.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};