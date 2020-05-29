var vueCobrar = new Vue({
    el: '#vueCobrar',
    template: 
    /*html*/ `
<div class="modal" id="modalVueCobrar" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 600px">
		<div class="modal-content">
			<div class="modal-body">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <img @click="cobrar(true)" src="assets/imagenes/img-efectivo.png" alt="Cobrar con efectivo" width="250px">
                    </div>
                    <div class="col-md-6 text-center">
                        <img @click="cobrar(false)" src="assets/imagenes/img-tarjetas.png" alt="Cobrar con tarjeta" width="250px">
                    </div>
                </div>
                <div class="row p-1">
                    <div class="col-md-12 text-center">
                        <span class="verTotal">{{total}} €</span>
                    </div>
                </div>
                <div class="row" v-bind:style="esperandoDatafono">
                    <div class="col-md-12 text-center">
                        <img src="assets/imagenes/loading.gif" alt="Esperando respuesta del datáfono">
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
        return {
            total: 0,
            arrayFichados: [],
            esperandoDatafono: { display: 'none' },
            esperando: false
        };
    },
    methods: {
        abreModal() {
            this.setEsperando(false);
            $('#modalVueCobrar').modal();
        },
        cerrarModal() {
            this.setEsperando(false);
            $('#modalVueCobrar').modal('hide');
        },
        prepararModalVenta(total, arrayFichados) {
            this.total = total;
            this.arrayFichados = arrayFichados;
        },
        cobrar(efectivo) {
            if (!this.esperando) {
                this.setEsperando(true);
                toc.crearTicket(efectivo);
            }
            else {
                vueToast.abrir('danger', 'Ya existe una operación en curso');
            }
        },
        setEsperando(res) {
            this.esperando = res;
        },
        activoEsperaDatafono() {
            this.esperandoDatafono.display = 'unset';
        },
        desactivoEsperaDatafono() {
            this.setEsperando(false);
            this.esperandoDatafono.display = 'none';
        }
    }
});
//# sourceMappingURL=vueCobrar.js.map