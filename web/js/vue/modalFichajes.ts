var vueFichajes = new Vue({
    el: '#vueFichajes',
    template:
    /*html*/`
    <!-- Inicio modal fichar -->
    <div class="modal" id="modalFichajes" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Fichar</h5>
				</button>
			</div>
			<div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mt-0">
                            <input class="form-control" type="text" v-model="busqueda" placeholder="Introduce tu nombre">
                        </div>
                    <div class="table-responsive" style="height: 400px;">
                         <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Fichar/Desfichar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="trabajador of trabajadores">
                                        <td>{{trabajador.nombre}}</td>
                                        <td v-if="trabajador.fichado === false"><a href="#" class="btn btn-outline-primary btn_fc" @click="fichar(trabajador)">FICHAR</a></td>
                                        <td v-else><a href="#" class="btn btn-outline-success btn_fc" @click="desfichar(trabajador)">DESFICHAR</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" @click="volver()">SALIR</button>
			</div>
		</div>
	</div>
</div>
    <!-- Fin modal fichar -->
    `,
    data() 
    {
        return {
            trabajadores: [],
            fichados: [],
            busqueda: ''
        }
    },
    methods: 
    {
        abrirModal() 
        {
            $('#modalFichajes').modal({ backdrop: 'static', keyboard: false })
        },
        cerrarModal()
        {
            $('#modalFichajes').modal('hide');
        },
        buscarTrabajador() 
        {
            electron.ipcRenderer.send('buscar-trabajador', this.busqueda);
            electron.ipcRenderer.on('res-buscar-trabajador', (ev, data) => {
                this.trabajadores = data;
            });
        },
        fichar(trabajador) 
        {
            electron.ipcRenderer.send('fichar-trabajador', trabajador._id);
            electron.ipcRenderer.on('res-fichar-trabajador', (ev, data) => {
                toc.addFichado(trabajador);
                this.busqueda = '';
                vueToast.abrir('success', 'FICHAJE OK');
            });
        },
        desfichar(x) 
        {
            console.log(x);
        },
        volver()
        {
            this.cerrarModal();
            toc.ejecutarIniciar();
        }
    },
    watch: 
    {
        busqueda() 
        {
            this.buscarTrabajador();
        }
    }
});