var vueApertura = new Vue({
    el: '#vueApertura',
    template: 
    /*html*/ `
<div class="modal" id="vueModalApertura" tabindex="-1" role="dialog">
	<div class="modal-dialog" style="max-width:80%" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">ABRIR CAJA</h5>
				</button>
			</div>
			<div class="modal-body">
				<div class="row p-2" style="text-align: center">
					<div class="col" @click="setActivo(0)">
                        <img src="assets/imagenes/1cts.png" width="84px" height="84px" alt="1 CTS.">
                        <label :style="infoDinero[0].style">{{infoDinero[0].valor}} unidades</label>
					</div>
					<div class="col" @click="setActivo(1)">
                        <img src="assets/imagenes/2cts.png" width="84px" height="84px" alt="1 CTS.">
                        <label :style="infoDinero[1].style">{{infoDinero[1].valor}} unidades</label>
					</div>
					<div class="col" @click="setActivo(2)">
                        <img src="assets/imagenes/5cts.png" width="84px" height="84px" alt="1 CTS.">
                        <label :style="infoDinero[2].style">{{infoDinero[2].valor}} unidades</label>
					</div>
					<div class="col" @click="setActivo(3)">
                        <img src="assets/imagenes/10cts.png" width="84px" height="84px" alt="1 CTS.">
                        <label :style="infoDinero[3].style">{{infoDinero[3].valor}} unidades</label>
					</div>
					<div class="col" @click="setActivo(4)">
                        <img src="assets/imagenes/20cts.png" width="84px" height="84px" alt="1 CTS.">
                        <label :style="infoDinero[4].style"> {{infoDinero[4].valor}} unidades</label>
					</div>
					<div class="col" @click="setActivo(5)">
                        <img src="assets/imagenes/50cts.png" width="84px" height="84px" alt="1 CTS.">
                        <label :style="infoDinero[5].style">{{infoDinero[5].valor}} unidades</label>
					</div>
					<div class="col" @click="setActivo(6)">
                        <img src="assets/imagenes/uneuro.png" width="84px" height="84px" alt="1 CTS.">
                        <label :style="infoDinero[6].style">{{infoDinero[6].valor}} unidades</label>
					</div>
					<div class="col" @click="setActivo(7)">
                        <img src="assets/imagenes/doseuros.png" width="84px" height="84px" alt="1 CTS.">
                        <label :style="infoDinero[7].style">{{infoDinero[7].valor}} unidades</label>
					</div>
				</div>
				<div class="row mx-auto p-2">
					<div class="col" style="text-align: center;" @click="setActivo(8)">
                        <img src="assets/imagenes/5euros.png" width="135px" height="68px">
                        <label :style="infoDinero[8].style">{{infoDinero[8].valor}} unidades</label>
					</div>
					<div class="col" style="text-align: center;" @click="setActivo(9)">
                        <img src="assets/imagenes/10euros.png" width="135px" height="68px">
                        <label :style="infoDinero[9].style">{{infoDinero[9].valor}} unidades</label>
					</div>
					<div class="col" style="text-align: center;" @click="setActivo(10)">
                        <img src="assets/imagenes/20euros.png" width="135px" height="68px">
                        <label :style="infoDinero[10].style">{{infoDinero[10].valor}} unidades</label>
					</div>
					<div class="col" style="text-align: center;" @click="setActivo(11)">
                        <img src="assets/imagenes/50euros.png" width="135px" height="68px">
                        <label :style="infoDinero[11].style">{{infoDinero[11].valor}} unidades</label>
					</div>
					<div class="col" style="text-align: center;" @click="setActivo(12)">
                        <img src="assets/imagenes/100euros.png" width="135px" height="68px">
                        <label :style="infoDinero[12].style">{{infoDinero[12].valor}} unidades</label>
					</div>
					<div class="col" style="text-align: center;" @click="setActivo(13)">
                        <img src="assets/imagenes/200euros.png" width="135px" height="68px">
                        <label :style="infoDinero[13].style">{{infoDinero[13].valor}} unidades</label>
					</div>
					<div class="col" style="text-align: center;" @click="setActivo(14)">
                        <img src="assets/imagenes/500euros.png" width="135px" height="68px">
                        <label :style="infoDinero[14].style">{{infoDinero[14].valor}} unidades</label>
					</div>
				</div>
				<div class="row">
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

				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger btn-lg" @click="resetTodo()">RESET  LIMPIAR TODO</button>
				<button type="button" class="btn btn-primary btn-lg" @click="abrirCaja()">ABRIR CON {{getTotal.toFixed(2)}} €</button>
			</div>
		</div>
    </div>
</div>
    `,
    data() {
        return {
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
            activo: 0
        };
    },
    methods: {
        abreModal() {
            var lolAux = ipcRenderer.sendSync('get-monedas');
            this.infoDinero = (lolAux == null) ? this.infoDinero : lolAux.infoDinero;
            $('#vueModalApertura').modal();
        },
        cerrarModal() {
            $('#vueModalApertura').modal('hide');
        },
        setActivo(x) {
            this.infoDinero[this.activo].style = '';
            this.activo = x;
            this.infoDinero[this.activo].style = 'color: red;font-weight: bold;';
        },
        addNumero(x) {
            this.infoDinero[this.activo].valor = Number(this.infoDinero[this.activo].valor.toString() + x);
        },
        borrarNumero() {
            this.infoDinero[this.activo].valor = Number(this.infoDinero[this.activo].valor.toString().slice(0, -1));
        },
        resetTodo() {
            this.infoDinero = [
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
            ];
        },
        abrirCaja() {
            const cantidadLimpia = this.getTotal;
            let options = {
                buttons: ["&SÍ", "&NO"],
                message: "Se abrirá la caja con " + cantidadLimpia + " €. ¿CAMBIO CORRECTO?"
            };
            dialog.showMessageBox(remote.getCurrentWindow(), options, (res) => {
                if (res === 0) {
                    const data = {
                        _id: 'CAJA',
                        inicioTime: Date.now(),
                        finalTime: null,
                        idDependienta: null,
                        totalApertura: Number(this.getTotal.toFixed(2)),
                        totalCierre: null,
                        descuadre: null,
                        calaixFetZ: null,
                        primerTicket: null,
                        ultimoTicket: null,
                        recaudado: null,
                        nClientes: null,
                        detalleApertura: this.getDetalle,
                        detalleCierre: [],
                        enviado: false,
                        enTransito: false
                    };
                    toc.abrirCaja(data);
                }
            });
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
                { _id: '0.01', valor: this.infoDinero[0].valor * 0.01, unidades: this.infoDinero[0].valor },
                { _id: '0.02', valor: this.infoDinero[1].valor * 0.02, unidades: this.infoDinero[1].valor },
                { _id: '0.05', valor: this.infoDinero[2].valor * 0.05, unidades: this.infoDinero[2].valor },
                { _id: '0.10', valor: this.infoDinero[3].valor * 0.10, unidades: this.infoDinero[3].valor },
                { _id: '0.20', valor: this.infoDinero[4].valor * 0.20, unidades: this.infoDinero[4].valor },
                { _id: '0.50', valor: this.infoDinero[5].valor * 0.50, unidades: this.infoDinero[5].valor },
                { _id: '1', valor: this.infoDinero[6].valor * 1, unidades: this.infoDinero[6].valor },
                { _id: '2', valor: this.infoDinero[7].valor * 2, unidades: this.infoDinero[7].valor },
                { _id: '5', valor: this.infoDinero[8].valor * 5, unidades: this.infoDinero[8].valor },
                { _id: '10', valor: this.infoDinero[9].valor * 10, unidades: this.infoDinero[9].valor },
                { _id: '20', valor: this.infoDinero[10].valor * 20, unidades: this.infoDinero[10].valor },
                { _id: '50', valor: this.infoDinero[11].valor * 50, unidades: this.infoDinero[11].valor },
                { _id: '100', valor: this.infoDinero[12].valor * 100, unidades: this.infoDinero[12].valor },
                { _id: '200', valor: this.infoDinero[13].valor * 200, unidades: this.infoDinero[13].valor },
                { _id: '500', valor: this.infoDinero[14].valor * 500, unidades: this.infoDinero[14].valor },
            ];
            return info;
        }
    }
});
//# sourceMappingURL=modalApertura.js.map