"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cesta {
    constructor() {
        this.total = 0;
    }
    imprimir() {
        console.log("El total de la cesta es: ", this.total);
    }
    aumentar() {
        this.total++;
        this.imprimir();
    }
}
const objCesta = new Cesta();
exports.objCesta = objCesta;
//# sourceMappingURL=prueba.js.map