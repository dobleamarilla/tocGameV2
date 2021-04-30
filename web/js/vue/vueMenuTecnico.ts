var vueMenuTecnico = new Vue({
    el: '#vueMenuTecnico',
    template:
    /*html*/`
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
                        <button type="button" @click="abrirConfigurador()" class="btn btn-dark btn-block w-100 ml-0" style="font-size: 25px; text-align: left !important;">1 - Configuración</button>
                        <button type="button" @click="quitarLicencia()" class="btn btn-success btn-block w-100 ml-0" style="font-size: 25px; text-align: left !important;">2 - Quitar licencia</button>
                        <button type="button" @click="actualizarTrabajadores()" class="btn btn-info btn-block w-100 ml-0" style="font-size: 25px; text-align: left !important;">3 - Actualizar trabajadores</button>
                        <button type="button" @click="testImpresora()" class="btn btn-info btn-block w-100 ml-0" style="font-size: 25px; text-align: left !important;">4 - Testear impresora</button>
                        <button type="button" @click="testVisor()" class="btn btn-info btn-block w-100 ml-0" style="font-size: 25px; text-align: left !important;">5 - Testear visor</button>
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

    methods: 
    {
        abrirModal() 
        {
            $('#modalMenuTecnico').modal();
        },
        cerrarModal()
        {
            $('#modalMenuTecnico').modal('hide');
        },
        abrirConfigurador()
        {
            this.cerrarModal();
            vueConfigurador.abreModal();
        },
        volver()
        {
            this.cerrarModal();
            toc.iniciar();
        },
        actualizarTrabajadores()
        {
            toc.actualizarTrabajadores();
            this.cerrarModal();            
        },
        quitarLicencia()
        {
            ipcRenderer.send("borrar-database");
        },
        testImpresora() {
            ipcRenderer.send("imprimirTestImpresora", {impresora: toc.getTipoImpresora()});
        },
        testVisor() {
            ipcRenderer.send("mostrarTestVisor");
        }
    }
});