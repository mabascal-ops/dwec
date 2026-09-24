class Heroe {
    constructor(nombre, nivel = 1) {
        this._nombre = nombre;
        this._nivel = nivel;
    }
    saludo() {
        return this._nombre + " dice hola";
    }

    get nombre() {
        return this._nombre;
    }
    get nivel() {
        return this._nivel;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    set nivel(nivel) {
        this._nivel = nivel;
    }
}