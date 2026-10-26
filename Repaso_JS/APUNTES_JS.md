# JavaScript: apuntes de consulta para el mini examen

Basados en tu teoría, tus ejercicios de `dwec` y la prueba de castellano. Los ejemplos están resueltos; no hay actividades pendientes. Cada bloque de código es independiente salvo que se indique lo contrario.

**Prioridad según la prueba de referencia:** strings → `Set` → clases → números aleatorios → arrays → fecha y resumen. Esa prueba no pregunta los temas 4 y 5; como también has pasado su teoría, están resumidos al final. Esto orienta la consulta, pero no garantiza el contenido de tu examen.

La [prueba completa comentada](Prueba_resuelta/script.js) y su [explicación paso a paso](EXPLICACION_PRUEBA.md) están en esta misma carpeta.

## 0. Consulta rápida: «me piden esto, uso esto»

| Si el enunciado pide… | Herramienta / patrón |
| --- | --- |
| Limpiar espacios y unificar texto | `texto.trim().toLowerCase()` |
| Primera letra mayúscula | `texto.charAt(0).toUpperCase() + texto.slice(1)` |
| Transformar todos los elementos | `array.map(elemento => nuevoValor)` |
| Quitar duplicados | `[...new Set(array)]` después de normalizar |
| Crear un objeto por nombre | `nombres.map(n => new Participante(n, 0))` |
| Mostrar o modificar cada elemento | `array.forEach(elemento => { /* acción */ })` |
| Entero aleatorio de 0 a 10 | `Math.floor(Math.random() * 11)` |
| Seleccionar todos los que cumplen | `array.filter(elemento => condicion)` |
| Buscar uno por una condición | `array.find(elemento => condicion)` |
| Saber si existe / si cumplen todos | `some(...)` / `every(...)` |
| Sumar puntos | `array.reduce((suma, p) => suma + p.puntos, 0)` |
| Media | `total / array.length`, comprobando que haya elementos |
| Encontrar el objeto con más puntos | `reduce` conservando el mejor objeto; ejemplo en §5 |
| Ordenar números de menor a mayor | `[...numeros].sort((a, b) => a - b)` |
| Fecha y hora actuales legibles | `new Date().toLocaleString("es-ES")` |
| Mostrar valores en texto | `` `Nombre: ${nombre}` `` |
| Leer un campo / escribir en la página | `campo.value` / `elemento.textContent` |
| Reaccionar a un clic | `boton.addEventListener("click", funcion)` |
| Guardar una lista entre sesiones | `localStorage.setItem("lista", JSON.stringify(lista))` |

## 1. Variables, tipos, entradas y operadores

| Declaración | Cuándo usarla | Ámbito y particularidades |
| --- | --- | --- |
| `const` | La variable no se reasigna. | De bloque. Un objeto o array contenido sí puede modificarse. |
| `let` | Su valor se reasigna: contador, saldo… | De bloque. |
| `var` | Reconocer código antiguo. | De función; permite redeclarar; antes de la asignación vale `undefined`. |

El bloque es el código entre `{ }`. Una variable local no se puede usar desde fuera de su ámbito. Leer `let` o `const` antes de inicializarlas produce `ReferenceError` por la zona muerta temporal. Eso es relevante para el **hoisting**: las declaraciones se procesan antes de ejecutar, pero las asignaciones no se adelantan.

```js
const notas = [4, 8];
notas.push(10);             // Válido: cambia el contenido, no la referencia.
// notas = [5, 6];          // Error: intentaría reasignar una const.

let edad = 19;
edad += 1;                 // Igual que edad = edad + 1.
```

JavaScript tiene tipado dinámico: una variable puede almacenar valores de tipos diferentes en momentos distintos. `typeof` informa del tipo: `"string"`, `"number"`, `"boolean"`, `"undefined"`, `"object"`, `"function"`, `"bigint"` o `"symbol"`. `null` indica ausencia de valor y `undefined`, ausencia de valor definido. `typeof null` devuelve `"object"` por una particularidad histórica; para arrays se usa `Array.isArray(valor)`.

```js
"5" + 3;                   // "53": con texto, + puede concatenar.
"5" * 3;                   // 15: * convierte a número.
Number("5") + 3;           // 8: conversión explícita.
5 == "5";                  // true: == permite conversión de tipos.
5 === "5";                 // false: === compara valor y tipo.
5 !== "5";                 // true. Preferir === y !==.
```

`console.log(...)` muestra resultados; `info`, `warn` y `error` distinguen tipos de mensajes. `alert(texto)` muestra un aviso. `confirm(texto)` devuelve `true` o `false`. **`prompt(texto)` devuelve texto o `null` si se cancela**, aunque se haya escrito un número.

```js
const entrada = prompt("Edad:");
if (entrada !== null && entrada.trim() !== "") {
    const edad = Number(entrada);
    console.log(Number.isFinite(edad) ? edad : "No es un número válido");
}
```

`Number("")`, `Number("   ")` y `Number(null)` dan `0`: comprobar primero si falta la entrada. Los valores de los inputs también se leen normalmente como texto mediante `.value`.

| Operadores | Significado |
| --- | --- |
| `+ - * / % **` | Suma/concatenación, resta, producto, división, resto y potencia. |
| `=`, `+=`, `-=`, `++`, `--` | Asignar, acumular, restar, incrementar y decrementar. |
| `> >= < <= === !==` | Comparaciones; producen booleanos. |
| `&&`, `\|\|`, `!` | Y, O, negación. `&&` y `\|\|` usan cortocircuito y pueden devolver valores no booleanos. |
| `condicion ? a : b` | Devuelve `a` si se cumple; si no, `b`. |

Falsy: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. Los demás valores son truthy, incluidos `"false"`, `"0"`, `[]` y `{}`. `Boolean(valor)` convierte a booleano. Evita `new Boolean(false)`: crea un objeto y se considera verdadero en un `if`.

`"use strict"` impide, entre otras cosas, asignar a una variable sin declararla. Los módulos y el código de las clases ya usan modo estricto.

## 2. Condiciones y bucles

```js
const nota = 7;
if (nota >= 9) {
    console.log("Sobresaliente");
} else if (nota >= 5) {     // Solo se llega aquí si no se cumplió el primer if.
    console.log("Aprobado");
} else {
    console.log("Suspenso");
}

const turno = "tarde";
switch (turno) {            // Compara con los case mediante igualdad estricta.
    case "manana": console.log("Buenos días"); break;
    case "tarde": console.log("Buenas tardes"); break;
    default: console.log("Otro turno");
}
```

| Estructura | Uso y ejemplo |
| --- | --- |
| `for` | Contar o usar índices: `for (let i = 0; i < lista.length; i++) { console.log(lista[i]); }` |
| `while` | Repetir mientras se cumpla: `while (intentos > 0) { intentos--; }` |
| `do...while` | Ejecutar al menos una vez: `do { n++; } while (n < 3);` |
| `for...of` | Valores de array, string, Set o Map: `for (const nombre of nombres) { console.log(nombre); }` |
| `for...in` | Claves enumerables de un objeto: `for (const clave in persona) { console.log(clave, persona[clave]); }` |

`break` sale del bucle o del `switch`. `continue` salta lo que queda de la vuelta actual y pasa a la siguiente. En un `while`, asegúrate de actualizar la variable de control aunque uses `continue`.

## 3. Funciones, callbacks, rest y closures

```js
function sumar(a, b = 0) { return a + b; } // Declaración y parámetro por defecto.
const restar = function (a, b) { return a - b; }; // Expresión de función anónima.
const doble = n => n * 2;                 // Flecha con retorno implícito.
const triple = n => { return n * 3; };    // Con llaves, escribir return.
const saludar = () => "Hola";             // Sin parámetros: () es obligatorio.
```

Los parámetros reciben los argumentos de la llamada. `return` devuelve un valor y termina la función; si no hay retorno explícito, devuelve `undefined`. `console.log` solo muestra: no sustituye a `return`. Un valor por defecto se aplica si falta el argumento o es `undefined`, no si es `null`.

Un **callback** es una función que otra recibe y llama. No implica necesariamente esperar: el callback de `map` se ejecuta durante el propio `map`.

```js
const numeros = [1, 2, 3];
const dobles = numeros.map(doble); // [2, 4, 6]: pasamos la función sin ejecutarla.

function sumarTodos(...valores) {  // REST: recoge argumentos en un array real.
    return valores.reduce((total, n) => total + n, 0);
}
sumarTodos(2, 3, 4);               // 9.
Math.max(...numeros);             // SPREAD: expande [1, 2, 3] en argumentos.
```

`arguments` es un objeto parecido a un array disponible en funciones tradicionales. Las flechas no tienen `arguments` propio ni `this` propio: los toman del entorno exterior. Para argumentos variables, usa rest.

Un **closure** es una función que conserva acceso a las variables del entorno donde se creó:

```js
function crearContador() {
    let contador = 0;             // Estado que conserva la función devuelta.
    return () => ++contador;
}
const contar = crearContador();   // Creamos UN contador y guardamos su función.
contar();                        // 1.
contar();                        // 2: conserva la misma variable.

function crearIVA(porcentaje) {
    return precio => precio * (1 + porcentaje / 100);
}
const aplicarIVA = crearIVA(21);
aplicarIVA(100);                  // 121: recuerda el porcentaje 21.
```

Es lo que practicaste en `funtzioak` y `Closure ariketak`: saldo, intentos y porcentaje que permanecen entre llamadas. Otra llamada a `crearContador()` crea un contador independiente.

## 4. Strings: limpiar, buscar y extraer texto

Son inmutables: los métodos devuelven resultados nuevos. Para conservar un cambio, guárdalo. Los índices empiezan en `0`; en cortes, el final es exclusivo.

| Operación | Ejemplo resuelto |
| --- | --- |
| Longitud / letra | `"Hola".length` → `4`; `"Hola".charAt(1)` → `"o"` |
| Limpiar extremos | `"  Ane  ".trim()` → `"Ane"`; `trimStart` / `trimEnd` limpian un extremo. |
| Mayúsculas / minúsculas | `"Ane".toUpperCase()` → `"ANE"`; `toLowerCase()` → `"ane"` |
| Cortar | `"JavaScript".slice(0, 4)` → `"Java"`; `.slice(-6)` → `"Script"` |
| Otra forma de cortar | `"JavaScript".substring(4)` → `"Script"`; no interpreta negativos como `slice`. |
| Buscar posición | `"banana".indexOf("a")` → `1`; `.lastIndexOf("a")` → `5`; si no existe → `-1`. |
| Segunda aparición | `texto.indexOf("a", texto.indexOf("a") + 1)`, si existe una primera. |
| Comprobar contenido | `"JavaScript".includes("Script")` → `true`; también `startsWith` / `endsWith`. |
| Reemplazar | `"lala".replace("la", "na")` → `"nala"`; `.replaceAll("la", "na")` → `"nana"` |
| Texto → array | `"rojo,azul".split(",")` → `["rojo", "azul"]` |
| Array → texto | `["rojo", "azul"].join(" - ")` → `"rojo - azul"` |
| Rellenar / repetir | `"7".padStart(2, "0")` → `"07"`; `"ha".repeat(2)` → `"haha"` |
| Unir | `"Hola " + nombre`, `"Hola ".concat(nombre)` o `` `Hola ${nombre}` `` |

Para copiar de la posición 26 a la 35, ambas incluidas: `texto.slice(26, 36)`. Es el mismo límite exclusivo que usaste en `Sidneyko Mundiala`. `padStart` y `padEnd` reciben la **longitud final**, no cuántos caracteres añadir.

Normalización lista para reutilizar:

```js
function normalizarNombre(nombre) {
    const limpio = nombre.trim().toLowerCase();
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
}
normalizarNombre("  jON ");       // "Jon".
```

Usa textos literales, no `new String(...)`: ese constructor crea un objeto. Las plantillas literales usan backticks, permiten `${expresion}` y conservan saltos de línea.

## 5. Arrays: elegir el método correcto

Un array es una lista indexada desde cero. `lista.length` da su tamaño; `lista[0]`, el primer elemento; `lista.at(-1)`, el último. En una tabla, `tabla[fila][columna]`.

Estos ejemplos comparten el mismo array:

```js
const personas = [
    { nombre: "Ane", puntos: 7 },
    { nombre: "Jon", puntos: 4 },
    { nombre: "Mikel", puntos: 9 }
];

personas.forEach(p => console.log(p.nombre)); // Hace una acción; retorna undefined.
const nombres = personas.map(p => p.nombre);  // ["Ane", "Jon", "Mikel"].
const aprobados = personas.filter(p => p.puntos >= 5); // Objetos de Ane y Mikel.
const mikel = personas.find(p => p.nombre === "Mikel"); // Objeto de Mikel.
const posicion = personas.findIndex(p => p.nombre === "Mikel"); // 2; sin él, -1.
const haySuspensos = personas.some(p => p.puntos < 5);  // true.
const todosAprueban = personas.every(p => p.puntos >= 5); // false.
const total = personas.reduce((suma, p) => suma + p.puntos, 0); // 20.
const media = personas.length > 0 ? total / personas.length : 0;
const mejor = personas.reduce((candidato, p) => {
    if (candidato === null || p.puntos > candidato.puntos) return p;
    return candidato;
}, null); // Objeto de Mikel; null si el array está vacío.
```

**`reduce(callback, inicial)`**: el primer parámetro del callback es el resultado acumulado; el segundo es el elemento actual. Lo que devuelve el callback pasa a ser el acumulador de la siguiente vuelta. Dar valor inicial permite controlar el tipo y el caso vacío.

**`find` devuelve un elemento o `undefined`**. Comprueba el resultado antes de acceder a una propiedad o llamar a un método: `if (mikel) { console.log(mikel.nombre); }`. `filter` siempre devuelve un array, que puede estar vacío.

Para valores simples: `lista.includes(valor)` devuelve booleano; `indexOf(valor)` y `lastIndexOf(valor)` devuelven posiciones o `-1`. Buscar objetos por sus propiedades suele requerir `find`, no `includes({ ... })`, porque los objetos se comparan por referencia.

| Método | Qué hace | ¿Modifica el array? / qué devuelve |
| --- | --- | --- |
| `push(x)` / `unshift(x)` | Añade al final / principio. | Sí; devuelve la nueva longitud. |
| `pop()` / `shift()` | Quita del final / principio. | Sí; devuelve el elemento quitado. |
| `slice(inicio, fin)` | Copia un tramo, fin exclusivo. | No; devuelve el tramo. |
| `splice(i, cantidad, ...nuevos)` | Borra / inserta / sustituye desde `i`. | Sí; devuelve los elementos eliminados. |
| `concat(otra)` / `[...lista]` | Une / copia. | No; devuelve un array nuevo. |
| `sort(comparador)` / `reverse()` | Ordena / invierte. | Sí; devuelve el propio array. |
| `toSorted` / `toReversed` | Ordena / invierte una copia. | No; devuelve el array nuevo. |
| `toSpliced(i, cantidad, ...nuevos)` | Aplica un cambio en una copia. | No; devuelve el array resultante completo. |
| `with(i, valor)` | Cambia un índice en una copia. | No; devuelve el array nuevo. |
| `fill(valor, inicio, fin)` | Rellena un tramo. | Sí; fin exclusivo. |
| `copyWithin(destino, inicio, fin)` | Copia un tramo dentro del mismo array. | Sí; fin exclusivo. |
| `flat(profundidad)` / `flatMap(fn)` | Aplana / transforma y aplana un nivel. | No; devuelve un array nuevo. |

Los métodos que crean arrays nuevos pueden **compartir los objetos interiores**. Además, un callback puede modificarlos si lo programas así. Una copia con spread es superficial.

```js
const numeros = [10, 2, 30];
const asc = [...numeros].sort((a, b) => a - b); // [2, 10, 30]; no cambia numeros.
const desc = numeros.toSorted((a, b) => b - a); // [30, 10, 2].
const porNombre = personas.toSorted((a, b) => a.nombre.localeCompare(b.nombre));
```

Sin comparador, `sort` compara como texto: `[10, 2, 30]` quedaría en ese orden. **Los valores siguen siendo números**; se convierten a texto para comparar. Para números: `a - b` ascendente, `b - a` descendente. Los métodos `toSorted`, `toReversed`, `toSpliced` y `with` requieren un entorno que los soporte; `[...lista].sort(...)` es una alternativa para ordenar una copia.

```js
Array.isArray([1, 2]);              // true.
Array.of(3);                       // [3].
Array.from("hola");                // ["h", "o", "l", "a"].
Array.from({ length: 3 }, (_, i) => i + 1); // [1, 2, 3]; _ es un parámetro sin usar.
[1, [2, [3]]].flat(2);             // [1, 2, 3].
[1, 2].flatMap(n => [n, n * 2]);   // [1, 2, 2, 4].
```

## 6. Set, Map y Symbol

**Set: valores únicos, en orden de inserción.** Tiene `size`, no `length`. `NaN` se considera repetido respecto a otro `NaN`, y `0` y `-0` son el mismo valor.

```js
const unicos = [...new Set(["Ane", "Jon", "Ane"])]; // ["Ane", "Jon"].
const s = new Set();
s.add("Ane"); s.has("Ane");        // Añadir y consultar: true.
s.delete("Ane");                   // Quitar: true si estaba.
s.size;                            // 0.
s.clear();                         // Vaciar.

const A = new Set([1, 2]);
const B = new Set([2, 3]);
const union = new Set([...A, ...B]);                   // {1, 2, 3}.
const interseccion = new Set([...A].filter(x => B.has(x))); // {2}.
const diferencia = new Set([...A].filter(x => !B.has(x)));  // {1}.
```

Estas fórmulas siguen siendo útiles. Corrección de la teoría: JavaScript actual también tiene métodos nativos como `union`, `intersection` y `difference`; no necesitas añadirlos a la solución de esta prueba. [Referencia de Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

**Map: pares clave–valor.** Las claves pueden ser de cualquier tipo, conserva el orden de inserción y tiene `size`. En un objeto normal las claves son strings **o símbolos**.

```js
const puntos = new Map([["Ane", 7], ["Jon", 4]]);
puntos.set("Ane", 9);              // Crea o actualiza una clave.
puntos.get("Ane");                 // 9; si no existe → undefined.
puntos.has("Jon");                 // true.
for (const [nombre, nota] of puntos) console.log(nombre, nota);
puntos.forEach((valor, clave) => console.log(clave, valor)); // Valor ANTES que clave.
const claves = [...puntos.keys()]; // ["Ane", "Jon"].
// values() da valores; entries() da pares. delete(clave) borra; clear() vacía.

const contador = new Map();
for (const palabra of ["js", "web", "js"]) {
    contador.set(palabra, (contador.get(palabra) || 0) + 1);
} // "js" → 2; "web" → 1. Si no había contador, empezamos en 0.
```

**Symbol: identificador único.** `Symbol("id") === Symbol("id")` es `false`; `Symbol.for("id") === Symbol.for("id")` es `true` porque reutiliza el registro global. `Symbol.keyFor` recupera la clave de uno global.

```js
const ID = Symbol("id");
const persona = { nombre: "Ane", [ID]: 123 };
persona[ID];                       // 123. Corchetes: usamos la clave guardada en ID.
Object.keys(persona);              // ["nombre"]. No incluye símbolos.
Object.getOwnPropertySymbols(persona); // [ID]. Por eso no son privacidad real.
```

`Symbol.iterator` permite definir cómo se itera. Un iterador tiene `.next()`, que devuelve `{ value, done }`: valor actual y si terminó.

## 7. Objetos, clases, herencia y encapsulación

```js
class Persona {
    constructor(nombre, edad = 18) {
        this._nombre = nombre;    // _ es una convención; la propiedad es pública.
        this.edad = edad;
    }
    get nombre() { return this._nombre; }
    set nombre(valor) { this._nombre = valor; }
    descripcion() { return `${this.nombre}: ${this.edad} años`; }
}
class Alumna extends Persona {
    constructor(nombre, edad, curso) {
        super(nombre, edad);      // Constructor padre, antes de usar this.
        this.curso = curso;
    }
    descripcion() {              // Sobrescribe el método heredado.
        return `${super.descripcion()} - ${this.curso}`;
    }
}
const ane = new Alumna("Ane", 20, "2 DAW");
ane.nombre = "Irati";            // Setter: NO se llama como nombre(...).
console.log(ane.nombre);         // Getter: NO lleva ().
console.log(ane.descripcion());  // Método: SÍ lleva ().
```

`new` crea la instancia; `constructor` inicializa sus datos; `this` representa el objeto en estas llamadas; `extends` establece herencia; `super` accede al padre. Las clases siguen basándose en prototipos. Puedes tener un solo constructor por clase; si se omite, hay uno por defecto. En una subclase sin constructor explícito se pasan los argumentos al padre.

`#saldo` sí es privado: se declara dentro de la clase y solo se accede desde su cuerpo, por ejemplo `class Cuenta { #saldo = 0; verSaldo() { return this.#saldo; } }`. Una subclase tampoco puede acceder directamente al campo privado del padre.

Corrección del ejemplo de tu teoría: si solo asignas `this._nombre` y no defines getter `nombre`, leer `persona.nombre` da `undefined`. `_nombre` y `nombre` son propiedades distintas. En `objektuak/Heroe.js` sí has definido ese getter.

## 8. Number, Math y Date

| Necesidad | Ejemplo / resultado |
| --- | --- |
| Convertir todo el texto a número | `Number("12.5")` → `12.5`; `Number("12px")` → `NaN`. |
| Leer un prefijo numérico | `parseInt("42px", 10)` → `42`; `parseFloat("3.14 m")` → `3.14`. |
| Otras bases | `parseInt("1010", 2)` → `10`; `(255).toString(16)` → `"ff"`. |
| Comprobar | `Number.isInteger(4)`; `Number.isFinite(4)`; `Number.isNaN(NaN)` → todos `true`. |
| Formatear | `(3.456).toFixed(2)` → `"3.46"`; `(123.456).toPrecision(4)` → `"123.5"`. |
| Redondear | `round(4.6)` → `5`; `floor(4.9)` → `4`; `ceil(4.1)` → `5`; `trunc(4.9)` → `4`, todos con prefijo `Math.`. |
| Negativos | `Math.floor(-4.2)` → `-5`; `Math.trunc(-4.2)` → `-4`. |
| Absoluto / potencia / raíz | `Math.abs(-7)` → `7`; `2 ** 3` → `8`; `Math.sqrt(16)` → `4`. |
| Mayor / menor | `Math.max(2, 8, 5)` → `8`; para un array, `Math.max(...numeros)`. |
| Aleatorio entre min y max, incluidos | `Math.floor(Math.random() * (max - min + 1)) + min`. |

`Number.isNaN("hola")` da `false`: no convierte el texto. `NaN === NaN` es `false`; se comprueba con `Number.isNaN`. `toFixed` y `toPrecision` devuelven **texto**, no números. Los decimales tienen aproximación binaria: `0.1 + 0.2` no es exactamente `0.3`.

`Number.MAX_VALUE` es el mayor número finito positivo; `MIN_VALUE`, el menor **positivo**, no el más negativo. También existen `NaN`, `POSITIVE_INFINITY`, `NEGATIVE_INFINITY` y `MAX_SAFE_INTEGER`. Los enteros grandes pueden representarse con `BigInt("9007199254740993")` o `9007199254740993n`; no se suman directamente con un Number.

`Math` no se instancia: no se hace `new Math()`. Otras referencias del temario: `Math.PI`, `E`, `SQRT2`, `LN2`; `sin`, `cos`, `tan` y sus inversas usan radianes; `log`, `log10`, `log2` calculan logaritmos; `exp(x)` calcula e elevado a x. `Math.random` sirve para el sorteo de esta prueba.

```js
const ahora = new Date();
ahora.toLocaleString("es-ES");    // Fecha y hora locales legibles.
ahora.toLocaleDateString("es-ES"); // Solo fecha.
ahora.toLocaleTimeString("es-ES"); // Solo hora.
const fecha = new Date(2026, 9, 27, 12, 30); // 27 de OCTUBRE, 12:30 local.
fecha.getFullYear();             // 2026.
fecha.getMonth();                // 9: meses entre 0 y 11.
fecha.getDate();                 // 27: día DEL MES.
fecha.getDay();                  // 2: día DE LA SEMANA, domingo=0.
// getHours(), getMinutes(), getSeconds() obtienen la hora.
fecha.setDate(fecha.getDate() + 1); // Añade un día; puede cambiar de mes/año.
// setMonth() y setFullYear() cambian mes y año.
```

Una fecha guarda milisegundos desde el inicio de 1970 UTC. `fin - inicio` o `fin.getTime() - inicio.getTime()` dan diferencia en milisegundos. Dividir por `1000 * 60 * 60 * 24` convierte la duración en periodos de 24 horas; alrededor de un cambio horario local no siempre coincide con contar días de calendario. En `Etorkizunera itzultzea` separaste unidades usando `Math.floor` y `%`.

`Date` normaliza fechas imposibles: para validarlas, compara después `getFullYear`, `getMonth` y `getDate` con los componentes originales. `toISOString()` devuelve UTC; para un input `date` local, usa:

```js
function formatearFecha(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}
```

## 9. Módulos: import y export

```html
<!-- Solo se enlaza el módulo principal. Se ejecuta tras analizar el HTML. -->
<script type="module" src="js/main.js"></script>
```

Archivo `js/utilidades.js`:

```js
export const IVA = 0.21;
export function precioConIVA(precio) { return precio * (1 + IVA); }
```

Archivo `js/persona.js`:

```js
export default class Persona { constructor(nombre) { this.nombre = nombre; } }
```

Archivo `js/main.js`:

```js
import { precioConIVA } from "./utilidades.js"; // Con nombre: llaves y nombre exacto.
import { precioConIVA as calcular } from "./utilidades.js"; // Alias local.
import Persona from "./persona.js"; // Default: sin llaves, nombre local libre.
import * as utils from "./utilidades.js"; // Agrupa exportaciones en un objeto.
console.log(utils.IVA, calcular(100));
```

Cada módulo tiene ámbito propio y modo estricto. Puede haber muchas exportaciones con nombre y una por defecto. En un proyecto de navegador sin import maps ni empaquetador, usa rutas como `./archivo.js`, relativas al **JS que importa**, con extensión. Ábrelo con servidor local, por ejemplo Live Server; con `file://` pueden bloquearse los módulos por CORS. Sus funciones no quedan disponibles automáticamente para `onclick="..."`: enlaza eventos desde JS. Los módulos permiten `await` en el nivel superior.

## 10. Objetos del navegador: qué pertenece a cada uno

| Objeto | Para qué sirve | Referencias útiles |
| --- | --- | --- |
| `window` | Ventana y entorno global del navegador. | `innerWidth`, `innerHeight`, `alert`, `open`, temporizadores. |
| `document` | Página cargada y DOM. | `title`, `URL`, selección y creación de elementos. |
| `navigator` | Idioma y capacidades del navegador. | `language`, `userAgent`, `cookieEnabled`, `onLine`, `geolocation`. |
| `screen` | Dimensiones de la pantalla en píxeles CSS. | `width`, `height`, `availWidth`, `availHeight`, `colorDepth`, `orientation.type`. |
| `location` | URL actual y navegación. | `href`, `protocol`, `hostname`, `port`, `pathname`, `search`, `hash`. |
| `history` | Historial de esta pestaña. | `length`, `back()`, `forward()`, `go(-1)`, `go(1)`. |

En `https://ejemplo.com:8080/lista?orden=asc#final`, `protocol` es `"https:"`, `pathname` es `"/lista"`, `search` es `"?orden=asc"` y `hash` es `"#final"`.

`location.assign(url)` o asignar `location.href` navegan conservando una entrada para volver; `location.replace(url)` sustituye la actual. `location.reload()` recarga. Corrección: `reload(true)` para saltar caché es una extensión de Firefox, no una solución general. [Referencia de reload](https://developer.mozilla.org/en-US/docs/Web/API/Location/reload).

`history.pushState(estado, "", "/ruta")` añade una entrada y cambia la URL sin cargar otro documento; `replaceState` modifica la actual. La URL debe respetar el mismo origen. Al recorrer entradas puede dispararse `popstate`, con datos en `event.state`; llamar a `pushState` no dispara por sí mismo ese evento.

`window.open(url, "_blank")` puede abrir una ventana/pestaña y devolver su referencia, o `null` si se bloquea. Suele necesitar un clic del usuario. `navigator.onLine` informa de conectividad, pero no garantiza acceso real a Internet. La geolocalización es asíncrona, pide permiso y requiere contexto seguro, normalmente HTTPS o localhost. No necesitas detectar el sistema con `userAgent` para resolver esta prueba.

## 11. Temporizadores y eventos

```js
const aviso = setTimeout(() => console.log("Una vez"), 2000);
clearTimeout(aviso);             // Cancela la ejecución pendiente.

let contador = 0;
const intervalo = setInterval(() => {
    contador++;
    console.log(contador);
    if (contador === 5) clearInterval(intervalo);
}, 1000);                        // Milisegundos: 1000 = 1 segundo.
```

Se pasa la **función**, no su resultado: `setTimeout(mostrarMensaje, 2000)`, sin `mostrarMensaje()`. El retraso no garantiza ejecución exacta: la función espera a que JavaScript pueda ejecutarla. Es el mecanismo del aviso de contraseña en `Sarbidearen formularioa`.

```js
const boton = document.querySelector("#boton"); // El elemento debe existir ya.
function manejarClick(e) {
    console.log(e.type);          // "click".
    console.log(e.target);        // Elemento donde se originó el evento.
    console.log(e.currentTarget); // Elemento que tiene este listener.
}
boton.addEventListener("click", manejarClick);
// Para quitarlo: boton.removeEventListener("click", manejarClick);
```

Para quitar un listener hay que usar la **misma función** y el mismo valor de captura. Otra función anónima escrita igual es una función distinta.

| Evento | Cuándo se utiliza |
| --- | --- |
| `click` | Botones y acciones al pulsar. |
| `mouseover` / `mouseout` | Entrada / salida del ratón; también pueden reaccionar por hijos. |
| `keydown` | Pulsar una tecla; `e.key` identifica cuál. |
| `input` | Cambios de texto en tiempo real. |
| `focus` / `blur` | Entrar en un campo / abandonarlo. |
| `change` | Cambiar selección en checkbox, radio o select. |
| `submit` | Intentar enviar el formulario; se escucha en el formulario. |

`e.preventDefault()` cancela la acción predeterminada, por ejemplo navegar con un enlace o enviar el formulario. Para acceder al DOM cuando ya existe, puedes cargar el script con `defer`, usar un módulo, ponerlo al final del `body` o esperar `DOMContentLoaded`. `load` espera también recursos como imágenes; lo has usado en clase.

## 12. DOM: seleccionar, modificar, crear y recorrer

| Necesidad | Código / particularidad |
| --- | --- |
| Un elemento por id | `document.getElementById("titulo")`: id sin `#`. |
| Primero por selector CSS | `document.querySelector("#titulo")` / `(".item")`; sin coincidencia → `null`. |
| Todos por selector | `document.querySelectorAll(".item")`: NodeList estática, admite `forEach`. |
| Por etiqueta / clase | `getElementsByTagName("p")` / `getElementsByClassName("item")`: HTMLCollection viva. |
| Leer formulario | `campo.value`; checkbox/radio: `campo.checked`. |
| Texto plano | `elemento.textContent = "Hola"`. |
| HTML interpretado | `elemento.innerHTML = "<strong>Hola</strong>"`; evitar texto de usuario sin sanitizar. |
| Atributos | `getAttribute("src")`, `setAttribute("alt", "Logo")`, `removeAttribute("title")`. |
| Clases | `classList.add("activa")`, `.remove("activa")`, `.toggle("activa")`, `.contains("activa")`. |
| Estilo directo | `elemento.style.backgroundColor = "red"`; para varios estilos, mejor clases CSS. |

`getAttribute` lee el **atributo actual**, no una copia inmutable del HTML original. Una propiedad puede dar otro tipo de valor: `imagen.src` suele resolver la URL completa y `input.value` refleja lo escrito actualmente. [Referencia de getAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute).

```js
const lista = document.querySelector("#lista");
const li = document.createElement("li"); // Solo se crea en memoria.
li.textContent = "Ane";
lista.append(li);                // Ahora aparece al final de la lista.
// Alternativas: prepend al principio, before/after antes/después del elemento.
// appendChild(li) también inserta, pero recibe un solo nodo.

const sustituto = document.createElement("li");
sustituto.textContent = "Jon";
li.replaceWith(sustituto);       // Sustituye li; sustituye el nodo, no su texto.
sustituto.remove();              // Elimina ese nodo.
// lista.replaceChildren() elimina todos sus hijos.
```

Insertar el mismo nodo en otro sitio lo **mueve**; para duplicarlo, clónalo. `DocumentFragment` agrupa nodos en memoria antes de insertarlos; es útil para organizar creaciones por lotes, sin garantizar por sí solo una mejora concreta de rendimiento. Para reutilizar HTML de un `<template>`, se clona `plantilla.content.cloneNode(true)` y luego se inserta el clon.

| Relación DOM | Propiedad / método |
| --- | --- |
| Padre | `parentElement` |
| Hijos elemento | `children`, `firstElementChild`, `lastElementChild` |
| Hermanos elemento | `previousElementSibling`, `nextElementSibling` |
| Todos los nodos, incluidos texto/comentarios | `childNodes`, `firstChild`, `nextSibling` |
| Buscar dentro de una sección | `seccion.querySelector("p")` |
| Buscar contenedor cercano | `elemento.closest("section")`: comprueba el propio elemento y luego ancestros. |

`children` es una HTMLCollection viva: cambia al modificar el DOM. La NodeList de `querySelectorAll` es estática; no todas las NodeList lo son (`childNodes` es viva). Para recorrer una HTMLCollection con métodos de array: `Array.from(coleccion).forEach(...)`.

## 13. Formularios y expresiones regulares

**HTML establece las restricciones; JavaScript puede consultar la validez y añadir reglas.**

| Atributo | Qué exige |
| --- | --- |
| `required` | Que haya valor; en checkbox, que esté marcado. |
| `type="email"` / `"url"` | Formato básico del tipo; `tel` no valida por sí solo. |
| `min` / `max` / `step` | Rango y paso de números o fechas; para decimales libres en number, `step="any"`. |
| `minlength` / `maxlength` | Longitud en campos de texto y textarea; no sirven para number. |
| `pattern="[A-Za-z0-9]+"` | Patrón en los tipos de input de texto que lo admiten; no en textarea o number. |
| `novalidate` en form | Desactiva la validación automática al enviar; permite controlarla desde JS. |

`pattern` comprueba el valor completo, sin escribir barras `/.../`. Si se permite vacío, no falla por patrón: añade `required` si debe haber valor. `title` puede dar una pista; no garantiza un mensaje idéntico en todos los navegadores.

| API | Qué hace |
| --- | --- |
| `campo.validity` | Indicadores booleanos de por qué es inválido. |
| `checkValidity()` | Devuelve booleano sin mostrar mensajes. |
| `reportValidity()` | Comprueba y muestra los avisos nativos. |
| `setCustomValidity("mensaje")` | Hace el campo inválido con ese mensaje. |
| `setCustomValidity("")` | Borra el error personalizado anterior. |

Indicadores útiles: `valueMissing` (falta), `typeMismatch` (formato), `tooShort` / `tooLong` (longitud), `patternMismatch`, `rangeUnderflow` / `rangeOverflow`, `stepMismatch`, `badInput`, `customError` y `valid`.

Ejemplo completo: validación manual con mensajes nativos personalizados.

```html
<form id="registro" novalidate>
    <input id="usuario" required minlength="4" pattern="[A-Za-z0-9]+">
    <button type="submit">Comprobar</button>
</form>
<p id="resultado"></p>
```

```js
// Cargar después del HTML, con defer o como módulo.
const form = document.querySelector("#registro");
const usuario = document.querySelector("#usuario");
function validarUsuario() {
    usuario.setCustomValidity(""); // Primero limpiar: no dejar un error antiguo.
    if (usuario.validity.valueMissing) {
        usuario.setCustomValidity("Escribe un usuario");
    } else if (usuario.validity.tooShort) {
        usuario.setCustomValidity("Debe tener al menos 4 caracteres");
    } else if (usuario.validity.patternMismatch) {
        usuario.setCustomValidity("Solo letras y números");
    }
}
usuario.addEventListener("input", validarUsuario);
form.addEventListener("submit", e => {
    e.preventDefault();           // En esta demostración solo comprobamos.
    validarUsuario();             // Validar también si nunca se tocó el campo.
    const correcto = form.checkValidity();
    document.querySelector("#resultado").textContent = correcto ? "Datos válidos" : "Revisa el usuario";
    if (!correcto) form.reportValidity();
});
```

Sin `novalidate`, un campo inválido puede impedir que se dispare `submit`: el navegador realiza primero la validación automática. [Referencia del evento submit](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event).

Para mensajes propios debajo del campo, escribe en un `span.textContent`; para estilos, `:valid`, `:invalid` o clases CSS. `input` valida mientras se escribe; `blur`, al salir. Si usas `setCustomValidity`, revalida para limpiar el error al corregirlo.

### Regex que puedes consultar directamente

En JavaScript se escribe `/patron/` y se comprueba con `.test(texto)`. `^` y `$` delimitan la cadena completa. Sin ellos podría bastar una coincidencia parcial.

| Símbolo | Significado |
| --- | --- |
| `[A-Z]`, `[abc]`, `[^0-9]` | Un carácter del rango, de la lista o fuera de la lista. |
| `\d`, `\w`, `\s` | Dígito; letra ASCII/dígito/guion bajo; espacio en blanco. |
| `\D`, `\W`, `\S` | Negación de los anteriores. |
| `*`, `+`, `?` | Cero o más; uno o más; cero o uno. |
| `{3}`, `{3,}`, `{3,6}` | Tres; al menos tres; entre tres y seis repeticiones. |
| `(ab)`, `a\|b` | Agrupar; alternativa. Para palabras completas: `^(rojo\|azul)$`. |
| `.`, `\.` | Cualquier carácter salvo saltos de línea habituales; un punto literal. |
| Bandera `i` | Ignora mayúsculas/minúsculas. Para validación simple evita la bandera `g`. |

```js
/^[A-Za-z0-9]{4,12}$/.test("Ane2026");   // true: 4–12 letras ASCII o números.
/^[6-9]\d{8}$/.test("612345678");        // true: teléfono de nueve dígitos.
/^\d{4}\s?[BCDFGHJKLMNPRSTVWXYZ]{3}$/.test("1234 BCD"); // true: matrícula.
/^\d+(\.\d{1,2})?$/.test("12.34");      // true: decimal positivo, hasta dos cifras.
/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test("ane@ejemplo.com"); // true: email básico.
/^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test("48001"); // true: formato CP español.
/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test("31/02/2026"); // true: formato, NO fecha real.
/https?:\/\//.test("ver https://ejemplo.com"); // true: contiene un enlace http(s).
/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test("Abcde123!"); // true.
```

En la última regex cada `(?=.*...)` exige que exista un tipo de carácter; `.{8,}` exige longitud mínima. Las regex verifican las reglas que expresan: una regex de formato de fecha no detecta por sí sola un 31 de febrero. En los literales JS, escribe `\.` para el punto literal, no `\\.`; algunos ejemplos pegados de tu teoría contienen escapes de más.

### Otros campos: qué se consulta y qué se valida

| Campo | Regla útil |
| --- | --- |
| Checkbox único | `required` obliga a marcarlo; se consulta `.checked`, no `.value`. |
| Radios | Mismo `name` para agrupar; un `required` obliga a elegir uno. Valor: `form.elements.turno.value`. |
| Select | `required` y primera opción `value=""`; valor con `.value`. |
| Select multiple | `selectedOptions` contiene las elegidas; para máximo dos, comprobar `.length > 2`. |
| Textarea | `required`, `minlength`, `maxlength`; patrón personalizado mediante regex en JS. |
| Date | `.value` usa `aaaa-mm-dd`; `min`/`max` limitan el rango; formatear con fecha local. |
| Grupo de checkboxes | Contar `querySelectorAll('input[name="intereses"]:checked').length`; si es 0, error en el primer checkbox. |
| Repetir contraseña | Comparar los dos `.value` y poner error si no coinciden. |
| File | Leer `.files[0]` y comprobar `.type` y `.size`; `accept` solo orienta el selector. |

En grupos de checkboxes no pongas `required` en cada uno si solo exiges uno: obligarías a marcarlos todos. Para invalidar un grupo se usa `setCustomValidity` en un campo concreto y se limpia al corregirlo. Para exigir mayoría de edad, calcula la fecha límite y asigna `nacimiento.max = formatearFecha(limite)`. La validación del cliente se repite en el servidor cuando hay envío real de datos.

## 14. Almacenamiento: Web Storage e IndexedDB

| Mecanismo | Uso y duración |
| --- | --- |
| `localStorage` | Datos simples del mismo origen; persisten entre sesiones hasta borrarse. |
| `sessionStorage` | Datos de la sesión de esa pestaña; sobreviven a recargar y se eliminan normalmente al cerrarla. |
| IndexedDB | Datos estructurados, objetos/archivos, búsquedas e índices; API asíncrona y persistente. |

Web Storage almacena **strings**. `getItem` devuelve texto o `null` si no hay clave.

```js
const nombres = ["Ane", "Jon"];
localStorage.setItem("nombres", JSON.stringify(nombres)); // Array → texto JSON.
const guardado = localStorage.getItem("nombres");
const recuperados = guardado === null ? [] : JSON.parse(guardado); // Texto → array.
localStorage.removeItem("nombres"); // Solo esa clave.
// localStorage.clear() borra todas las claves de ese almacenamiento/origen.
// sessionStorage tiene los mismos métodos.
```

No uses `Boolean(localStorage.getItem("activo"))` para leer un booleano guardado como `"false"`: ese texto no está vacío y da `true`. Si lo guardaste con `JSON.stringify(false)`, léelo con `JSON.parse`. A diferencia de las cookies, Web Storage no se envía automáticamente en las peticiones. No ofrece por sí mismo una protección especial frente a JavaScript malicioso ejecutado en el mismo origen.

**IndexedDB: orden obligatorio de operaciones.** Abrir → crear estructura en actualización de versión → esperar éxito → transacción → almacén → operación asíncrona.

```js
const solicitud = indexedDB.open("repasoPersonas", 1);
solicitud.onupgradeneeded = e => { // Primera apertura o aumento de versión.
    const db = e.target.result;
    db.createObjectStore("personas", { keyPath: "id" });
};
solicitud.onerror = () => console.error("No se pudo abrir la base de datos");
solicitud.onsuccess = e => {
    const db = e.target.result;
    const tx = db.transaction("personas", "readwrite");
    const store = tx.objectStore("personas");
    store.put({ id: 1, nombre: "Ane" }); // Inserta o sustituye por clave.
    tx.oncomplete = () => {       // Esperamos a que la escritura termine bien.
        const lectura = db.transaction("personas", "readonly");
        const peticion = lectura.objectStore("personas").get(1);
        peticion.onsuccess = () => console.log(peticion.result); // Objeto de Ane.
    };
    tx.onabort = () => console.error("No se guardó la transacción");
};
```

`add(objeto)` inserta y falla si ya existe esa clave; `put(objeto)` inserta o sustituye; `get(clave)` lee; `delete(clave)` borra. Para recorrer, `store.openCursor()` y, en su `onsuccess`, leer `e.target.result.value` y llamar a `.continue()` si queda cursor. Crear almacenes o índices requiere actualización de versión. No reutilices una transacción terminada ni anuncies que se guardó justo después de `put`: la confirmación es asíncrona.

## 15. Los fallos que más tiempo te pueden hacer perder

- `length` es una propiedad: `lista.length`, sin `()`; los métodos sí llevan paréntesis.
- `map(n => { n * 2; })` devuelve elementos `undefined`: con llaves falta `return`.
- `array.forEach(...)` no devuelve un array transformado: para eso está `map`.
- `find` puede devolver `undefined`; antes de usar sus propiedades, compruébalo.
- El array vacío es truthy: para saber si tiene elementos, usa `array.length > 0`.
- `slice` copia; `splice` modifica. `sort` y `reverse` también modifican el original.
- Una referencia copiada con `const copia = original` apunta al mismo array; `[...original]` crea otro array, pero comparte sus objetos interiores.
- `Set` compara los nombres tal como están: normaliza antes de quitar duplicados.
- `Math.random()` no incluye el 1; para incluir ambos extremos enteros usa el `+ 1` en el tamaño del rango.
- Un getter se lee como propiedad; un método se llama con `()`. Un prefijo `_` no crea privacidad.
- No confundas `getDay()` con `getDate()`, ni el mes 0 con enero escrito como 1.
- Un `querySelector` con resultado `null` suele indicar selector equivocado o HTML aún sin cargar.
- `throw new Error("mensaje")` lanza un error; `try { ... } catch (error) { console.log(error.message); }` permite manejarlo, como en tu ejercicio de fechas.
- La consola muestra la salida y los errores; en esta prueba no hay que crear una interfaz para los resultados.
