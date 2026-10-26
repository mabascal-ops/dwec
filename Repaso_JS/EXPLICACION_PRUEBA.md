# Prueba de castellano: solución explicada

La prueba original es «Gestión de participantes»: 45 minutos, temas 1, 2 y 3, diez puntos. La solución completa está en [Prueba_resuelta/script.js](Prueba_resuelta/script.js), con comentarios que explican cada instrucción y la sintaxis que utiliza. No quedan apartados por resolver.

Para verla funcionar, abre [Prueba_resuelta/index.html](Prueba_resuelta/index.html) y pulsa **F12 → Consola**. Funciona sin Internet y sin servidor porque utiliza un script clásico con `defer`. La página solo indica que mires la consola, tal como pide el enunciado.

## Qué se pide y dónde se resuelve

| Apartado | Puntos | Herramientas | Resultado |
| --- | ---: | --- | --- |
| 1. Normalizar nombres | 1,5 | Función, `trim`, `toLowerCase`, `charAt`, `toUpperCase`, `slice`, `map` | Array de ocho nombres con formato uniforme. |
| 2. Quitar repetidos | 1 | `Set` y spread | Array de cinco nombres diferentes. |
| 3. Crear participantes | 2 | `class`, `constructor`, `this`, método, `new`, `map` | Cinco objetos con nombre y cero puntos iniciales. |
| 4. Asignar puntos | 1,5 | `forEach`, `Math.random`, `Math.floor` | Cada objeto recibe un entero de 0 a 10 y se muestra su descripción. |
| 5. Trabajar con arrays | 3 | `filter`, `map`, `find`, `reduce`, división | Aprobados, nombres, Mikel, media y mejor participante. |
| 6. Mostrar resumen | 1 | `Date`, `toLocaleString`, plantilla literal | Fecha y hora, cantidades, media y mejor participante. |

## El recorrido de los datos

```text
datos: ocho textos con formatos distintos
  → map(normalizarNombre): ocho textos uniformes
  → [...new Set(...)]: cinco textos sin repeticiones
  → map(nombre => new Participante(nombre, 0)): cinco objetos
  → forEach: se cambian los puntos de esos objetos
  → filter / map / find / reduce: resultados del resumen
```

Primero se normaliza y después se eliminan duplicados. `Set` distingue mayúsculas y espacios: si se utilizara directamente sobre `datos`, consideraría diferentes `"  ane "` y `"Ane"`.

Un `map` **no sirve solo para hacer operaciones matemáticas**. Transforma cada elemento en lo que devuelva su callback. Aquí lo usamos para tres cosas: texto desordenado → texto limpio; nombre → objeto; objeto → nombre.

`forEach` sirve para asignar las notas y mostrar descripciones. No necesitamos guardar su retorno: devuelve `undefined`.

## Cómo leer las partes que suelen costar

**`map(normalizarNombre)`**: entregamos la función. `map` la llama por nosotros con cada elemento. Escribir `map(normalizarNombre())` la ejecutaría inmediatamente sin pasarle un nombre y no entregaría el callback correcto.

**`new Participante(nombre, 0)`**: crea un objeto y ejecuta su constructor. Por ejemplo, con `"Ane"` queda un objeto con `nombre: "Ane"` y `puntos: 0`, que además puede usar el método `descripcion()`.

**`Math.floor(Math.random() * 11)`**: `Math.random()` está entre 0 incluido y 1 excluido. Al multiplicar por 11, está entre 0 incluido y 11 excluido. Al redondear hacia abajo, los enteros posibles son 0, 1, 2, …, 10. La fórmula general para enteros entre `min` y `max`, ambos incluidos, es `Math.floor(Math.random() * (max - min + 1)) + min`.

**`reduce(..., 0)` para sumar**: el acumulador empieza en cero y cada `return` establece su nuevo valor. Con notas de ejemplo `7, 4, 8, 3, 10`, avanza así:

| Vuelta | Suma anterior | Puntos actuales | Nueva suma |
| --- | ---: | ---: | ---: |
| Ane | 0 | 7 | 7 |
| Jon | 7 | 4 | 11 |
| Mikel | 11 | 8 | 19 |
| Irati | 19 | 3 | 22 |
| Leire | 22 | 10 | 32 |

La media es `32 / 5 = 6.4`. Se divide entre **todos** los participantes, no entre los aprobados.

**`reduce(..., null)` para el máximo**: el acumulador guarda al mejor objeto encontrado. Primero no hay candidato (`null`); después se conserva Ane, se sustituye por Mikel cuando aparece el 8 y finalmente por Leire cuando aparece el 10. Se devuelve el **objeto**, no solo su puntuación. Por eso después podemos llamar a `mejor.descripcion()`.

La condición `candidato === null || participante.puntos > candidato.puntos` funciona por cortocircuito: si la izquierda es verdadera, no se evalúa la derecha. Así no intentamos consultar `null.puntos`.

## Ejemplo de salida explicado

Con las notas de ejemplo anteriores y una fecha ilustrativa, el bloque final sería:

```text
RESULTADO DEL SORTEO
Fecha: 27/10/2026, 12:35:00
Participantes: 5
Aprobados: 3
Media: 6.4
Mejor participante: Leire - 10 puntos
```

Las notas y la fecha de arriba son ilustrativas. El programa genera notas nuevas y obtiene la fecha real en cada ejecución. Es correcto que no salga siempre Leire ni siempre una media de 6.4.

## Detalles que evitan fallos al adaptar esta solución

- Un nombre es un **string**; un participante es un **objeto**. Después de crear los objetos, se usa `participante.nombre` y `participante.puntos`.
- `filter` conserva todos los que cumplen; `find` devuelve solo el primero, o `undefined` si no existe.
- Para aprobar se utiliza `>= 5`; con `> 5` se excluiría el cinco.
- `descripcion` es la función; `descripcion()` es su ejecución y entrega el texto.
- `const participantes` permite cambiar `participante.puntos`; lo que impide es reasignar la variable `participantes` a otro array.
- Para empates en el máximo se conserva al primero. El enunciado no impone otro criterio.
- No hace falta ordenar el array para hallar el máximo. Así conservamos el orden original.
- `media.toFixed(1)` solo se usa al mostrar. Devuelve texto; `media` sigue siendo un número.
- La solución también contempla que no exista Mikel o que se reutilice con un array vacío.

Los [apuntes generales](APUNTES_JS.md) contienen las variantes y el resto del temario ya explicado, sin ejercicios pendientes.
