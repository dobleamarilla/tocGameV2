var vueMenuEncargo = new Vue({
    el: '#vueMenuEncargo',
    template: 
    /*html*/`
<div>
	<div class="modal" id="vueMenuEncargo" tabindex="-1" role="dialog">
		<div class="modal-dialog" style="max-width: 80%" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Nuevo encargo</h5>
				</div>
				<div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <h1 v-if="nombreCliente !== null">{{nombreCliente}} <input type="button" value="Cambiar cliente" class="btn btn-dark btn-sm" style="font-size: 18px;" @click="abreModalClientes()"></h1>
                            <input v-else type="button" value="Selecciona un cliente" class="btn btn-dark btn-block" style="height: 70px; font-size: 22px;" @click="abreModalClientes()">
                            <br/>
                            <br/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-5">
                            <input type="radio" id="hoy" class="btn-check" name="opcion" value="hoy" @change="changeOption($event)" :checked="hoy" autocomplete="off">
                            <label class="btn btn-outline-info" for="hoy">Hoy</label>
                            <br/>
                            <input type="radio" id="dia" class="btn-check" name="opcion" value="dia" @change="changeOption($event)" :checked="dia" autocomplete="off">
                            <label class="btn btn-outline-info" for="dia">Otro día</label>
                            <br/>
                            <input type="radio" id="repeticion" class="btn-check" name="opcion" value="repeticion" @change="changeOption($event)" :checked="repeticion" autocomplete="off">
                            <label class="btn btn-outline-info" for="repeticion">Cada...</label>
                            <br/>
                            <br/>
                        </div>
                        <div class="col-md-5">
                            <input type="date" v-if="dia">
                            <div v-if="repeticion">
                                <div v-for="(item, index) in dias" :key="index">
                                    <input type="checkbox" :id="item">
                                    <label>{{ item }}</label>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md">
                            <small id="emailHelp" class="form-text text-muted">Deja a cuenta:</small>
                            <input type="number" class="form-control" id="cuenta" placeholder="0" min="0">
                        </div>
                        <div class="col-md">
                            <small id="emailHelp" class="form-text text-muted">Comentario:</small>
                            <input type="text" class="form-control" placeholder="Introduce aquí el comentario">
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
          dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          nombreCliente: null,
          hoy: true,
          dia: false,
          repeticion: false,
          articulos: [],
          precioEncargo: 0,
          dejaACuenta: 0,
          comentario: ''
      }
    },
    methods: {
        abreModal() {
            this.nombreCliente = toc.getCliente() != null ? toc.getCliente().nombre : null;
            $('#vueMenuEncargo').modal();
        },
        cerrarModal() {
            $('#vueMenuEncargo').modal('hide');
            this.reset();
        },
        changeOption(event) {
            if(event.target.value == 'hoy') {
                this.hoy = true;
                this.dia = false;
                this.repeticion = false;
            } else if(event.target.value == 'dia') {
                this.hoy = false;
                this.dia = true;
                this.repeticion = false;
            } else if(event.target.value == 'repeticion') {
                this.hoy = false;
                this.dia = false;
                this.repeticion = true;
            }
        },
        crearEncargo() {
            // Crear encargo
            this.cerrarModal();
        },
        abreModalClientes() {
            $("#vueMenuEncargo").modal('hide');
            vueClientes.abrirModal(true);
        },
        reset() {
            this.nombreCliente = null;
            this.hoy = true;
            this.dia = false;
            this.repeticion = false;
            this.articulos = [];
            this.precioEncargo = 0;
            this.dejaACuenta = 0;
            this.comentario = '';
        }
    }
  });