var vueMenuEncargo = new Vue({
    el: '#vueMenuEncargo',
    template: 
    /*html*/ `
<div>
	<div class="modal" id="vueMenuEncargo" tabindex="-1" role="dialog">
		<div class="modal-dialog" style="max-width: 80%" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Nuevo encargo</h5>
				</div>
				<div class="modal-body">
                    <div class="row">
                        <div class="col text-center">
                            <h1 v-if="nombreCliente !== null">{{nombreCliente}}</h1>
                            <input v-else type="button" value="Selecciona un cliente" class="btn btn-primary btn-block" style="height: 70px; font-size: 22px;" @click="abreModalClientes()">
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
                            <label for="cuenta">Deja a cuenta</label>
                            <input type="number" id="cuenta" placeholder="0" min="0">
                        </div>
                        <div class="col-md">
                            <input type="text" placeholder="Comentario">
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
    data() {
        return {
            dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            nombreCliente: null,
            hoy: true,
            dia: false,
            repeticion: false
        };
    },
    methods: {
        abreModal() {
            this.nombreCliente = toc.getCliente() != null ? toc.getCliente().nombre : null;
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
            if (event.target.value == 'hoy') {
                this.hoy = true;
                this.dia = false;
                this.repeticion = false;
            }
            else if (event.target.value == 'dia') {
                this.hoy = false;
                this.dia = true;
                this.repeticion = false;
            }
            else if (event.target.value == 'repeticion') {
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
    }
});
//# sourceMappingURL=vueMenuEncargo.js.map