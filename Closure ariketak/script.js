//Ejercicio 2
function crearLimitadorIntentos(maxIntentos) {
  let intentosRestantes = maxIntentos;

  return function () {
    if (intentosRestantes === 0) {
      console.log("Acceso bloqueado: sin intentos");
      return;
    }

    intentosRestantes--;

    console.log(`Te quedan ${intentosRestantes} intentos`);
  };
}

const intentarLogin = crearLimitadorIntentos(3);

intentarLogin();
intentarLogin();
intentarLogin();
intentarLogin();

// Ejercicio 3
function crearCalculadorImpuesto(porcentaje) {
  return function (precioBase) {
    return precioBase * (1 + porcentaje / 100);
  };
}

const aplicarIVA = crearCalculadorImpuesto(21);
const aplicarTasaReducida = crearCalculadorImpuesto(4);

console.log(aplicarIVA(100));
console.log(aplicarTasaReducida(100));
