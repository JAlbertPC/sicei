const express = require("express");
const { Profesor } = require("../ORM-BD");
const rutasProfesor = express.Router();

const {
  validarTexto,
  validarNumeroEmpleado,
  validarHorasClase,
  validarId,
} = require("../utlils");

rutasProfesor.get("/", (req, res) => {
  Profesor.findAll().then((profesores) => res.status(200).json(profesores));
});

rutasProfesor.get("/:id", (req, res) => {
  const id = req.params.id;
  Profesor.findOne({
    where: {
      id: id,
    },
  }).then((profesor) => {
    if (profesor == null) {
      res.status(404).json({});
    } else {
      res.status(200).json(profesor);
    }
  });
});

rutasProfesor.post("/", (req, res) => {
  const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
  if (
    validarTexto(nombres) &&
    validarTexto(apellidos) &&
    validarNumeroEmpleado(numeroEmpleado) &&
    validarHorasClase(horasClase)
  ) {
    Profesor.create({
      nombres: nombres,
      apellidos: apellidos,
      numeroEmpleado: numeroEmpleado,
      horasClase: horasClase,
    }).then((profesor) => {
      res.status(201).json(profesor);
    });
  } else {
    res.status(400).json({});
  }
});

rutasProfesor.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nombres, apellidos, numeroEmpleado, horasClase } = req.body;
  if (nombres == null) {
    return res.status(400).json({});
  }
  if (
    validarId(id) &&
    validarTexto(nombres) &&
    validarTexto(apellidos) &&
    validarNumeroEmpleado(numeroEmpleado) &&
    validarHorasClase(horasClase)
  ) {
    Profesor.update(
      {
        nombres: nombres,
        apellidos: apellidos,
        numeroEmpleado: numeroEmpleado,
        horasClase: horasClase,
      },
      {
        where: {
          id: id,
        },
      }
    ).then((profesor) => res.status(200).json(profesor));
  } else {
    res.status(400).json({});
  }
});

rutasProfesor.delete("/:id", (req, res) => {
  const id = req.params.id;
  Profesor.destroy({
    where: {
      id: id,
    },
  }).then((profesor) => {
    if (profesor == 0) {
      res.status(404).send({});
    } else {
      res.status(200).json(profesor);
    }
  });
});

rutasProfesor.route("/").all((req, res) => {
  res.status(405).json({ error: "Ruta invalida" });
});

rutasProfesor.route("/:id").all((req, res) => {
  res.status(405).json({ error: "Ruta invalida" });
});

module.exports = { rutasProfesor };
