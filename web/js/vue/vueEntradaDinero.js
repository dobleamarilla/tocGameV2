var vueEntradaDinero = new Vue({
    el: '#vueEntradaDinero',
    template: 
    /*html*/ `
<div class="modal" id="modalEntradaDinero" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Entrada de dinero</h5>
			</div>
			<div class="modal-body">
				<div class="form-group row">
					<label for="inputLicencia" class="col-sm-3 col-form-label">Cantidad €</label>
					<div class="col-sm-9">
						<input type="number" v-model="cantidad" class="form-control form-control-lg">
					</div>
				</div>
				<div class="form-group row">
					<label for="inputPassword" class="col-sm-3 col-form-label">Concepto</label>
					<div class="col-sm-9">
						<input type="text" v-model="concepto" class="form-control form-control-lg">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" @click="volverACaja()">VOLVER</button>
				<button type="button" class="btn btn-danger" @click="confirmarEntrada()">CONFIRMAR ENTRADA</button>
			</div>
		</div>
    </div>
</div>
                `,
    data() {
        return {
            cantidad: 0,
            concepto: 'Cambio'
        };
    },
    methods: {
        abreModal() {
            $('#modalEntradaDinero').modal();
        },
        cerrarModal() {
            $('#modalEntradaDinero').modal('hide');
        },
        confirmarEntrada() {
            const cantidadLimpia = Number(this.cantidad);
            let options = {
                buttons: ["&SÍ", "&NO"],
                message: "Confirmar entrada de " + cantidadLimpia + "€"
            };
            dialog.showMessageBox(remote.getCurrentWindow(), options, (res) => {
                if (res === 0) {
                    toc.nuevaEntradaDinero(this.cantidad, this.concepto);
                    this.cerrarModal();
                    vueToast.abrir('success', 'Entrada de dinero OK');
                }
                else {
                    if (res === 1) {
                        console.log("CANCELADA");
                    }
                }
            });
        },
        volverACaja() {
            this.cerrarModal();
            vueCaja.abreModal();
        }
    }
});
//# sourceMappingURL=vueEntradaDinero.js.map