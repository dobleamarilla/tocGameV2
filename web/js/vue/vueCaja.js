var vueCaja = new Vue({
    el: '#vueCaja',
    template: 
    /*html*/ `
<div>
	<div class="modal" id="vueModalCaja" tabindex="-1" role="dialog">
		<div class="modal-dialog" style="max-width: 80%" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Listado de tickets</h5>
				</div>
				<div class="modal-body">
					<div class="row">
                        <div class="col-md-10">
							<div class="table-responsive" style="height: 400px;">
								<table class="table table-striped">
									<thead>
										<tr>
											<th scope="col">Número ticket</th>
											<th scope="col">Hora</th>
											<th scope="col">Efectivo/tarjeta</th>
											<th scope="col">Total</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) of listaTickets" @click="setItemCajaActivo(index)">
											<td>{{item._id}}</td>
											<td>{{item.timestamp}}</td>
											<td v-if="item.tarjeta === true">Tarjeta</td>
											<td v-else>Efectivo</td>
											<td>{{item.total}}</td>
										</tr>
									</tbody>
								</table>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-primary btn-block ml-0" @click="volverACaja()"><i class="fas fa-lock fa-2x"></i></button>
                            <button type="button" class="btn btn-secondary btn-block ml-0" @click="volverACaja()"><i class="fas fa-lock-open fa-2x"></i></button>
                            <button type="button" class="btn btn-success btn-block ml-0" @click="volverACaja()"><i class="fas fa-sign-in-alt fa-2x"></i></button>
                            <button type="button" class="btn btn-danger btn-block ml-0" @click="volverACaja()"><i class="fas fa-sign-out-alt fa-2x"></i></button>
                            <button type="button" class="btn btn-warning btn-block ml-0" @click="volverACaja()"><i class="fas fa-search-plus fa-2x"></i></button>
                            <button type="button" class="btn btn-info btn-block ml-0" @click="volverACaja()"><i class="fas fa-print fa-2x"></i></button>
                            <button type="button" class="btn btn-dark btn-block ml-0" @click="volverACaja()"><i class="fas fa-undo fa-2x"></i></button>                     
                        </div>
                    </div>
                </div>                
			</div>
		</div>
	</div>
</div>
    `,
    data() {
        return {
            caja: { display: 'unset' },
            salida: { display: 'none' },
            cierre: { display: 'none', 'text-align': 'center' },
            ticketActivo: null,
            listaTickets: null,
            infoDinero: [
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
                { valor: 0, style: '' },
            ],
            activoCierre: 0
        };
    },
    methods: {
        abreModal() {
            $('#vueModalCaja').modal();
        },
        cerrarModal() {
            $('#vueModalCaja').modal('hide');
        },
        vistaSalidas() {
            this.caja.display = 'none';
            this.salida.display = 'unset';
            this.cierre.display = 'none';
        },
        vistaCaja() {
            this.caja.display = 'unset';
            this.salida.display = 'none';
            this.cierre.display = 'none';
        },
        vistaCierre() {
            this.caja.display = 'none';
            this.salida.display = 'none';
            this.cierre.display = 'unset';
        },
        abrirModalCerrarCaja() {
            this.cerrarModal();
        },
        imprimirTicket() {
            toc.imprimirTicket(this.listaTickets[this.ticketActivo]._id);
        },
        cargarListaTickets(arrayTickets) {
            this.listaTickets = arrayTickets.reverse();
        },
        confirmarSalida() {
        },
        setActivo(x) {
            this.infoDinero[this.activoCierre].style = '';
            this.activoCierre = x;
            this.infoDinero[this.activoCierre].style = 'color: red;font-weight: bold;';
        },
        addNumero(x) {
            this.infoDinero[this.activoCierre].valor = Number(this.infoDinero[this.activoCierre].valor.toString() + x);
        },
        borrarNumero() {
            this.infoDinero[this.activoCierre].valor = Number(this.infoDinero[this.activoCierre].valor.toString().slice(0, -1));
        },
        confirmarCierre() {
            confirm("Se cerrará a caja... ¿CAMBIO CORRECTO?");
            {
                toc.cerrarCaja(this.getTotal, this.getDetalle);
            }
        },
        setItemCajaActivo(x) {
            this.ticketActivo = x;
        },
        borrarFuncion() {
            this.cerrarModal();
            vueSalidaDinero.abreModal();
        }
    },
    computed: {
        getTotal() {
            var total = 0;
            total += this.infoDinero[0].valor * 0.01;
            total += this.infoDinero[1].valor * 0.02;
            total += this.infoDinero[2].valor * 0.05;
            total += this.infoDinero[3].valor * 0.10;
            total += this.infoDinero[4].valor * 0.20;
            total += this.infoDinero[5].valor * 0.50;
            total += this.infoDinero[6].valor * 1;
            total += this.infoDinero[7].valor * 2;
            total += this.infoDinero[8].valor * 5;
            total += this.infoDinero[9].valor * 10;
            total += this.infoDinero[10].valor * 20;
            total += this.infoDinero[11].valor * 50;
            total += this.infoDinero[12].valor * 100;
            total += this.infoDinero[13].valor * 200;
            total += this.infoDinero[14].valor * 500;
            return total;
        },
        getDetalle() {
            var info = [
                { valor: this.infoDinero[0].valor * 0.01, unidades: this.infoDinero[0].valor },
                { valor: this.infoDinero[1].valor * 0.02, unidades: this.infoDinero[1].valor },
                { valor: this.infoDinero[2].valor * 0.05, unidades: this.infoDinero[2].valor },
                { valor: this.infoDinero[3].valor * 0.10, unidades: this.infoDinero[3].valor },
                { valor: this.infoDinero[4].valor * 0.20, unidades: this.infoDinero[4].valor },
                { valor: this.infoDinero[5].valor * 0.50, unidades: this.infoDinero[5].valor },
                { valor: this.infoDinero[6].valor * 1, unidades: this.infoDinero[6].valor },
                { valor: this.infoDinero[7].valor * 2, unidades: this.infoDinero[7].valor },
                { valor: this.infoDinero[8].valor * 5, unidades: this.infoDinero[8].valor },
                { valor: this.infoDinero[9].valor * 10, unidades: this.infoDinero[9].valor },
                { valor: this.infoDinero[10].valor * 20, unidades: this.infoDinero[10].valor },
                { valor: this.infoDinero[11].valor * 50, unidades: this.infoDinero[11].valor },
                { valor: this.infoDinero[12].valor * 100, unidades: this.infoDinero[12].valor },
                { valor: this.infoDinero[13].valor * 200, unidades: this.infoDinero[13].valor },
                { valor: this.infoDinero[14].valor * 500, unidades: this.infoDinero[14].valor },
            ];
            return info;
        }
    }
});
//# sourceMappingURL=vueCaja.js.map