// Tipado dinámico
let x = 42;
console.log("Valor de x:", x);
console.log("Tipo de x:", typeof x);

x = undefined;
console.log("Nuevo valor de x:", x);
console.log("Nuevo tipo de x:", typeof x);

// Tipado débil
let resultado1 = "5" * 3;
console.log('"5" + 3 =', resultado1);

let resultado2 = 5 + "3";
console.log("5 + '3' =", resultado2);

let resultado3 = 5 + 3;
console.log("5 + 3 =", resultado3);

let y = "10";
let resultado4 = y + 2;
console.log('"10" + 2 =', resultado4);