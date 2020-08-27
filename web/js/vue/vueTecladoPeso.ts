var vueTecladoPeso = new Vue({
    el: '#vueTecladoPeso',
    template:
    /*html*/`
    <!-- Inicio modal fichar -->
    <div class="modal" id="modalPeso" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 600px">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Introduce los gramos</h5>
				</button>
			</div>
			<div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <span class="text-center" style="font-size: 40px">{{getUnidades}}<br>g.</span>
                        <hr/>
                        <span class="text-center" style="font-size: 40px">{{getPrecio}} €</span>
                    </div>
                    <div class="col-md-8">
                        <div class="btn-group-vertical" role="group">
                            <div class="btn-group">
                                <a class="boton" @click="agregarTecla(7)">7</a>
                                <a class="boton" @click="agregarTecla(8)">8</a>
                                <a class="boton" @click="agregarTecla(9)">9</a>
                            </div>
                            <div class="btn-group">
                                <a class="boton" @click="agregarTecla(4)">4</a>
                                <a class="boton" @click="agregarTecla(5)">5</a>
                                <a class="boton" @click="agregarTecla(6)">6</a>
                            </div>
                            <div class="btn-group">
                                <a class="boton" @click="agregarTecla(1)">1</a>
                                <a class="boton" @click="agregarTecla(2)">2</a>
                                <a class="boton" @click="agregarTecla(3)">3</a>
                            </div>
                            <div class="btn-group">
                                <a class="boton" @click="eliminarTecla()">&lt;</a>
                                <a class="boton" @click="agregarTecla(0)">0</a>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary btn-lg mr-0" @click="okey()">OK</button>
			</div>
		</div>
	</div>
</div>
    <!-- Fin modal fichar -->
    `,
    data() 
    {
        return {
            unidades: '0',
            infoArticulo: {
                precioConIva: 0
            },
            idBoton: null
        }
    },
    methods: 
    {
        abrirModal(idArticulo, idBoton) 
        {
            this.infoArticulo = ipcRenderer.sendSync('get-info-articulo', idArticulo);
            this.idBoton = idBoton;
            $('#modalPeso').modal();
        },
        cerrarModal()
        {
            $('#modalPeso').modal('hide');
        },
        agregarTecla(x: number)
        {
            this.unidades += x;
        },
        eliminarTecla()
        {
            this.unidades = this.unidades.slice(0, -1);
        },
        okey()
        {
            //(idArticulo: number, idBoton: String, aPeso: Boolean, infoAPeso = null)
            toc.addItem(this.infoArticulo._id, this.idBoton, true, {precioAplicado: Number(this.getPrecio), infoArticulo: this.infoArticulo});
            this.cerrarModal();
            this.unidades = '0';
        }
    },
    computed: {
        getUnidades()
        {
            let valor = parseInt(this.unidades);
            if(!isNaN(valor))
            {
                return valor;
            }
            else
            {
                return 0;
            }
        },
        getPrecio()
        {
            return ((this.unidades/1000)*this.infoArticulo.precioConIva).toFixed(2);
        }
    }
});