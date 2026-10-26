/*
PRUEBA CORTA DE REPASO — GESTIÓN DE PARTICIPANTES
Solución completa y comentada de los seis apartados del enunciado.

Todo se resuelve en este script y se muestra por consola.
El index.html es una copia del proporcionado: no necesita cambios.
Abre index.html y pulsa F12 → Consola. Al recargar habrá otras notas.

Guía de sintaxis que se repite durante toda la solución:
- const nombre = valor declara una variable que no se va a reasignar.
- Un array se escribe entre []; sus elementos se separan con comas.
- El punto accede a una propiedad o un método: datos.length, datos.map().
- Los paréntesis llaman a una función o método: descripcion().
- Las llaves delimitan el cuerpo de funciones, clases y condicionales.
- // introduce un comentario; estos comentarios no se ejecutan.
*/

// Datos originales del enunciado: ocho textos, con espacios y repeticiones.
// No escribimos directamente los cinco nombres finales: debemos obtenerlos.
const datos = [
    "  ane ",
    "JON",
    "mikel",
    "Ane",
    "  irati",
    "jon ",
    "LEIRE",
    "mikel"
];

// ======================================================
// 1. NORMALIZACIÓN DE NOMBRES — 1,5 puntos
// ======================================================

// function declara una función reutilizable llamada normalizarNombre.
// nombre es su parámetro: recibe un texto distinto en cada llamada.
function normalizarNombre(nombre) {
    // trim() devuelve el texto sin espacios en los extremos.
    // toLowerCase() convierte ese resultado a minúsculas.
    // Encadenamos métodos: el segundo actúa sobre lo que devuelve el primero.
    // Ejemplo: "  aNE " → "aNE" → "ane".
    // Los strings son inmutables: guardamos el resultado en limpio.
    const limpio = nombre.trim().toLowerCase();

    // charAt(0) obtiene la primera letra: los índices empiezan en 0.
    // toUpperCase() convierte SOLO esa primera letra a mayúscula.
    // slice(1) devuelve desde la segunda letra hasta el final.
    // + concatena estos dos textos: "A" + "ne" → "Ane".
    // return entrega el nombre terminado a quien llamó a la función.
    // charAt también permite que una cadena vacía devuelva "", sin romperse.
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
}

// map() crea un NUEVO array transformando cada elemento del array original.
// Le pasamos la función SIN (): map se encargará de llamarla con cada nombre.
// Equivale a datos.map(nombre => normalizarNombre(nombre)).
const nombresNormalizados = datos.map(normalizarNombre);

// console.log muestra una etiqueta y el valor que queremos comprobar.
// Resultado: ["Ane", "Jon", "Mikel", "Ane", "Irati", "Jon", "Leire", "Mikel"].
console.log("1. Nombres normalizados:", nombresNormalizados);

// ======================================================
// 2. ELIMINAR DUPLICADOS — 1 punto
// ======================================================

// new Set(array) crea una colección donde cada valor aparece una sola vez.
// Debemos normalizar ANTES: "JON" y "jon " serían valores diferentes.
// ... es spread: extrae los valores del Set.
// Los [] exteriores reúnen esos valores en un nuevo array.
// Set conserva el orden de la primera aparición de cada nombre.
const nombresUnicos = [...new Set(nombresNormalizados)];

// Resultado: ["Ane", "Jon", "Mikel", "Irati", "Leire"].
console.log("2. Nombres sin duplicados:", nombresUnicos);

// ======================================================
// 3. CLASE PARTICIPANTE — 2 puntos
// ======================================================

// class define el molde de los objetos que vamos a crear.
// Por convención, los nombres de las clases empiezan con mayúscula.
class Participante {
    // constructor se ejecuta automáticamente al hacer new Participante(...).
    // Recibe el nombre y los puntos iniciales de ese objeto concreto.
    constructor(nombre, puntos) {
        // this representa la instancia que estamos construyendo.
        // this.nombre es su propiedad; nombre es el parámetro recibido.
        this.nombre = nombre;
        this.puntos = puntos;
    }

    // Dentro de una clase, un método se escribe sin la palabra function.
    // Este método devuelve texto; por sí solo no lo muestra por consola.
    descripcion() {
        // Los backticks permiten insertar expresiones mediante ${...}.
        // Por ejemplo, si el objeto tiene Ane y 7, devuelve "Ane - 7 puntos".
        return `${this.nombre} - ${this.puntos} puntos`;
    }
}

// map() transforma cada nombre (string) en un objeto Participante.
// nombre => ... es una función flecha con un parámetro.
// Al no tener llaves, devuelve implícitamente la expresión de la derecha.
// new crea una instancia nueva; pasamos el nombre y 0 puntos al constructor.
// participantes será un array de cinco OBJETOS, no de cinco textos.
const participantes = nombresUnicos.map(nombre => new Participante(nombre, 0));

// ======================================================
// 4. ASIGNACIÓN DE PUNTUACIONES — 1,5 puntos
// ======================================================

// forEach() ejecuta su callback una vez por cada participante.
// Aquí queremos modificar los objetos existentes, sin generar otro array.
participantes.forEach(participante => {
    // Math.random() devuelve un número >= 0 y < 1.
    // Multiplicando por 11 obtenemos un número >= 0 y < 11.
    // Math.floor() redondea hacia abajo: los resultados son 0, 1, ..., 10.
    // Multiplicar por 10 dejaría fuera el 10; sumar 1 dejaría fuera el 0.
    // = guarda la nueva puntuación en la propiedad puntos del objeto.
    participante.puntos = Math.floor(Math.random() * 11);
});

console.log("4. Participantes con sus puntuaciones:");

// Recorremos de nuevo para mostrar los cinco objetos después de puntuarlos.
participantes.forEach(participante => {
    // descripcion() llama al método; console.log muestra el texto devuelto.
    console.log(participante.descripcion());
});

// participantes es const: no podemos asignarle otro array.
// Sí podemos cambiar las propiedades de los objetos que contiene.

// ======================================================
// 5. TRABAJO CON ARRAYS — 3 puntos
// ======================================================

// 5.a) filter() devuelve un array con los elementos que cumplen la condición.
// >= incluye el 5: aprobamos si puntos es mayor O IGUAL que 5.
// Conservamos los objetos originales; no los convertimos a nombres.
const aprobados = participantes.filter(participante => participante.puntos >= 5);

// Solo para mostrarlos de forma legible, transformamos sus objetos en textos.
// La variable aprobados sigue conteniendo objetos Participante.
console.log("5.a) Aprobados:", aprobados.map(participante => participante.descripcion()));

// 5.b) map() extrae el nombre de cada objeto y crea un array de strings.
// Esta es otra transformación: antes string → objeto; ahora objeto → string.
const nombres = participantes.map(participante => participante.nombre);
console.log("5.b) Solo nombres:", nombres);

// 5.c) find() devuelve el PRIMER objeto que cumple la condición.
// === compara estrictamente: buscamos exactamente el nombre "Mikel".
// Si no lo encuentra devuelve undefined, no un array vacío.
const mikel = participantes.find(participante => participante.nombre === "Mikel");

// Un objeto encontrado se evalúa como verdadero; undefined, como falso.
// Comprobamos antes de llamar a descripcion() para evitar un error.
if (mikel) {
    console.log("5.c) Mikel:", mikel.descripcion());
} else {
    console.log("5.c) No existe ningún participante llamado Mikel.");
}

// 5.d) reduce() recorre el array manteniendo un resultado acumulado.
// suma contiene lo sumado hasta ahora; participante es el objeto de esta vuelta.
// El 0 después de la coma es el valor INICIAL de suma.
// Devolvemos la suma anterior más los puntos actuales en cada vuelta.
// Si las notas fueran 7, 4, 8, 3, 10: 0 → 7 → 11 → 19 → 22 → 32.
const totalPuntos = participantes.reduce((suma, participante) => {
    return suma + participante.puntos;
}, 0);

// length es el número de elementos y se escribe sin paréntesis.
// Media = total de puntos / número de participantes.
// El ternario tiene forma condición ? valorSiCierto : valorSiFalso.
// En esta prueba hay cinco participantes; la comprobación también evita 0/0
// si se reutiliza la solución con un array vacío.
const media = participantes.length > 0 ? totalPuntos / participantes.length : 0;
console.log("5.d) Media de puntos:", media);

// 5.e) Otro reduce(), esta vez acumulando un OBJETO en lugar de un número.
// Inicializamos candidato a null: todavía no hay un mejor participante.
// En cada vuelta comparamos el participante actual con el mejor anterior.
const mejor = participantes.reduce((candidato, participante) => {
    // || significa O; si todavía no hay candidato, elegimos el primero.
    // El cortocircuito evita leer candidato.puntos cuando candidato es null.
    // Después solo sustituimos al candidato si encontramos más puntos.
    if (candidato === null || participante.puntos > candidato.puntos) {
        return participante;
    }

    // Si el actual no mejora la puntuación, mantenemos el candidato anterior.
    // Con >, en caso de empate gana el primero en el orden del array.
    return candidato;
}, null);

// El enunciado no fija cómo resolver empates; conservamos al primer máximo.
// No ordenamos participantes ni alteramos su orden para encontrar el mejor.
const descripcionMejor = mejor ? mejor.descripcion() : "Sin participantes";
console.log("5.e) Mejor participante:", descripcionMejor);

// ======================================================
// 6. RESULTADO FINAL Y FECHA — 1 punto
// ======================================================

// new Date() crea un objeto con la fecha y hora actuales del equipo.
// No fijamos la fecha del ejemplo del enunciado: debe ser la actual.
const fechaResultado = new Date();

// toLocaleString("es-ES") convierte la fecha y hora a un texto legible.
// En el navegador utiliza la zona horaria del equipo.
// El enunciado permite que el formato no sea idéntico al de su ejemplo.
const fechaLegible = fechaResultado.toLocaleString("es-ES");

// toFixed(1) muestra un decimal y devuelve un STRING, útil para presentar.
// media conserva su valor numérico: no la sustituimos por el texto formateado.
// Los backticks conservan los saltos de línea y ${...} inserta los valores.
// Todos los resultados del resumen proceden de los cálculos anteriores.
console.log(`RESULTADO DEL SORTEO
Fecha: ${fechaLegible}
Participantes: ${participantes.length}
Aprobados: ${aprobados.length}
Media: ${media.toFixed(1)}
Mejor participante: ${descripcionMejor}`);
