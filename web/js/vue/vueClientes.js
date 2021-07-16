var vueClientes = new Vue({
    el: '#vueClientes',
    template: 
    /*html*/ `
    <!-- Inicio modal fichar -->
    <div class="modal" id="modalClientes" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog" role="document" style="max-width: 650px">
		<div class="modal-content">
			<div class="modal-header">
                <button type="button" class="btn btn-warning btn-lg mr-0" @click="selectGlovo()">Glovo</button>
                <button type="button" class="btn btn-info btn-lg mr-0" @click="selectDeliveroo()">Deliveroo</button>
                <button type="button" class="btn btn-success btn-lg mr-0" @click="nuevoCliente()">NUEVO</button>
				<button type="button" class="btn btn-danger btn-lg mr-0" @click="reset()">RESET</button>
				<button type="button" class="btn btn-secondary btn-lg" @click="volver()">SALIR</button>
			</div>
			<div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mt-0">
                            <input id="inputBusqueda" class="form-control" type="text" v-model="busqueda" placeholder="Nombre del cliente">
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
                                    <tr v-for="cliente of clientes">
                                        <td class="clientesAnchoNombre">{{cliente.nombre}}</td>
                                        <td class="clientesAnchoBotones">
                                            <a href="#" class="btn btn-primary" @click="seleccionar(cliente)">Seleccionar</a>
                                            <a href="#" class="btn btn-info" @click="consultarPuntos(cliente)">Consultar puntos</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	</div>
</div>
    <!-- Fin modal fichar -->
    `,
    data() {
        return {
            clientes: [],
            busqueda: ''
        };
    },
    methods: {
        abrirModal() {
            $('#modalClientes').modal();
            document.getElementById('inputBusqueda').focus();
        },
        cerrarModal() {
            this.busqueda = '';
            $('#modalClientes').modal('hide');
        },
        buscarCliente() {
            ipcRenderer.send('buscar-clientes', this.busqueda);
        },
        seleccionar(cliente) {
            this.cerrarModal();
            toc.seleccionarCliente(cliente);
            this.buscarCliente();
        },
        volver() {
            this.cerrarModal();
            toc.iniciar();
        },
        setClientes(aux) {
            this.clientes = aux;
        },
        consultarPuntos(cliente) {
            getPuntosCliente(cliente.id);
        },
        reset() {
            toc.quitarClienteSeleccionado();
            toc.limpiarClienteVIP();
            this.busqueda = '';
            document.getElementById('inputBusqueda').focus();
        },
        nuevoCliente() {
            this.cerrarModal();
            vueNuevoCliente.abrirModal();
        },
        selectGlovo() {
            this.seleccionar({ id: 'CliBoti_000_{A83B364B-252F-464B-B0C3-AA89DA258F64}', nombre: 'GLOVOAPP23, S.L.', tarjetaCliente: '' });
            toc.peticionActivarTarifaEspecial();
        },
        selectDeliveroo() {
            this.seleccionar({ id: 'CliBoti_000_{3F7EF049-80E2-4935-9366-0DB6DED30B67}', nombre: 'ROOFOODS SPAIN, S.L.U.- DELIVEROO', tarjetaCliente: '' });
            toc.peticionActivarTarifaEspecial();
        }
    },
    watch: {
        busqueda() {
            this.buscarCliente();
        }
    }
});
//# sourceMappingURL=vueClientes.js.map