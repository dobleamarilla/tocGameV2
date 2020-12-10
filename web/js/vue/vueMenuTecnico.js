var vueMenuTecnico = new Vue({
    el: '#vueMenuTecnico',
    template: 
    /*html*/ `
    <!-- Inicio modal menu técnico -->
    <div class="modal" id="modalMenuTecnico" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 500px">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Menú técnico</h5>
				</button>
			</div>
			<div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <button type="button" @click="abrirConfigurador()" class="btn btn-dark btn-block w-100 ml-0" style="font-size: 35px; text-align: left !important;">1 - Configuración</button>
                        <button type="button" @click="quitarLicencia()" class="btn btn-success btn-block w-100 ml-0" style="font-size: 35px; text-align: left !important;">2 - Quitar licencia</button>
                    </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" @click="volver()">SALIR</button>
			</div>
		</div>
	</div>
</div>
    <!-- Fin modal menu técnico -->
    `,
    methods: {
        abrirModal() {
            $('#modalMenuTecnico').modal();
        },
        cerrarModal() {
            $('#modalMenuTecnico').modal('hide');
        },
        abrirConfigurador() {
            this.cerrarModal();
            vueConfigurador.abreModal();
        },
        volver() {
            this.cerrarModal();
            toc.iniciar();
        }
    }
});
//# sourceMappingURL=vueMenuTecnico.js.map