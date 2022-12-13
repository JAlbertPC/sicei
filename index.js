require("dotenv").config();
const express = require("express");
const app = express();
const { rutasAlumno } = require("./rutas/rutasAlumno");
const { rutasProfesor } = require("./rutas/rutasProfesor");
app.use(express.json());

//Rutas de alumnos
app.use("/alumnos", rutasAlumno);
//Rutas de porfesor
app.use("/profesores", rutasProfesor);

// Express
app.use((req, res, next) => {
  if (req.url.includes("/alumnos") || req.url.includes("/profesores")) {
    res.status(404).send(`
  <h1>Error 404</h1>
  <h3>No existe</h3>
  <p>${req.method}: ${req.originalUrl}</p>`);
  }
  next();
});

const puerto = process.env.PUERTO;
app.listen(puerto);
