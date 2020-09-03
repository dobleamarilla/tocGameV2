var vueCantidad3G = new Vue({
    el: '#vueCantidad3G',
    template: 
    /*html*/ `
<div class="modal" id="modalCantidad3G" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 420px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Total pagado con datáfono 3G</h5>
			</div>
			<div class="modal-body">
				<div class="form-group row">
					<div class="col-md-12">
						<input type="text" v-model="getCantidad" class="form-control form-control-lg">
					</div>
				</div>
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
                        <a class="botonEze" @click="borrarNumero()">&lt;</a>
                        <a class="botonEze" @click="agregarTecla('0')">0</a>
                        <a class="botonEze" @click="agregarComa('.')">.,</a>
                    </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" @click="volverACaja()">VOLVER</button>
				<button type="button" class="btn btn-danger" @click="confirmar()">CONFIRMAR</button>
			</div>
		</div>
    </div>
</div>
                `,
    data() {
        return {
            cantidad: '0'
        };
    },
    methods: {
        abreModal() {
            $('#modalCantidad3G').modal();
        },
        cerrarModal() {
            $('#modalCantidad3G').modal('hide');
        },
        agregarTecla(x) {
            if (this.cantidad == '0') {
                this.cantidad = x;
            }
            else {
                this.cantidad += x;
            }
        },
        borrarNumero() {
            this.cantidad = this.cantidad.substring(0, this.cantidad.length - 1);
            if (this.cantidad == '') {
                this.cantidad = '0';
            }
        },
        agregarComa() {
            this.cantidad = this.cantidad.replace('.', '') + '.';
        },
        volverACaja() {
            this.cerrarModal();
            vueClausura.abreModal();
        },
        confirmar() {
            vueClausura.setTotalCon3G(Number(this.cantidad));
            this.cerrarModal();
            vueClausura.cerrarCaja();
            this.cantidad = '0';
        }
    },
    computed: {
        getCantidad() {
            return this.cantidad + ' €';
        }
    }
});
//# sourceMappingURL=vueCantidad3G.js.map