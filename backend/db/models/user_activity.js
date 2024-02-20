'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static newActivity = async (user_id, activity_id, activity_name, title = '', notes = '') => {
      const newAct = await User_activity.create({
        user_id,
        activity_id,
        activity_name,
        title,
        notes
      })

      return await User_activity.findByPk(newAct.id);
    }

    static associate(models) {
      User_activity.hasMany(
        models.Exercise_record,
        {
          foreignKey: 'user_record_id',
          onDelete: 'CASCADE'
        }
      );
      User_activity.belongsTo(
        models.User,
        {
          foreignKey: 'user_id',
        }
      );
      User_activity.belongsTo(
        models.Activity,
        {
          foreignKey: 'activity_id',
        }
      )
    }
  }
  User_activity.init({
    title: {
      type: DataTypes.TEXT
    },
    notes: {
      type: DataTypes.STRING
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    activity_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User_activity',
  });
  return User_activity;
};