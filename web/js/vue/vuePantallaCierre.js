var vuePantallaCierre = new Vue({
    el: '#vuePantallaCierre',
    template: 
    /*html*/
    `
    <div class="modal" id="modalPantallaCierre" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Cierre de caja</h5>
            </div>
			<div class="modal-body">
                <div class="col cierreCaja">
                    <h1 id="tienda">Tienda: {{nombreTienda}}</h1>
                    <br> <span id="tiendaResum">Resum caixa</span> <br>
                    <div id="datosTienda">
                        <p>Resp: {{nombreTrabajador}}</p>
                        <p>Inici: {{diaI}}/{{mesI}}/{{anyoI}} {{horaI}}:{{minutoI}}</p>
                        <p>Final: {{diaF}}/{{mesF}}/{{anyoF}} {{horaF}}:{{minutoF}}</p>
                    </div>
                    <div id="datosVenta">
                        <p><span style="font-weight: bold;">Calaix fet&nbsp;&nbsp;&nbsp;&nbsp;:</span> {{calaixFet.toFixed(2)}}</p> 
                        <p><span style="font-weight: bold;">Descuadre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span> {{descuadre.toFixed(2)}}</p> 
                        <p><span style="font-weight: bold;">Clients atesos:</span> {{nClientes}}</p> 
                        <p><span style="font-weight: bold;">Recaudat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span> {{recaudado.toFixed(2)}}</p> 
                        <p><span style="font-weight: bold;">Canvi inicial&nbsp;:</span> {{cInicioCaja.toFixed(2)}}</p> 
                        <p><span style="font-weight: bold;">Canvi final&nbsp;&nbsp;&nbsp;:</span> {{cFinalCaja.toFixed(2)}}</p>                    
                        <p><span style="font-weight: bold;">Total targeta teòric&nbsp;&nbsp;&nbsp;:</span> {{totalTarjeta.toFixed(2)}}</p>                    
                    </div>
                    <br>
                    <p>Moviments de caixa</p> 
                    <hr>
                    <p v-for="item of arrayMovimientos"><span v-if="item.concepto != 'Targeta 3G' && item.concepto != 'Targeta'">{{item.tipo}}: Cantidad: {{item.valor.toFixed(2)}}€ Fecha: {{item.dia}}/{{item.mes}}/{{item.anyo}} {{item.hora}}:{{item.minuto}} Concepto: {{item.concepto}}</span> </p> 
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" @click="cerrarModal()">CONFIRMAR CIERRE</button>
			</div>
		</div>
    </div>
</div>
    `,
    data() {
        return {
            textoMovimientos: '',
            textoTarjetas: '',
            calaixFet: 0,
            nombreTrabajador: '',
            descuadre: 0,
            nClientes: 0,
            recaudado: 0,
            nombreTienda: '',
            cInicioCaja: 0,
            cFinalCaja: 0,
            arrayMovimientos: [],
            diaI: 0,
            mesI: 0,
            anyoI: 0,
            horaI: 0,
            minutoI: 0,
            diaF: 0,
            mesF: 0,
            anyoF: 0,
            horaF: 0,
            minutoF: 0,
            totalTarjeta: 0
        };
    },
    methods: {
        abreModal() {
            $('#modalPantallaCierre').modal();
        },
        cerrarModal() {
            $('#modalPantallaCierre').modal('hide');
        },
        setVariables(info) {
            const TIPO_ENTRADA_DINERO = 'ENTRADA';
            const TIPO_SALIDA_DINERO = 'SALIDA';
            var fechaInicio = new Date(info.fechaInicio);
            var fechaFinal = new Date(info.fechaFinal);
            var sumaTarjetas = 0;
            var textoMovimientos = '';
            this.arrayMovimientos = [];
            for (let i = 0; i < info.arrayMovimientos.length; i++) {
                var auxFecha = new Date(info.arrayMovimientos[i]._id);
                this.arrayMovimientos.push({
                    valor: info.arrayMovimientos[i].valor,
                    dia: auxFecha.getDate(),
                    mes: auxFecha.getMonth(),
                    anyo: auxFecha.getFullYear(),
                    hora: auxFecha.getHours(),
                    minuto: auxFecha.getMinutes(),
                    concepto: info.arrayMovimientos[i].concepto,
                    tipo: info.arrayMovimientos[i].tipo
                });
                if (info.arrayMovimientos[i].tipo === TIPO_SALIDA_DINERO) {
                    if (info.arrayMovimientos[i].concepto == 'Targeta' || info.arrayMovimientos[i].concepto == 'Tarjeta 3G') {
                        sumaTarjetas += info.arrayMovimientos[i].valor;
                    }
                }
            }
            this.totalTarjeta = info.totalTarjeta;
            this.diaI = fechaInicio.getDate();
            this.mesI = fechaInicio.getMonth();
            this.anyoI = fechaInicio.getFullYear();
            this.horaI = fechaInicio.getHours();
            this.minutoI = fechaInicio.getMinutes();
            this.diaF = fechaFinal.getDate();
            this.mesF = fechaFinal.getMonth();
            this.anyoF = fechaFinal.getFullYear();
            this.horaF = fechaFinal.getHours();
            this.minutoF = fechaFinal.getMinutes();
            this.textoTarjetas = `Total targeta:      ${sumaTarjetas.toFixed(2)}`;
            this.textoMovimientos = textoMovimientos;
            this.calaixFet = info.calaixFet;
            this.nombreTrabajador = info.nombreTrabajador;
            this.descuadre = info.descuadre;
            this.nClientes = info.nClientes;
            this.recaudado = info.recaudado;
            this.nombreTienda = info.nombreTienda;
            this.cInicioCaja = info.cInicioCaja;
            this.cFinalCaja = info.cFinalCaja;
        }
    }
});
//# sourceMappingURL=vuePantallaCierre.js.map