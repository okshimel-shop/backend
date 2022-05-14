const path = require('path');  
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const env = process.env.NODE_ENV

module.exports = {
  [env]: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOSTS,
    port: 3306,
    dialect: 'mysql',
  },
};