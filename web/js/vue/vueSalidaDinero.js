var vueSalidaDinero = new Vue({
    el: '#vueSalidaDinero',
    template: 
    /*html*/ `
<div class="modal" id="modalSalidaDinero" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Salida de dinero</h5>
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
                        <select v-model="concepto" class="custom-select" @change="selectOption($event)">
                            <option value="Entrega Diària" selected>ENTREGA DIARIA</option>
                            <option value="COMPRAS">COMPRAS</option>
                            <option value="OTROS">OTROS</option>
                        </select>
                        <br><br>
                        <input v-if="mostrarInput" type="text" class="form-control conceptoInput" id="inputBusqueda" placeholder="CONCEPTO">
					</div> 
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" @click="volverACaja()">VOLVER</button>
				<button type="button" class="btn btn-danger" @click="confirmarSalida()">CONFIRMAR SALIDA</button>
			</div>
		</div>
    </div>
</div>
                `,
    data() {
        return {
            cantidad: 0,
            concepto: 'Entrega Diària',
            valoresSelect: ["Entrega Diària", "COMPRAS"],
            mostrarInput: false
        };
    },
    methods: {
        abreModal() {
            $('#modalSalidaDinero').modal();
        },
        cerrarModal() {
            $('#modalSalidaDinero').modal('hide');
        },
        confirmarSalida() {
            const cantidadLimpia = Number(this.cantidad);
            if (!this.valoresSelect.includes(this.concepto)) {
                var conceptoInput = $(".conceptoInput").val();
                this.concepto = conceptoInput == '' ? "OTROS" : conceptoInput;
            }
            let options = {
                buttons: ["&SÍ", "&NO"],
                message: "Confirmar salida de " + cantidadLimpia + "€"
            };
            dialog.showMessageBox(options, (res) => {
                if (res === 0) {
                    toc.nuevaSalidaDinero(this.cantidad, this.concepto, 'SALIDA');
                    this.cerrarModal();
                    vueToast.abrir('success', 'Salida de dinero OK');
                }
                else {
                    if (res === 1) {
                        vueToast.abrir('info', 'Operación cancelada');
                    }
                }
            });
        },
        selectOption(event) {
            if (event.target.value == "OTROS") {
                this.mostrarInput = true;
            }
            else {
                this.mostrarInput = false;
            }
        },
        volverACaja() {
            this.cerrarModal();
            vueCaja.abreModal();
        }
    }
});
//# sourceMappingURL=vueSalidaDinero.js.map