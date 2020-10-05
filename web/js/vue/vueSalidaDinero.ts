var vueSalidaDinero = new Vue({
    el: '#vueSalidaDinero',
    template: 
    /*html*/`
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
                        <select v-model="concepto" class="custom-select">
                            <option selected>ENTREGA DIARIA</option>
                            <option>COMPRAS</option>
                            <option>OTROS</option>
                    </select>
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
    data () {
      return {
          cantidad: 0,
          concepto: 'ENTREGA DIARIA'
      }
    },
    methods: {
        abreModal()
        {
            $('#modalSalidaDinero').modal();
        },
        cerrarModal()
        {
            $('#modalSalidaDinero').modal('hide');
        },
        confirmarSalida() //CONFIRMADA
        {
            const cantidadLimpia = Number(this.cantidad);
            let options = {
                buttons: ["&SÍ","&NO"],
                message: "Confirmar salida de " + cantidadLimpia + "€"
            }
            
            dialog.showMessageBox(remote.getCurrentWindow(), options, (res) => {
             if (res === 0)
             {
                toc.nuevaSalidaDinero(this.cantidad, this.concepto, 'SALIDA');
                this.cerrarModal();
                vueToast.abrir('success', 'Salida de dinero OK');
             }
             else
             {
                 if(res === 1)
                 {
                    console.log("CANCELADA");
                 }
             }
            })
    
        },
        volverACaja()
        {
            this.cerrarModal();
            vueCaja.abreModal();
        }
    }
  });