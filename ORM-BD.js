const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./config");

/* const { sequelize } = require("../config/Database"); */

class Alumno extends Model {}
class Profesor extends Model {}

Alumno.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    matricula: DataTypes.STRING,
    promedio: DataTypes.FLOAT,
    fotoPerfilUrl: DataTypes.STRING,
  },
  { sequelize, modelName: "alumno" }
);

Profesor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroEmpleado: DataTypes.INTEGER,
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    horasClase: DataTypes.INTEGER,
  },
  { sequelize, modelName: "profesor" }
);

Alumno.sync();
Profesor.sync();

module.exports = { Alumno, Profesor };
