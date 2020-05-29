var vueMenuPrincipal = new Vue({
    el: '#vueMenuPrincipal',
    template:
    /*html*/`
    <!-- Inicio modal fichar -->
    <div class="modal" id="modalMenuPrincipal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 600px">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Menú principal</h5>
				</button>
			</div>
			<div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <button type="button" @click="menuCaja()" class="btn btn-dark btn-block w-100 ml-0" style="font-size: 35px;">1 - Caja</button>
                        <button type="button" @click="menuPedidos()" class="btn btn-success btn-block w-100 ml-0" style="font-size: 35px;">2 - Pedidos</button>
                        <button type="button" class="btn btn-warning btn-block w-100 ml-0" style="font-size: 35px;">3 - Configuración</button>
                        <button type="button" class="btn btn-info btn-block w-100 ml-0" style="font-size: 35px;">4 - Datos</button>
                    </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" @click="volver()">SALIR</button>
			</div>
		</div>
	</div>
</div>
    <!-- Fin modal fichar -->
    `,
    // data() 
    // {
    //     return {
            
    //     }
    // },
    methods: 
    {
        abrirModal() 
        {
            $('#modalMenuPrincipal').modal();
        },
        cerrarModal()
        {
            $('#modalMenuPrincipal').modal('hide');
        },
        menuCaja()
        {
            this.cerrarModal();
            toc.abrirModalCaja();
        },
        menuPedidos()
        {
            vuePedidos.getUrl();
            this.cerrarModal();
            vuePedidos.abrirModal();
        },
        volver()
        {
            this.cerrarModal();
            toc.iniciar();
        }
    }
});