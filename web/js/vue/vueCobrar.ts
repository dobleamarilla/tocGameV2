var vueCobrar = new Vue({
    el: '#vueCobrar',
    template: 
    /*html*/`
<div class="modal" id="modalVueCobrar" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog" role="document" style="max-width: 1350px">
		<div class="modal-content">
			<div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <img @click="agregar(0.01)" src="assets/imagenes/1cts.png" alt="Moneda 1 cts." :width="sizeMonedas">
                            <img @click="agregar(0.02)" src="assets/imagenes/2cts.png" alt="Moneda 2 cts." :width="sizeMonedas" class="mr-2">
                            <img @click="agregar(0.05)" src="assets/imagenes/5cts.png" alt="Moneda 5 cts." :width="sizeMonedas" class="mr-2">
                            <img @click="agregar(0.1)" src="assets/imagenes/10cts.png" alt="Moneda 10 cts." :width="sizeMonedas" class="mr-2">
                            <img @click="agregar(0.2)" src="assets/imagenes/20cts.png" alt="Moneda 20 cts." :width="sizeMonedas" class="mr-2">
                            <img @click="agregar(0.5)" src="assets/imagenes/50cts.png" alt="Moneda 50 cts." :width="sizeMonedas" class="mr-2">
                            <img @click="agregar(1)" src="assets/imagenes/uneuro.png" alt="Moneda 1 euro" :width="sizeMonedas" class="mr-2">
                            <img @click="agregar(2)" src="assets/imagenes/doseuros.png" alt="Moneda 2 euros" :width="sizeMonedas" class="mr-2">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <img @click="agregar(5)" src="assets/imagenes/5euros.png" alt="Billete 5 euros" :width="sizeBilletes">
                            <img @click="agregar(10)" src="assets/imagenes/10euros.png" alt="Billete 10 euros" :width="sizeBilletes" class="p-2">
                            <img @click="agregar(20)" src="assets/imagenes/20euros.png" alt="Billete 20 euros" :width="sizeBilletes" class="p-2">
                            <img @click="agregar(50)" src="assets/imagenes/50euros.png" alt="Billete 50 euros" :width="sizeBilletes" class="p-2">
                            <img @click="agregar(100)" src="assets/imagenes/100euros.png" alt="Billete 100 euros" :width="sizeBilletes" class="p-2">
                            <img @click="agregar(200)" src="assets/imagenes/200euros.png" alt="Billete 200 euros" :width="sizeBilletes" class="p-2">
                            <img @click="agregar(500)" src="assets/imagenes/500euros.png" alt="Billete 500 euros" :width="sizeBilletes" class="p-2">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="btn-group-vertical" role="group">
                                        <div class="btn-group">
                                            <a class="botonEze" @click="agregarTecla('7')">7</a>
                                            <a class="botonEze" @click="agregarTecla('8')">8</a>
                                            <a class="botonEze" @click="agregarTecla('9')">9</a>
                                        </div>
                                        <div class="btn-group">
                                            <a class="botonEze" @click="agregarTecla('4')">4</a>
                                            <a class="botonEze" @click="agregarTecla('5')">5</a>
                                            <a class="botonEze" @click="agregarTecla('6')">6</a>
                                        </div>
                                        <div class="btn-group">
                                            <a class="botonEze" @click="agregarTecla('1')">1</a>
                                            <a class="botonEze" @click="agregarTecla('2')">2</a>
                                            <a class="botonEze" @click="agregarTecla('3')">3</a>
                                        </div>
                                        <div class="btn-group">
                                            <a class="botonEze" @click="borrarCuentas()">&lt;</a>
                                            <a class="botonEze" @click="agregarTecla('0')">0</a>
                                            <a class="botonEze" @click="agregarComa('.')">.,</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 text-center pt-2" style="background-color: #F9FFF4">
                                    <span style="font-size: 25px;">Total: {{total.toFixed(2)}} €</span><br>
                                    <span style="font-size: 25px;">Dinero recibido: {{(cuenta+totalTkrs).toFixed(2)}} €</span><br>
                                    <span style="font-size: 25px;">Valor T.Restaurant: {{totalTkrs.toFixed(2)}} €</span><br>
                                    <span v-if="(cuenta+totalTkrs)-total < 0" style="font-size: 25px; color:red;">Faltan: {{((cuenta+totalTkrs)-total).toFixed(2)}} €</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div v-if="esVIP === false && esDevolucion === false && esConsumoPersonal === false && botonesCobroActivo && tkrs === false" class="row">
                                <div class="col-md-6 text-center">
                                    <img @click="cobrar('EFECTIVO')" src="assets/imagenes/img-efectivo.png" alt="Cobrar con efectivo" width="225px">
                                </div>
                                <div class="col-md-6 text-center">
                                    <img @click="cobrar('TARJETA')" src="assets/imagenes/img-tarjetas.png" alt="Cobrar con tarjeta" width="225px">
                                </div>
                                <div class="col-md-6 text-center">
                                    <img @click="alternarTkrs(true)" src="assets/imagenes/img-restaurant.png" alt="Cobrar con ticket restaurante" width="225px" style="margin-top: 5px;">
                                </div>
                            </div>
                            <div v-if="esVIP === true" class="row">
                                <div class="col text-center">
                                    <button @click="cobrar('DEUDA')" class="btn btn-danger" style="font-size: 40px">CREAR ALBARÁN</button>
                                </div>
                            </div>
                            <div v-if="esDevolucion === true" class="row">
                                <div class="col text-center">
                                    <button @click="cobrar('DEVOLUCION')" class="btn btn-danger" style="font-size: 40px">CREAR DEVOLUCIÓN</button>
                                </div>
                            </div>
                            <div v-if="esConsumoPersonal === true" class="row">
                                <div class="col text-center">
                                    <button @click="cobrar('CONSUMO_PERSONAL')" class="btn btn-danger" style="font-size: 40px">CONSUMO PERSONAL</button>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-md-12 text-center">
                                    <span class="verTotal">Cobrar {{cobrarVariable}} €</span>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-md-12 text-center">
                                    <select v-model="trabajadorActivo" @change="onChange($event)" class="form-control form-control-lg">
                                        <option v-for="trabajador in arrayFichados" :value="trabajador.idTrabajador">{{trabajador.nombre}}</option>
                                    </select>
                                </div>
                            </div>
                            <div v-if="esVIP === false" class="row" v-bind:style="esperandoDatafono">
                                <div class="col-md-12 text-center">
                                    <img src="assets/imagenes/loading.gif" alt="Esperando respuesta del datáfono">
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
			</div>
			<div class="modal-footer">
                <button v-if="tkrs" type="button" class="btn btn-primary" style="font-size: 50px" @click="cobrar('TICKET_RESTAURANT')">Pagar con Tick.Restaurant</button>
                <button type="button" class="btn btn-danger" style="font-size: 50px" @click="cerrarModal()">Cancelar</button>
			</div>
		</div>
    </div>
</div>
    `,
    data () 
    {
      return {
          total: 0,
          arrayFichados: [],
          esperandoDatafono: {display: 'none'},
          esperando: false,
          esVIP: false,
          esDevolucion: false,
          esConsumoPersonal: false,
          trabajadorActivo: null,
          sizeMonedas: '100px',
          sizeBilletes: '150px',
          cuentaAsistente: 0,
          cuentaAsistenteTeclado: '',
          cuenta: 0,
          totalTkrs: 0,
          tkrs: false,
          botonesCobroActivo: true
      }
    },
    methods: 
    {
        abreModal()
        {
            this.resetAsistente();
            this.trabajadorActivo = toc.getCurrentTrabajador().idTrabajador;
            this.esVIP = toc.esClienteVip();
            this.setEsperando(false);
            $('#modalVueCobrar').modal();
        },
        cerrarModal()
        {
            this.tkrs = false;
            this.botonesCobroActivo = true;
            if(!this.esperando && this.esperandoDatafono.display == 'none')
            {
                this.setEsperando(false);
		        $('#modalVueCobrar').modal('hide');
                ipcRenderer.send('mostrar-visor', {texto: 'Muchas gracias!', precio: ':D', dependienta: "", total: ""});
                setTimeout(() => {
                    ipcRenderer.send('mostrar-visor', {texto: 'Bienvenida/o a', precio:'365!'})
                }, 2500);
            }
            else
            {
                vueToast.abrir('warning', 'Hay una operación pendiente')
            }
        },
        mostrarModal(){
            $('#modalVueCobrar').modal();
        },
        ocultarModal(){
            $('#modalVueCobrar').modal('hide');
        },
        agregarTecla(x: string)
        {
            if(this.tkrs) this.totalTkrs = String(Number(this.totalTkrs + x));
            else this.cuentaAsistenteTeclado = String(Number(this.cuentaAsistenteTeclado + x));
            
        },
        agregarComa()
        {
            if(this.tkrs) this.totalTkrs = this.totalTkrs.replace('.', '') + '.';
            else this.cuentaAsistenteTeclado = this.cuentaAsistenteTeclado.replace('.', '') + '.';
            
        },
        borrarCuentas()
        {
           this.resetAsistente();
        },
        onChange(event)
        {
            toc.setCurrentTrabajador(parseInt(event.target.value));
        },
        prepararModalVenta(total: number, arrayFichados: any)
        {
            this.total = total;
            this.arrayFichados = arrayFichados;
        },
        cobrar(tipo: string)
        {
            if(!this.esperando)
            {
                if(this.tkrs){
                    this.setEsperando(true);
                    toc.crearTicket(tipo, this.total, {tkrs: true, totalTkrs: this.totalTkrs, tipoPago: tipo});       
                } else {
                    this.setEsperando(true);
                    toc.crearTicket(tipo, this.total, {tkrs: false});
                }

            }
            else
            {
                vueToast.abrir('danger', 'Ya existe una operación en curso');
            }
        },
        setTotalTkrs(x: number){
            this.totalTkrs = x;
        },
        alternarTkrs(estado: boolean) {
            this.tkrs = estado;
            this.ocultarModal();
            vueTecladoTkrs.abreModal();
        },
        setEsperando(res: boolean)
        {
            this.esperando = res;
        },
        setEsDevolucion(data)
        {
            this.esDevolucion = data;
        },
        activoEsperaDatafono()
        {
            this.setEsperando(true);
            this.esperandoDatafono.display = 'unset';
        },
        desactivoEsperaDatafono()
        {
            this.setEsperando(false);
            this.esperandoDatafono.display = 'none';
        },
        activarConsumoPersonal()
        {
            this.esConsumoPersonal = true;
        },
        desactivarConsumoPersonal()
        {
            this.esConsumoPersonal = false;
        },
        resetEstados()
        {
            this.esVIP = false;
            this.esDevolucion = false;
            this.esConsumoPersonal = false;
            this.trabajadorActivo = false;
            this.esperando = false;
        },
        limpiarClienteVip()
        {
            this.esVIP = false;
        },
        agregar(valor: number)
        {   
            if(this.tkrs) this.totalTkrs += valor;
            else this.cuentaAsistente += valor;
        },
        resetAsistente()
        {
            this.totalTkrs = 0;
            this.cuentaAsistente = 0;
            this.cuentaAsistenteTeclado = '';
        }
    },
    computed: {
        cobrarVariable(){
            if(this.total-this.totalTkrs <= 0){
                return "0.00";
            } else {
                return (this.total-this.totalTkrs).toFixed(2)
            }
        },
      sobran(){
        //   let cuenta = this.cuenta+this.totalTkrs-this.total;
        //   if(cuenta >= 0 && this.tkrs) {
        //     this.botonesCobroActivo = false;
        //   }
        //   else {
        //     this.botonesCobroActivo = true;
        //   }
        //   return this.cuenta+this.totalTkrs-this.total;
        if(this.tkrs){
            if((this.total - this.totalTkrs) > 0){ // FALTA PAGAR ALGO
                this.botonesCobroActivo = true;
            } else { //NO FALTA NADA, O SOBRA
                this.botonesCobroActivo = false;
            }
        }
        return this.total - this.totalTkrs;
      }
    },
    watch: {
        cuentaAsistente()
        {
            this.cuenta = this.cuentaAsistente;
        },
        cuentaAsistenteTeclado()
        {
            this.cuenta = Number(this.cuentaAsistenteTeclado);
        }
    }
  });
