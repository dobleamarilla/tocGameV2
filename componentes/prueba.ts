class Cesta{
    public total = 0;

    imprimir(){
        console.log("El total de la cesta es: ", this.total);
    }
    aumentar(){
        this.total++;
        this.imprimir();
    }
}
const objCesta = new Cesta();
export {objCesta};