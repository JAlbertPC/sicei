const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.BD,
  process.env.USUARIOBD,
  process.env.PASSWORDBD,
  {
    host: process.env.HOSTBD,
    dialect: process.env.DIALECTBD,
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = { sequelize };
