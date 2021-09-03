var vueMenuEncargo = new Vue({
    el: '#vueMenuEncargo',
    template: 
    /*html*/`
<div>
	<div class="modal" id="vueMenuEncargo" tabindex="-1" role="dialog">
		<div class="modal-dialog" style="max-width: 80%" role="document">
			<div class="modal-content encargos">
				<!--<div class="modal-header"> btn btn-dark btn-block 
					<h5 class="modal-title">Nuevo encargo</h5>
				</div>-->
				<div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <img src="assets/imagenes/logoEncargo.png">
                        </div>
                        <div class="col">
                            <h1 v-if="cliente !== null"><button class="btnEncargo lgEncargo float-right" @click="abreModalClientes()">{{cliente.nombre}}</button></h1>
                            <button v-else class="btnEncargo float-right" @click="abreModalClientes()"><i class="fas fa-search"></i></button>
                            <br/>
                            <br/>
                        </div>
                    </div>
                    <hr class="hrEncargo"/>
                    <div class="row align-items-center">
                        <div class="col-md-5">
                            <input type="radio" id="hoy" class="btn-check hideCircleButton" name="opcion" value="hoy" @change="changeOption($event)" :checked="hoy" autocomplete="off">
                            <label class="opcionesEncargo fancyBorder1 optionHoy" for="hoy">Hoy</label>
                            <br/>
                            <input type="radio" id="dia" class="btn-check hideCircleButton" name="opcion" value="dia" @change="changeOption($event)" :checked="dia" autocomplete="off">
                            <label class="opcionesEncargo fancyBorder2 optionDia" for="dia">Otro día</label>
                            <br/>
                            <input type="radio" id="repeticion" class="btn-check hideCircleButton" name="opcion" value="repeticion" @change="changeOption($event)" :checked="repeticion" autocomplete="off">
                            <label class="opcionesEncargo fancyBorder3 optionRepeticion" for="repeticion">Cada...</label>
                            <br/>
                            <br/>
                        </div>
                        <div class="col-md-5">
                            <div v-if="hoy">
                            <input type="radio" id="am" class="btn-check hideCircleButton2" name="franja" value="am" :checked="am" v-model="franja" autocomplete="off">
                            <label class="opcionesEncargo lgEncargo fancyBorder4 optionAm" for="am">Durante la mañana</label>
                            <input type="radio" id="pm" class="btn-check hideCircleButton2" name="franja" value="pm" :checked="pm" v-model="franja" autocomplete="off">
                            <label class="opcionesEncargo lgEncargo fancyBorder5 optionPm" for="pm">Durante la tarde</label>
                            </div>
                            <div v-if="dia">
                                <input type="date" id="fechaEncargo" v-model="fechaInput">
                                <input type="time" id="horaEncargo" v-model="horaInput">                            
                            </div>
                            <div v-if="repeticion">
                                <div v-for="(item, index) in dias" :key="index">
                                    <input type="checkbox" class="round-checkbox" :id="item.dia" v-model="item.checked">
                                    <label class="diaCheckbox">{{ item.dia }}</label>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <hr class="hrEncargo"/>
                    <div class="row">
                        <div class="col-md">
                            <small id="emailHelp" class="form-text text-muted">Deja a cuenta:</small>
                            <input type="number" class="form-control" id="cuenta" name="dejaACuenta" placeholder="0" min="0" v-model="dejaACuenta">
                        </div>
                        <div class="col-md">
                            <small id="emailHelp" class="form-text text-muted">Comentario:</small>
                            <input type="text" class="form-control" name="comentario" placeholder="Introduce aquí el comentario" v-model="comentario">
                        </div>
                        <div class="col-md">
                            <input type="button" value="Salir" class="btn btn-danger btn-lg" @click="cerrarModal()">
                            <input type="button" value="Crear encargo" class="btn btn-primary btn-lg" @click="crearEncargo()">
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
        dias: [
            {dia: 'Lunes', nDia: 0, checked: false},
            {dia: 'Martes', nDia: 1, checked: false},
            {dia: 'Miércoles', nDia: 2, checked: false},
            {dia: 'Jueves', nDia: 3, checked: false},
            {dia: 'Viernes', nDia: 4, checked: false},
            {dia: 'Sábado', nDia: 5, checked: false},
            {dia: 'Domingo', nDia: 6, checked: false}
        ],
        cliente: null,
        hoy: true,
        dia: false,
        repeticion: false,
        am: true,
        pm: false,
        franja: '',
        fechaEncargo: [],
        articulos: [],
        precioEncargo: 0,
        fechaInput: '',
        horaInput: '',
        dejaACuenta: 0,
        comentario: ''
    }
},
methods: {
    abreModal() {
            this.resetDias();
            this.cliente = toc.getCliente();
            $('#vueMenuEncargo').modal();
        },
        cerrarModal() {
            $('#vueMenuEncargo').modal('hide');
            this.reset();
        },
        changeOption(event) {
            if(event.target.value === 'hoy') {
                this.hoy = true;
                this.dia = false;
                this.repeticion = false;
            } else if(event.target.value === 'dia') {
                this.hoy = false;
                this.dia = true;
                this.repeticion = false;
            } else if(event.target.value === 'repeticion') {
                this.hoy = false;
                this.dia = false;
                this.repeticion = true;
            }
        },
        crearEncargo() {
            let {nombre, id} = this.cliente;
            let datos = {
                nombreCliente: nombre,
                idCliente: id,
                idDependienta: toc.getCurrentTrabajador()._id,
                precioEncargo: Number(vueCesta.getTotal), // Cogerlo de la cesta
                dejaACuenta: this.dejaACuenta,
                fechaEncargo: this.getFechaEncargo(), // Comprobar previamente si es un encargo de repetición
                comentario: this.comentario,
                articulos: toc.getCesta().lista // Cogerlo de la cesta
            }
            ipcRenderer.send('crear-encargo', datos);
            toc.quitarClienteSeleccionado();
            toc.borrarCesta();
            this.cerrarModal();
        },
        abreModalClientes() {
            $("#vueMenuEncargo").modal('hide');
            vueClientes.abrirModal(true);
        },
        getDiasSeleccionados() {
            return this.dias.filter(dia => dia.checked).map(dia => dia.nDia);
        },
        getFechaEncargo() {
            if(this.hoy) return [new Date().getDay(), this.franja];
            if(this.repeticion) return this.getDiasSeleccionados();
            return [new Date(`${this.fechaInput} ${this.horaInput}`).getTime()];
        },
        resetDias() {
            Object.keys(this.dias).forEach((index) => {
                this.dias[index].checked = false;
            });
        },
        reset() {
            this.cliente = null;
            this.hoy = true;
            this.dia = false;
            this.repeticion = false;
            this.articulos = [];
            this.precioEncargo = 0;
            this.dejaACuenta = 0;
            this.comentario = '';
            this.fechaInput = '';
            this.horaInput = '';
        }
    }
});