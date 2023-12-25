'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject = () => {
      const { id, username, email, createdAt, updatedAt } = this;
      return { id, username, email, createdAt, updatedAt };
    }

    validatePassword = (password) => {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById = async (id) => {
      return await User.scope('currentUser').findByPk(id);
    }

    static login = async ({ credential, password }) => {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      })

      if (user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static signup = async ({ username, email, password }) => {
      const hashedPassword = bcrypt.hashSync(password);
      const newUser = await User.create({
        username,
        email,
        hashedPassword
      })

      return await User.scope('currentUser').findByPk(newUser.id);
    }

    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [4,30],
        isNotEmail (value) {
          if (Validator.isEmail(value)) {
            throw new Error('Username cannot be an email address.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail(value){
          if (!Validator.isEmail(value)){
            throw new Error('Valid email is required.');
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attrubutes: {}
      }
    }
  });
  return User;
};