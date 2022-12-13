const express = require("express");
const rutasAlumno = express.Router();
const { Alumno } = require("../ORM-BD");
const {
  validarTexto,
  validarMatricula,
  validarCalificacion,
  validarId,
} = require("../utlils");

rutasAlumno.get("/", (req, res) => {
  Alumno.findAll().then((students) => res.status(200).json(students));
});

rutasAlumno.get("/:id", (req, res) => {
  const { id } = req.params;
  Alumno.findOne({
    where: {
      id: id,
    },
  }).then((alumno) => {
    if (alumno == null) {
      res.status(404).json({});
    } else {
      res.status(200).json(alumno);
    }
  });
});

rutasAlumno.post("/", (req, res) => {
  const { nombres, apellidos, matricula, promedio } = req.body;
  if (
    validarTexto(nombres) &&
    validarTexto(apellidos) &&
    validarMatricula(matricula) &&
    validarCalificacion(promedio)
  ) {
    Alumno.create({
      nombres: nombres,
      apellidos: apellidos,
      matricula: matricula,
      promedio: promedio,
    }).then((alumno) => res.status(201).json(alumno));
  } else {
    res.status(400).json({});
  }
});

rutasAlumno.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nombres, apellidos, matricula, promedio } = req.body;

  if (
    validarId(id) &&
    validarTexto(nombres) &&
    validarTexto(apellidos) &&
    validarMatricula(matricula) &&
    validarCalificacion(promedio)
  ) {
    Alumno.update(
      {
        nombres: nombres,
        apellidos: apellidos,
        matricula: matricula,
        promedio: promedio,
      },
      {
        where: {
          id: id,
        },
      }
    ).then((alumno) => res.status(200).json(alumno));
  } else {
    res.status(400).json({});
  }
});

rutasAlumno.delete("/:id", (req, res) => {
  const id = req.params.id;
  Alumno.destroy({
    where: {
      id: id,
    },
  }).then((alumno) => {
    if (alumno == 0) {
      res.status(404).send({});
    } else {
      res.status(200).json({});
    }
  });
});

rutasAlumno.route("/").all((req, res) => {
  res.status(405).json({ error: "Ruta invalida" });
});

rutasAlumno.route("/:id").all((req, res) => {
  res.status(405).json({ error: "Ruta invalida" });
});
module.exports = { rutasAlumno };
