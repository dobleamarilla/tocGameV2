var vueTecladoTkrs = new Vue({
    el: '#vueTecladoTkrs',
    template: 
    /*html*/ `
<div class="modal" id="vueTecladoTkrs" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Importe del ticket restaurant</h5>
			</div>
			<div class="modal-body">
				<div class="form-group row">
					<label for="inputLicencia" class="col-sm-3 col-form-label">Cantidad €</label>
					<div class="col-sm-9">
						<input type="number" v-model="cantidad" class="form-control form-control-lg">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" @click="volverAPago()">CANCELAR</button>
				<button type="button" class="btn btn-success" @click="configurarCantidad()">ACEPTAR</button>
			</div>
		</div>
    </div>
</div>
                `,
    data() {
        return {
            cantidad: '',
        };
    },
    methods: {
        abreModal() {
            $('#vueTecladoTkrs').modal();
        },
        cerrarModal() {
            $('#vueTecladoTkrs').modal('hide');
        },
        configurarCantidad() {
            const cantidadLimpia = Number(this.cantidad);
            if (cantidadLimpia > 0) {
                vueCobrar.setTotalTkrs(cantidadLimpia);
                this.volverAPago();
            }
            else {
                vueToast('error', 'Importe ticket restaurant incorrecto');
            }
        },
        volverAPago() {
            this.cerrarModal();
            vueCobrar.mostrarModal();
        }
    }
});
//# sourceMappingURL=vueTecladoTkrs.js.map