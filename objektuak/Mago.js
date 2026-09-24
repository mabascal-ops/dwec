class Mago extends Heroe {
    constructor(nombre, nivel, poder) {
        super(nombre, nivel);
        this._poder= poder;
    }
    get poder() {
        return this._poder;
    }
    set poder(poder) {
        this._poder = poder;
    }

    saludo() {
        return this._nombre + " dice hola, es nivel " + this._nivel + " y tiene el poder " + this._poder;
    }
}