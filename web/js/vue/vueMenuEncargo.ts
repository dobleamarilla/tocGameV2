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
                        <div class="col-md-10">
                            <h1>Nombre del cliente</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-5">
                            <input type="radio" id="hoy" name="opcion" value="hoy" @change="changeOption($event)" checked="hoy">
                            <label for="hoy">Hoy</label>
                            <br/>
                            <input type="radio" id="dia" name="opcion" value="dia" @change="changeOption($event)" checked="dia">
                            <label for="dia">Otro día</label>
                            <br/>
                            <input type="radio" id="repeticion" name="opcion" value="repeticion" @change="changeOption($event)" checked="repeticion">
                            <label for="repeticion">Cada...</label>
                            <br/>
                        </div>
                        <div class="col-md-5">
                            <input type="date" v-if="dia">
                            <div v-if="repeticion" v-for="(item, index) in dias" :key="index">
                                <input type="checkbox" :id="item">
                                <label>{{ item }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md">
                            <input type="number" id="cuenta" placeholder="0" min="0">
                            <label for="cuenta">Deja a cuenta</label>
                        </div>
                        <div class="col-md">
                            <input type="text" placeholder="Comentario">
                        </div>
                        <div class="col-md">
                            <input type="button" value="Salir" @click="cerrarModal()">
                            <input type="button" value="Crear encargo" @click="crearEncargo()">
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
          repeticion: false
      }
    },
    methods: {
        abreModal() {
            $('#vueMenuEncargo').modal();
        },
        cerrarModal() {
            $('#vueMenuEncargo').modal('hide');
            this.nombreCliente = null;
            this.hoy = true;
            this.dia = false;
            this.repeticion = false;
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
    }
  });