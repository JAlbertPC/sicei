function validarId(id) {
  const regex = new RegExp(/^[0-9]/);
  return regex.test(id) ? id > 0 : false;
}

function validarTexto(texto) {
  const regex = new RegExp(/^[a-zA-ZÀ-ÿ ]+/);
  return texto != null ? regex.test(texto) : false;
}

function validarMatricula(matricula) {
  const regex = new RegExp(/^A[0-9]/);
  return matricula != null ? regex.test(matricula) : false;
}

function validarCalificacion(calificacion) {
  return !isNaN(calificacion) ? calificacion > 0 : false;
}

function validarNumeroEmpleado(numeroEmpleado) {
  const regex = new RegExp(/^[0-9]/);
  return regex.test(numeroEmpleado) ? numeroEmpleado > 0 : false;
}

function validarHorasClase(horasClase) {
  return !isNaN(horasClase) ? horasClase > 0 : false;
}

module.exports = {
  validarId,
  validarTexto,
  validarMatricula,
  validarCalificacion,
  validarNumeroEmpleado,
  validarHorasClase,
};
