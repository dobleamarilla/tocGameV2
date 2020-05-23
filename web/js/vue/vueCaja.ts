var vueCaja = new Vue({
    el: '#vueCaja',
    template: 
    /*html*/`
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
										<tr v-for="(item, index) of listaTickets" v-bind:class="{estiloActivoTicketCaja: index === ticketActivo}" @click="setItemCajaActivo(index)">
											<td>{{item._id}}</td>
											<td>{{convertirFecha(item.timestamp)}}</td>
											<td v-if="item.tarjeta === true">Tarjeta</td>
											<td v-else>Efectivo</td>
											<td>{{item.total.toFixed(2)}} €</td>
										</tr>
									</tbody>
								</table>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-primary btn-block ml-0" @click="abrirModalCerrarCaja()"><i class="fas fa-lock fa-2x"></i></button>
                            <button type="button" class="btn btn-secondary btn-block ml-0" @click="abrirModalAbrirCaja()"><i class="fas fa-lock-open fa-2x"></i></button>
                            <button type="button" class="btn btn-success btn-block ml-0" @click="abrirModalEntradaDinero()"><i class="fas fa-sign-in-alt fa-2x"></i></button>
                            <button type="button" class="btn btn-danger btn-block ml-0" @click="abrirModalSalidaDinero()"><i class="fas fa-sign-out-alt fa-2x"></i></button>
                            <button type="button" class="btn btn-warning btn-block ml-0" @click="volverACaja()"><i class="fas fa-search-plus fa-2x"></i></button>
                            <button type="button" class="btn btn-info btn-block ml-0" @click="imprimirTicket()"><i class="fas fa-print fa-2x"></i></button>
                            <button type="button" class="btn btn-dark btn-block ml-0" @click="cerrarModal()"><i class="fas fa-undo fa-2x"></i></button>                     
                        </div>
                    </div>
                </div>                
			</div>
		</div>
	</div>
</div>
    `,
    data () {
      return {
          ticketActivo: null,
          listaTickets: null
      }
    },
    methods: {
        abreModal()
        {
            $('#vueModalCaja').modal();
        },
        cerrarModal()
        {
            $('#vueModalCaja').modal('hide');
        },
        imprimirTicket()
        {
            toc.imprimirTicket(this.listaTickets[this.ticketActivo]._id);
        },
        cargarListaTickets(arrayTickets)
        {
            this.listaTickets = arrayTickets.reverse();
        },
        setItemCajaActivo(x)
        {
            this.ticketActivo = x;
        },
        abrirModalSalidaDinero()
        {
            this.cerrarModal();
            vueSalidaDinero.abreModal();
        },
        abrirModalEntradaDinero()
        {
            this.cerrarModal();
            vueEntradaDinero.abreModal();
        },
        abrirModalCerrarCaja()
        {
            if(toc.cajaAbierta())
            {
                this.cerrarModal();
                vueClausura.abreModal();
            }
            else
            {
                vueToast.abrir('danger', 'No hay ninguna caja abierta');
            }            
        },
        abrirModalAbrirCaja()
        {
            if(!toc.cajaAbierta())
            {
                this.cerrarModal();
                vueApertura.abreModal();
            }
            else
            {
                vueToast.abrir('danger', 'Ya existe una caja abierta');
            }
        },
        convertirFecha(fecha)
        {
            return dateToString(fecha);
        }
    }
  });