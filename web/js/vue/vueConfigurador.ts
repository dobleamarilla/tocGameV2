var vueConfigurador = new Vue({
    el: '#vueConfigurador',
    template: 
    /*html*/`
    <div class="modal" id="modalConfigurador" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Configuración TOC V2</h5>
				</button>
			</div>
			<div class="modal-body">
				<div class="form-group row">
					<label for="inputImpresora" class="col-sm-3 col-form-label">Impresora</label>
					<div class="col-sm-9">
                        <select v-model="tipoImpresora" class="custom-select">
                            <option selected value="USB">USB</option>
                            <option value="SERIE">SERIE</option>
                        </select>
					</div>
				</div>
				<div class="form-group row">
					<label for="inputDatafono" class="col-sm-3 col-form-label">Datáfono</label>
					<div class="col-sm-9">
                        <select v-model="tipoDatafono" class="custom-select">
                            <option selected value="CLEARONE">CLEARONE</option>
                            <option value="3G">3G</option>
                        </select>
					</div>
				</div>
				<div v-if="tipoDatafono == 'CLEARONE'" class="form-group row">
                    <label for="inputDatafono" class="col-sm-3 col-form-label">Cliente</label>
                    <div class="col-sm-9">
                        <input v-model="clearOneCliente" type="text" class="form-control">
                    </div>
				</div>
				<div v-if="tipoDatafono == 'CLEARONE'" class="form-group row">
                    <label for="inputDatafono" class="col-sm-3 col-form-label">Tienda</label>
                    <div class="col-sm-9">
                        <input v-model="clearOneTienda" type="text" class="form-control">
                    </div>
				</div>
				<div v-if="tipoDatafono == 'CLEARONE'" class="form-group row">
                    <label for="inputDatafono" class="col-sm-3 col-form-label">TPV</label>
                    <div class="col-sm-9">
                        <input v-model="clearOneTpv" type="text" class="form-control">
                    </div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" @click="confirmar()">Confirmar</button>
				<button type="button" class="btn btn-danger" @click="reset()">Reset</button>
			</div>
		</div>
    </div>
</div>
                `,
    data () {
      return {
          tipoImpresora: '',
          tipoDatafono: '',
          clearOneCliente: '',
          clearOneTienda: '',
          clearOneTpv: ''
      }
    },
    methods: {
        abreModal()
        {
            if(toc.todoListo())
            {
                let parametros          = toc.getParametros();
                this.tipoImpresora      = parametros.tipoImpresora;
                this.tipoDatafono       = parametros.tipoDatafono;
                this.clearOneCliente    = parametros.clearOneCliente;
                this.clearOneTienda     = parametros.clearOneTienda;
                this.clearOneTpv        = parametros.clearOneTpv; 
                $('#modalConfigurador').modal();
            }
            else
            {
                vueToast.abrir("error", "No debes estar aquí");
            }
        },
        cerrarModal()
        {
            $('#modalConfigurador').modal('hide');
        },
        reset()
        {
            this.tipoImpresora = 'USB';
            this.tipoDatafono = 'CLEARONE';
        },
        confirmar() //CONFIRMADA
        {
            ipcRenderer.send('nueva-configuracion', {
                impresora: this.tipoImpresora, 
                datafono: this.tipoDatafono, 
                clearOneCliente: Number(this.clearOneCliente), 
                clearOneTienda: Number(this.clearOneTienda),
                clearOneTpv: Number(this.clearOneTpv)
            });
        }
    }
  });