var vueInstallWizard = new Vue({
    el: '#vueInstallWizard',
    template: 
    /*html*/ `
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
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" @click="confirmar()">Confirmar</button>
				<button type="button" class="btn btn-danger" @click="reset()">Reset</button>
			</div>
		</div>
    </div>
</div>
                `,
    data() {
        return {
            licencia: '',
            password: '',
            tipoImpresora: 'USB',
            tipoDatafono: 'CLEARONE'
        };
    },
    methods: {
        abreModal() {
            $('#modalInstallWizard').modal({ backdrop: 'static', keyboard: false });
        },
        cerrarModal() {
            $('#modalInstallWizard').modal('hide');
        },
        reset() {
            this.licencia = '';
            this.password = '';
            this.tipoImpresora = 'USB';
            this.tipoDatafono = 'CLEARONE';
        },
        confirmar() {
            vueToast.abrir("normal", "Petición al servidor enviada");
            toc.setTipoDatafono = this.tipoDatafono;
            toc.setTipoImpresora = this.tipoImpresora;
            socket.emit('install-licencia', { numLicencia: Number(this.licencia), password: this.password });
        }
    }
});
//# sourceMappingURL=installWizard.js.map