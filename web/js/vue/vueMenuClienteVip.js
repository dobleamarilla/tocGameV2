var vueMenuVip = new Vue({
    el: '#vueMenuVip',
    template: 
    /*html*/ `
<div class="modal" id="vueMenuVip" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 600px">
        <div class="modal-content">
            <div class="modal-header">
				<h5 class="modal-title">Menú cliente VIP</h5>
				</button>
			</div>
			<div class="modal-body">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <button @click="cerrarModal()" class="btn btn-primary">Nueva factura</button>
                    </div>
                    <div class="col-md-6 text-center">
                    <button class="btn btn-success">Pagar factura pendiente</button>
                    </div>
                </div>                
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary btn-lg" @click="cerrarModal()">Cancelar</button>
			</div>
		</div>
    </div>
</div>
    `,
    data() {
        return {};
    },
    methods: {
        abreModal() {
            $('#vueMenuVip').modal();
        },
        cerrarModal() {
            toc.peticionActivarTarifaEspecial();
            $('#vueMenuVip').modal('hide');
        }
    }
});
//# sourceMappingURL=vueMenuClienteVip.js.map