declare var Vue: any;
declare var $: any;

var vueInstallWizard = new Vue({
    el: '#vueInstallWizard',
    template: 
    /*html*/`
<div class="modal" id="modalInstallWizard" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Configuración TOC V2</h5>
				</button>
			</div>
			<div class="modal-body">
				<div class="form-group row">
					<label for="inputLicencia" class="col-sm-3 col-form-label">Licencia</label>
					<div class="col-sm-9">
						<input v-model="licencia" type="text" class="form-control" id="xxxxxxx">
					</div>
				</div>
				<div class="form-group row">
					<label for="inputPassword" class="col-sm-3 col-form-label">Contraseña</label>
					<div class="col-sm-9">
						<input v-model="password" type="password" class="form-control" id="xxxx">
					</div>
				</div>
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
                <div class="form-group row">
					<label for="inputImpresoraCafe" class="col-sm-3 col-form-label">Impresora cafeteria</label>
					<div class="col-sm-9">
                        <select v-model="impresoraCafeteria" class="custom-select">
                            <option selected value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
					</div>
				</div>
                <div class="row" v-if="esperando">
                    <img src="assets/imagenes/loading.gif" style="display:block;margin:auto;" alt="Esperando respuesta del servidor">
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
          licencia: '',
          password: '',
          tipoImpresora: 'USB',
          tipoDatafono: 'CLEARONE',
          impresoraCafeteria: 'NO',
          esperando: false
      }
    },
    methods: {
        abreModal()
        {
            $('#modalInstallWizard').modal({backdrop: 'static', keyboard: false})  
        },
        cerrarModal()
        {
            $('#modalInstallWizard').modal('hide');
        },
        reset()
        {
            this.licencia = '';
            this.password = '';
            this.tipoImpresora = 'USB';
            this.tipoDatafono = 'CLEARONE';
            this.impresoraCafeteria = 'NO';
        },
        confirmar() //CONFIRMADA
        {
            if(!toc.todoListo())
            {
                vueToast.abrir("normal", "Petición al servidor enviada");
                toc.setTipoDatafono(this.tipoDatafono);
                toc.setTipoImpresora(this.tipoImpresora);
                toc.setImpresoraCafeteria(this.impresoraCafeteria);
                socket.emit('install-licencia', {numLicencia: Number(this.licencia), password: this.password});
                this.esperando = true;
            }
            else
            {
                vueToast.abrir("danger", "Ya hay una licencia configurada. Borra la licencia para poder cargar otra");
            }
        }
    }
  });