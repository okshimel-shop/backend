const { Sequelize } = require("sequelize");

exports.sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOSTS,
    dialect: "mysql",
    logging: false, // console.log,
  }
);
