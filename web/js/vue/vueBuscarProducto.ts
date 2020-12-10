var vueBuscarProducto = new Vue({
    el: '#vueBuscarProducto',
    template:
    /*html*/`
    <!-- Inicio modal buscar productos -->
    <div class="modal" id="modalBuscarProductos" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 600px">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Buscar producto</h5>
				</button>
			</div>
			<div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mt-0">
                            <input id="inputBusqueda" class="form-control" type="text" v-model="busqueda" placeholder="Nombre del producto">
                        </div>
                    <div class="table-responsive" style="height: 400px;">
                         <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th class="clientesAnchoNombre" scope="col">Nombre</th>
                                        <th class="clientesAnchoBotones" scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="producto of productos">
                                        <td class="clientesAnchoNombre">{{producto.nombre}}</td>
                                        <td class="clientesAnchoBotones">
                                            <a href="#" class="btn btn-primary" @click="seleccionar(producto)">Seleccionar</a>
                                            <span v-if="producto.esSumable === true">Precio: {{producto.precioConIva}}€</span>
                                            <span v-else>Precio: {{producto.precioConIva}}€/Kg</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary btn-lg" @click="volver()">SALIR</button>
				<button type="button" class="btn btn-secondary btn-lg" @click="reset()">BORRAR</button>
			</div>
		</div>
	</div>
</div>
    <!-- Fin modal buscar productos -->
    `,
    data() 
    {
        return {
            productos: [],
            busqueda: ''
        }
    },
    methods: 
    {
        abrirModal() 
        {
            $('#modalBuscarProductos').modal();
            document.getElementById('inputBusqueda').focus();
        },
        cerrarModal()
        {
            $('#modalBuscarProductos').modal('hide');
            this.busqueda = '';
        },
        buscarArticulo() //COMPROBADA
        {
            ipcRenderer.send('buscar-articulo', this.busqueda);
        },
        seleccionar(producto) // COMPROBADA
        {
            this.cerrarModal();
            toc.seleccionarArticulo(producto);
            this.buscarArticulo();
        },
        volver()
        {
            this.cerrarModal();
            toc.iniciar();
        },
        setProductos(aux)
        {
            this.productos = aux;
        },
        getPrecioProducto(nombre) {
            for(let i = 0; i < this.productos.length; i++) {
                if(this.productos[i].nombre == nombre) return this.productos[i].precioConIva;
            }
            // Esto devuelve 0 en el caso de no encontrar el producto, pero muy difícilmente entrara aquí, pero está por si acaso. 
            return 0;
        },
        reset()
        {
            this.busqueda = '';
        }
    },
    watch: 
    {
        busqueda() 
        {
            this.buscarArticulo();
        }
    }
});