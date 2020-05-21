var vueCaja = new Vue({
    el: '#vueCaja',
    template: 
    /*html*/`
<div>
	<div class="modal fade" id="vueModalCaja" tabindex="-1" role="dialog">
		<div class="modal-dialog" style="max-width: 80%" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Listado de tickets</h5>
					</button>
				</div>
				<div class="modal-body">
					<div class="row" v-bind:style="caja">
						<div class="col-md-12">
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
							<button type="button" class="btn btn-primary" @click="vistaSalidas()">SALIDA DINERO</button>
							<button type="button" class="btn btn-danger"  @click="vistaCierre()">CERRAR CAJA</button>
							<button type="button" class="btn btn-primary" @click="imprimirTicket()">IMPRIMIR TICKET</button>
						</div>
					</div>
					<div class="row" v-bind:style="salida">
						<div class="col-md-12">
							<div class="btn-group-vertical ml-12 mt-12" role="group" aria-label="Basic example">
								<div class="btn-group">
									&nbsp;&nbsp;&nbsp;<input class="text-center form-control-lg mb-2" id="code">
								</div>
								<div class="btn-group">
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '1';">1</a>
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '2';">2</a>
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '3';">3</a>
								</div>
								<div class="btn-group">
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '4';">4</a>
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '5';">5</a>
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '6';">6</a>
								</div>
								<div class="btn-group">
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '7';">7</a>
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '8';">8</a>
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '9';">9</a>
								</div>
								<div class="btn-group">
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value.slice(0, -1);">&lt;</a>
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '0';">0</a>
									<a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + ',';">,</a>
								</div>
								<div class="btn-group">
									<button type="button" class="btn btn-primary" @click="vistaCaja()">CANCELAR</button>
									<button type="button" class="btn btn-danger"  @click="confirmarSalida()">CREAR SALIDA</button>
								</div>
							</div>
						</div>
					</div>
					<div class="row" v-bind:style="cierre">
                        <form class="form-row">
                            <div class="col form-group" @click="setActivo(0)">
                                <img src="assets/imagenes/1cts.png" width="84px" height="84px" alt="1 CTS.">
                                <label :style="infoDinero[0].style">{{infoDinero[0].valor}} uds.</label>
                            </div>
                            <div class="col form-group" @click="setActivo(1)">
                                <img src="assets/imagenes/2cts.png" width="84px" height="84px" alt="1 CTS.">
                                <label :style="infoDinero[1].style">{{infoDinero[1].valor}} uds.</label>
                            </div>
                            <div class="col form-group" @click="setActivo(2)">
                                <img src="assets/imagenes/5cts.png" width="84px" height="84px" alt="1 CTS.">
                                <label :style="infoDinero[2].style">{{infoDinero[2].valor}} uds.</label>
                            </div>
                            <div class="col form-group" @click="setActivo(3)">
                                <img src="assets/imagenes/10cts.png" width="84px" height="84px" alt="1 CTS.">
                                <label :style="infoDinero[3].style">{{infoDinero[3].valor}} uds.</label>
                            </div>
                            <div class="col form-group" @click="setActivo(4)">
                                <img src="assets/imagenes/20cts.png" width="84px" height="84px" alt="1 CTS.">
                                <label :style="infoDinero[4].style"> {{infoDinero[4].valor}} uds.</label>
                            </div>
                            <div class="col form-group" @click="setActivo(5)">
                                <img src="assets/imagenes/50cts.png" width="84px" height="84px" alt="1 CTS.">
                                <label :style="infoDinero[5].style">{{infoDinero[5].valor}} uds.</label>
                            </div>
                            <div class="col form-group" @click="setActivo(6)">
                                <img src="assets/imagenes/uneuro.png" width="84px" height="84px" alt="1 CTS.">
                                <label :style="infoDinero[6].style">{{infoDinero[6].valor}} uds.</label>
                            </div>
                            <div class="col form-group" @click="setActivo(7)">
                                <img src="assets/imagenes/doseuros.png" width="84px" height="84px" alt="1 CTS.">
                                <label :style="infoDinero[7].style">{{infoDinero[7].valor}} uds.</label>
                            </div>                            
                        </form>
					</div>
					<div class="row mx-auto" v-bind:style="cierre">
                        <form class="form-row">
                            <div class="col form-group" style="text-align: center;" @click="setActivo(8)">
                                <img src="assets/imagenes/5euros.png" width="135px" height="68px">
                                <label :style="infoDinero[8].style">{{infoDinero[8].valor}} uds.</label>
                            </div>
                            <div class="col form-group" style="text-align: center;" @click="setActivo(9)">
                                <img src="assets/imagenes/10euros.png" width="135px" height="68px">
                                <label :style="infoDinero[9].style">{{infoDinero[9].valor}} uds.</label>
                            </div>
                            <div class="col form-group" style="text-align: center;" @click="setActivo(10)">
                                <img src="assets/imagenes/20euros.png" width="135px" height="68px">
                                <label :style="infoDinero[10].style">{{infoDinero[10].valor}} uds.</label>
                            </div>
                            <div class="col form-group" style="text-align: center;" @click="setActivo(11)">
                                <img src="assets/imagenes/50euros.png" width="135px" height="68px">
                                <label :style="infoDinero[11].style">{{infoDinero[11].valor}} uds.</label>
                            </div>
                            <div class="col form-group" style="text-align: center;" @click="setActivo(12)">
                                <img src="assets/imagenes/100euros.png" width="135px" height="68px">
                                <label :style="infoDinero[12].style">{{infoDinero[12].valor}} uds.</label>
                            </div>
                            <div class="col form-group" style="text-align: center;" @click="setActivo(13)">
                                <img src="assets/imagenes/200euros.png" width="135px" height="68px">
                                <label :style="infoDinero[13].style">{{infoDinero[13].valor}} uds.</label>
                            </div>
                            <div class="col form-group" style="text-align: center;" @click="setActivo(14)">
                                <img src="assets/imagenes/500euros.png" width="135px" height="68px">
                                <label :style="infoDinero[14].style">{{infoDinero[14].valor}} uds.</label>
                            </div>
                        </form>
					</div>
					<div class="row" v-bind:style="cierre">
						<div class="mx-auto">
							<a class="boton" @click="addNumero(0)">0</a>
							<a class="boton" @click="addNumero(1)">1</a>
							<a class="boton" @click="addNumero(2)">2</a>
							<a class="boton" @click="addNumero(3)">3</a>
							<a class="boton" @click="addNumero(4)">4</a>
							<a class="boton" @click="addNumero(5)">5</a>
							<a class="boton" @click="addNumero(6)">6</a>
							<a class="boton" @click="addNumero(7)">7</a>
							<a class="boton" @click="addNumero(8)">8</a>
							<a class="boton" @click="addNumero(9)">9</a>
							<a class="boton" @click="borrarNumero()">&lt;</a>
                        </div>
                        <div class="text-center">
                            <button type="button" class="btn btn-lg btn-primary" @click="vistaCaja()">CANCELAR</button>
                            <button type="button" class="btn btn-lg btn-danger"  @click="confirmarCierre()">CERRAR CAJA {{getTotal}} €</button>
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
          caja: {display: 'unset'},
          salida:{ display: 'none'},
          cierre: {display: 'none', 'text-align': 'center'},
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
        vistaSalidas()
        {
            this.caja.display = 'none';
            this.salida.display = 'unset';
            this.cierre.display = 'none';
        },
        vistaCaja()
        {
            this.caja.display = 'unset';
            this.salida.display = 'none';  
            this.cierre.display = 'none';
        },
        vistaCierre()
        {
            this.caja.display = 'none';
            this.salida.display = 'none';  
            this.cierre.display = 'unset';
        },
        abrirModalCerrarCaja()
        {
            this.cerrarModal();
            
        },
        imprimirTicket()
        {
            toc.imprimirTicket(this.listaTickets[this.ticketActivo]._id);
        },
        cargarListaTickets(arrayTickets)
        {
            this.listaTickets = arrayTickets.reverse();
        },
        confirmarSalida()
        {

        },
        setActivo(x) 
        {
            this.infoDinero[this.activoCierre].style = '';
            this.activoCierre = x;
            this.infoDinero[this.activoCierre].style = 'color: red;font-weight: bold;';
        },
        addNumero(x) 
        {
            this.infoDinero[this.activoCierre].valor = Number(this.infoDinero[this.activoCierre].valor.toString() + x);
        },
        borrarNumero() 
        {
            this.infoDinero[this.activoCierre].valor = Number(this.infoDinero[this.activoCierre].valor.toString().slice(0, -1));
        },
        confirmarCierre()
        {
            confirm("Se cerrará a caja... ¿CAMBIO CORRECTO?")
            {
                toc.cerrarCaja(this.getTotal, this.getDetalle);
            }
        },
        setItemCajaActivo(x)
        {
            this.ticketActivo = x;
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
        getDetalle(){
            var info = [
                {valor: this.infoDinero[0].valor * 0.01, unidades: this.infoDinero[0].valor},
                {valor: this.infoDinero[1].valor * 0.02, unidades: this.infoDinero[1].valor},
                {valor: this.infoDinero[2].valor * 0.05, unidades: this.infoDinero[2].valor},
                {valor: this.infoDinero[3].valor * 0.10, unidades: this.infoDinero[3].valor},
                {valor: this.infoDinero[4].valor * 0.20, unidades: this.infoDinero[4].valor},
                {valor: this.infoDinero[5].valor * 0.50, unidades: this.infoDinero[5].valor},
                {valor: this.infoDinero[6].valor * 1, unidades: this.infoDinero[6].valor},
                {valor: this.infoDinero[7].valor * 2, unidades: this.infoDinero[7].valor},
                {valor: this.infoDinero[8].valor * 5, unidades: this.infoDinero[8].valor},
                {valor: this.infoDinero[9].valor * 10, unidades: this.infoDinero[9].valor},
                {valor: this.infoDinero[10].valor * 20, unidades: this.infoDinero[10].valor},
                {valor: this.infoDinero[11].valor * 50, unidades: this.infoDinero[11].valor},
                {valor: this.infoDinero[12].valor * 100, unidades: this.infoDinero[12].valor},
                {valor: this.infoDinero[13].valor * 200, unidades: this.infoDinero[13].valor},
                {valor: this.infoDinero[14].valor * 500, unidades: this.infoDinero[14].valor},
            ];
            return info;
        }
    }
  });