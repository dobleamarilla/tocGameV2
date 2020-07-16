var vueCestasAbiertas = new Vue({
    el: '#vueCestasAbiertas',
    template: 
    /*html*/ `
        <!-- Inicio modal cestas abiertas -->
        <div class="modal" id="modalCestasAbiertas" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document" style="max-width: 100%">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="row" style="padding-bottom: 10px;" v-for="(itemI, i) in nRows" :key="i">
                            <div class="col-md-2" v-for="(itemJ, j) in listaCestas.slice(i*6, (i+1 == nRows)?listaCestas.length: (i*6)+6)">
                                <div class="card text-center" @click="seleccionarActivo(i*6+j)" v-bind:class="{estiloTicketSeleccionado: listaCestas[i*6+j].activo}">
                                    <div class="card-body">
                                        <h5 class="card-title">Ticket {{(i*6)+j+1}}</h5>                                    
                                        <p class="card-text">{{listaCestas[i*6+j].total}} €</p>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="seleccionarCesta()">Seleccionar</button>
                        <button type="button" class="btn btn-dark" @click="nueva()">Nuevo</button>
                        <button type="button" class="btn btn-danger" @click="borrar()">Borrar</button>
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">Salir</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin modal cestas abiertas -->
    `,
    data() {
        return {
            nRows: 0,
            listaCestas: [],
            activo2: 0
        };
    },
    computed: {},
    methods: {
        abreModal() {
            this.getCestasAbiertas();
            $('#modalCestasAbiertas').modal();
        },
        cerrarModal() {
            $('#modalCestasAbiertas').modal('hide');
        },
        getCestasAbiertas() {
            this.activo2 = 0;
            this.listaCestas = [];
            var listaAux = ipcRenderer.sendSync('getAllCestas');
            var total = 0;
            for (let i = 0; i < listaAux.length; i++) {
                total = 0;
                for (let j = 0; j < listaAux[i].lista.length; j++) {
                    total += listaAux[i].lista[j].subtotal;
                }
                this.listaCestas.push({ _id: listaAux[i]._id, lista: listaAux[i].lista, activo: false, total: total });
            }
            if (this.listaCestas.length > 0) {
                var division = this.listaCestas.length / 6;
                if (division <= 1) {
                    this.nRows = 1;
                }
                else {
                    this.nRows = Math.trunc(division) + 1;
                }
            }
        },
        seleccionarActivo(posicion) {
            this.listaCestas[this.activo2].activo = false;
            this.listaCestas[posicion].activo = true;
            this.activo2 = posicion;
        },
        seleccionarCesta() {
            ipcRenderer.send('get-cesta', this.listaCestas[this.activo2]._id);
            this.cerrarModal();
        },
        borrar() {
            if (ipcRenderer.sendSync('del-cesta', this.listaCestas[this.activo2]._id)) {
                this.activo2 = 0;
                this.getCestasAbiertas();
            }
            else {
                vueToast.abrir('error', 'Error en borrarCesta vueCestasAbiertas');
            }
        },
        nueva() {
            ipcRenderer.send('new-cesta');
            this.cerrarModal();
        }
    }
});
//# sourceMappingURL=vueCestasAbiertas.js.map