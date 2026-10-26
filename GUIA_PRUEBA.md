# Guía rápida para la prueba de JavaScript

Esta guía resume lo que aparece en el repositorio actualizado. Prioriza entender qué devuelve cada expresión y poder escribir pequeños ejercicios sin copiar el código.

## 1. Variables y tipos

JavaScript tiene tipado dinámico: una variable puede cambiar de tipo durante la ejecución.

```js
let x = 42;
console.log(typeof x); // "number"

x = undefined;
console.log(typeof x); // "undefined"
```

`let` permite reasignar la variable y `const` no permite reasignarla. Usa `const` cuando la referencia no vaya a cambiar.

También tiene tipado débil y puede convertir valores automáticamente:

```js
"5" * 3   // 15: el texto se convierte a número
5 + "3"    // "53": el + concatena si uno de los operandos es texto
5 + 3      // 8
"10" + 2   // "102"
```

Para evitar sorpresas, convierte explícitamente y compara con igualdad estricta:

```js
const edad = Number("20");
edad === 20; // true
```

Recuerda: `typeof null` devuelve `"object"` por una particularidad histórica de JavaScript.

## 2. Strings y posiciones

Las posiciones empiezan en `0`. La posición final de un texto es `texto.length - 1`.

```js
const texto = "JavaScript";

texto.length;                 // cantidad de caracteres
texto.charAt(0);              // "J"
texto.indexOf("a");           // primera aparición; -1 si no existe
texto.lastIndexOf("a");       // última aparición
texto.indexOf("a", 2);        // busca desde la posición 2
texto.includes("Script");     // true o false
texto.startsWith("Java");     // true o false
texto.endsWith("Script");     // true o false
```

Métodos importantes del ejercicio de Sidney:

```js
texto.concat(" extra");       // une textos
texto.substring(2, 5);        // posiciones 2, 3 y 4; el final no se incluye
texto.substring(5);            // desde la posición 5 hasta el final
texto.padStart(15, " ");       // añade caracteres al principio
texto.padEnd(15, " ");         // añade caracteres al final
texto.trim();                  // elimina espacios al principio y al final
texto.toLowerCase();           // minúsculas
texto.toUpperCase();           // mayúsculas
texto.split(" ");              // convierte el texto en un array de palabras
```

Los strings no se modifican directamente: estos métodos devuelven un nuevo string.

## 3. Funciones

### Declaración, expresión y arrow function

```js
function sumar(a, b) {
  return a + b;
}

const restar = function (a, b) {
  return a - b;
};

const multiplicar = (a, b) => a * b;
const saludar = () => console.log("Hola");
```

Si una arrow function tiene una única expresión, su resultado se devuelve implícitamente. Con llaves hace falta escribir `return`:

```js
const doble = x => x * 2;

const triple = x => {
  return x * 3;
};
```

Una función puede recibir parámetros, devolver un valor y crear otras funciones.

## 4. Closures (cierres)

Un closure aparece cuando una función interna conserva acceso a las variables de la función externa, incluso después de que la función externa haya terminado.

```js
function crearContador() {
  let contador = 0;

  return function () {
    contador++;
    return contador;
  };
}

const contador = crearContador();
contador(); // 1
contador(); // 2
```

`contador` mantiene su propio estado privado. Si ejecutas otra vez `crearContador()`, obtienes otro contador independiente.

Ejemplos del repositorio:

- `crearLimitadorIntentos(3)` guarda `intentosRestantes`; las llamadas consumen 3, 2 y 1, y la cuarta muestra que el acceso está bloqueado.
- `crearCalculadorImpuesto(21)` devuelve una función que calcula `precioBase * 1.21`.
- `sortuKontua(saldoInicial)` guarda `saldo` y solo permite modificarlo mediante `sartuDirua()` o consultarlo con `ikusiSaldo()`.

La idea clave es: **la variable queda encapsulada y la función devuelta conserva acceso a ella**.

## 5. Objetos, clases y herencia

Una clase define un molde. El constructor inicializa cada objeto y `this` representa al objeto actual.

```js
class Heroe {
  constructor(nombre, nivel = 1) {
    this._nombre = nombre;
    this._nivel = nivel;
  }

  saludo() {
    return this._nombre + " dice hola";
  }
}

const heroe = new Heroe("Ana");
```

El valor `1` es un parámetro por defecto: se usa si no se proporciona `nivel`.

Getters y setters permiten acceder a propiedades usando una sintaxis sencilla:

```js
get nombre() {
  return this._nombre;
}

set nombre(nombre) {
  this._nombre = nombre;
}

heroe.nombre = "Iker"; // llama al setter
console.log(heroe.nombre); // llama al getter
```

`Mago` hereda de `Heroe`:

```js
class Mago extends Heroe {
  constructor(nombre, nivel, poder) {
    super(nombre, nivel); // ejecuta el constructor padre
    this._poder = poder;
  }

  saludo() {
    return "saludo personalizado";
  }
}
```

Conceptos que debes distinguir:

- `extends`: crea herencia.
- `super(...)`: llama al constructor de la clase padre.
- `new`: crea una instancia.
- Sobrescritura: `Mago` redefine `saludo()`.
- `this`: apunta a la instancia que está ejecutando el método.

## 6. DOM y eventos

En el ejercicio de Regreso al futuro, el JavaScript espera a que se cargue la página:

```js
window.addEventListener("load", inicio, true);
```

Después busca elementos y reacciona al clic:

```js
document.getElementById("calcular")
  .addEventListener("click", calcularFechas);
```

Para leer un campo se usa `.value`; para mostrar texto en la página, `.textContent`:

```js
const mensaje = document.getElementById("mensaje");
const nombre = document.getElementById("nombre").value;
mensaje.textContent = "Hola " + nombre;
```

Como el script está en el `<head>`, esperar al evento `load` evita intentar buscar elementos antes de que exista el HTML.

## 7. Fechas y validación

En JavaScript, al crear una fecha con números, el mes va de `0` a `11`:

```js
new Date(2020, 0, 1); // 1 de enero de 2020
new Date(2020, 5, 1); // 1 de junio de 2020
```

Por eso el objeto `MESES` convierte `JAN` en `0`, `FEB` en `1`, etc.

`getTime()` devuelve la fecha en milisegundos. Para calcular una diferencia:

```js
const diferencia = destino.getTime() - presente.getTime();
const segundos = Math.floor(diferencia / 1000);
```

El operador `%` obtiene el resto. Se usa para separar unidades:

```js
const segundos = segundosTotales % 60;
const minutos = Math.floor(segundosTotales / 60) % 60;
```

`Date` puede corregir automáticamente fechas imposibles. Por eso el ejercicio vuelve a comparar los componentes:

```js
if (fecha.getMonth() !== mes || fecha.getDate() !== dia) {
  throw new Error("La fecha no es válida");
}
```

La validación completa del ejercicio combina `Number(...)`, `Number.isInteger(...)`, `throw`, `try` y `catch`.

## 8. Errores y try/catch

Se lanza un error así:

```js
throw new Error("Faltan datos");
```

Y se captura así:

```js
try {
  const fecha = obtenerFecha("presente");
} catch (error) {
  mensaje.textContent = error.message;
}
```

`try` contiene el código que puede fallar. `catch` evita que la aplicación se rompa y permite mostrar un mensaje al usuario.

## Preguntas típicas para practicar

1. ¿Qué muestran estas expresiones?

   ```js
   "5" * 3;
   5 + "3";
   typeof undefined;
   "hola".substring(1, 3);
   ```

   Respuestas: `15`, `"53"`, `"undefined"` y `"ol"`.

2. ¿Qué imprime este código?

   ```js
   const crear = () => {
     let n = 0;
     return () => ++n;
   };

   const a = crear();
   console.log(a(), a(), a());
   ```

   Imprime `1 2 3` porque la función devuelta conserva `n`.

3. Escribe una función `crearIVA(porcentaje)` que devuelva otra función para calcular el precio final.

   ```js
   function crearIVA(porcentaje) {
     return precio => precio * (1 + porcentaje / 100);
   }
   ```

4. Crea una clase `Guerrero` que herede de `Heroe`, añada `arma` y sobrescriba `saludo()`.

5. Explica por qué esta fecha es problemática:

   ```js
   new Date(2024, 1, 30);
   ```

   El mes `1` es febrero y febrero no tiene día 30; `Date` puede normalizarla a marzo. Hay que validar los componentes después de crearla.

## Checklist para mañana

- [ ] Sé explicar tipado dinámico, tipado débil y `typeof`.
- [ ] Controlo índices desde `0` y la diferencia entre `substring(inicio, fin)` y `substring(inicio)`.
- [ ] Sé usar `indexOf`, `includes`, `split`, `trim`, `toUpperCase` y `toLowerCase`.
- [ ] Puedo escribir una función normal, una function expression y una arrow function.
- [ ] Entiendo un closure y puedo hacer un contador o limitador de intentos.
- [ ] Sé explicar `class`, `constructor`, `this`, `new`, `extends` y `super`.
- [ ] Sé leer un valor del DOM, escuchar un evento y modificar `textContent`.
- [ ] Recuerdo que los meses de `Date` empiezan en `0`.
- [ ] Sé convertir milisegundos a segundos, minutos, horas y días usando `Math.floor` y `%`.
- [ ] Sé validar datos con `Number.isInteger` y manejar errores con `try/catch`.

## Archivos de referencia

- `01-tipado/script.js`: tipos y conversiones implícitas.
- `Sidneyko Mundiala/script.js`: strings y arrays.
- `funtzioak/script.js`: funciones y closures.
- `Closure ariketak/script.js`: limitador de intentos e impuestos.
- `objektuak/Heroe.js` y `objektuak/Mago.js`: clases y herencia.
- `Etorkizunera itzultzea/Reto06_RegresoAlFuturo.js`: DOM, fechas, validación y errores.
