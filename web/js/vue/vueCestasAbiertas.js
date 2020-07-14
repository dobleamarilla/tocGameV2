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
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title">Ticket {{(i*6)+j}}</h5>                                    
                                        <p class="card-text">5,42 €</p>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">SALIR</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin modal cestas abiertas -->
    `,
    data() {
        return {
            nRows: 0,
            listaCestas: null
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
            this.listaCestas = ipcRenderer.sendSync('getAllCestas');
            if (this.listaCestas.length > 0) {
                var division = this.listaCestas.length / 6;
                if (division <= 1) {
                    this.nRows = 1;
                }
                else {
                    this.nRows = Math.trunc(division) + 1;
                }
            }
        }
    }
});
//# sourceMappingURL=vueCestasAbiertas.js.map