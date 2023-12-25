const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;
const db_url = db.url;

module.exports = {
  development: {
    username,
    password,
    database,
    host, 
    dialect: 'postgres',
    seederStorage: 'sequelize'
  },
  production: {
    // use_env_variable: db_url,
    host: host,
    dialect: 'postgres',
    // seederStorage: 'sequelize',
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // }
  }
}
