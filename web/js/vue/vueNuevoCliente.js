var vueNuevoCliente = new Vue({
    el: '#vueNuevoCliente',
    template: 
    /*html*/ `
<div class="modal" id="modalNuevoCliente" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 600px">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Crear nuevo cliente</h5>
				</button>
			</div>
			<div class="modal-body">
				<div class="form-group row">
					<label class="col-sm-3 col-form-label">Nombre</label>
					<div class="col-sm-9">
						<input type="text" v-model="nombre" class="form-control form-control-lg">
					</div>
				</div>
				<div class="form-group row">
					<label for="inputPassword" class="col-sm-3 col-form-label">Nº Tarjeta</label>
					<div class="col-sm-9">
                        <input type="text" v-model="idTarjeta" class="form-control form-control-lg">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success btn-lg mr-0" @click="crearNuevoCliente()">CREAR</button>
				<button type="button" class="btn btn-danger btn-lg mr-0" @click="reset()">BORRAR</button>
				<button type="button" class="btn btn-secondary btn-lg" @click="cerrarModal()">SALIR</button>
			</div>
		</div>
	</div>
</div>
    <!-- Fin modal fichar -->
    `,
    data() {
        return {
            nombre: '',
            idTarjeta: ''
        };
    },
    methods: {
        abrirModal() {
            $('#modalNuevoCliente').modal();
            document.getElementById('inputBusqueda').focus();
        },
        cerrarModal() {
            $('#modalNuevoCliente').modal('hide');
        },
        reset() {
            toc.quitarClienteSeleccionado();
            toc.limpiarClienteVIP();
            this.nombre = '';
            this.idTarjeta = '';
        },
        crearNuevoCliente() {
            if (this.nombre.length > 3 && this.idTarjeta.length > 5) {
                toc.nuevoCliente(this.nombre, this.idTarjeta);
            }
            else {
                vueToast.abrir('error', 'Se requiere un mínimo de caracteres');
            }
        }
    }
});
//# sourceMappingURL=vueNuevoCliente.js.map