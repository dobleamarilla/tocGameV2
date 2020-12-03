var vueCesta = new Vue({
    el: '#vueCesta',
    template: 
    /*html*/ `
    <div class="row pt-1">
	<div class="col-md-5 ordenado">
		<div class="table-responsive estiloCesta">
			<table class="table fuenteIvan colorFuente" id="job-table">
				<thead>
					<tr>
						<th scope="col">Productos</th>
						<th scope="col">Unidades</th>
						<th scope="col">Precio</th>
					</tr>
				</thead>
				<tbody class="tableBody" :style="conCliente">
                    <tr v-for="(item, index) of listaAlReves" v-bind:class="{'estiloPromo': item.promocion.esPromo, 'seleccionado': activo === index}" @click="selectActivo(index)">
                        <td v-if="sePuedeRegalar(item.subtotal, item.promocion.esPromo)">{{item.nombre}} <img @click="regalar(index)" src="assets/imagenes/regalo.png" alt="Regalar"></td>
                        <td v-else>{{item.nombre}}</td>
                        <td>{{item.unidades}}</td>
                        <td>{{item.subtotal.toFixed(2)}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="col-md-7 scrollVer">
		<div class="row">
			<div class="col-md-7 paraRowsTotal" id="botonTotal">
				<button class="btn btn-primary btn-block sizeMenus" @click="cobrar()"><i class="fas fa-shopping-cart"></i> {{getTotal}} €</button>
            </div>
            <div class="col-md-2 paraRowsTickets" id="botonClientes">
				<button @click="abrirModalTicketsAbiertos()" class="btn btn-primary btn-block sizeMenus"><i class="fas fa-ticket-alt"></i></button>
			</div>
			<div class="col-md-3 paraRowBorrar" id="botonPeso">
				<button class="btn btn-primary btn-block sizeMenus" @click="borrar()"><i class="fas fa-eraser"></i></button>
			</div>
		</div>
		<div class="row pt-1">
			<div class="col-md-3 paraNumerico" id="botonClientes">
				<button class="btn btn-primary btn-block sizeMenus" @click="abrirModalNumerico()"><i class="fas fa-keyboard"></i></button>
			</div>
			<div class="col-md-3 paraRowMenus" id="botonMenus">
				<button @click="abrirMenuPrincipal()" class="btn btn-primary btn-block sizeMenus"><i class="fas fa-bars"></i></button>
			</div>
			<div class="col-md-3 paraFichajes" id="botonFichajes">
				<button @click="abrirFichajes()" class="btn btn-primary btn-block sizeMenus"><i class="far fa-clock"></i></button>
			</div>
			<div class="col-md-3 paraRowClientes" id="botonBorrar">
				<button @click="abrirModalClientes()" class="btn btn-primary btn-block sizeMenus"><i class="fas fa-users"></i></button>
            </div>
        </div>
        <div class="row pt-1">
			<div class="col-md-3 paraNumerico" id="botonClientes">
				<button class="btn btn-primary btn-block sizeMenus" @click="abrirModalBuscarProductos()"><i class="fas fa-search"></i></button>
            </div>
            <div class="col-md-3 paraNumerico" id="botonMenus">
				<button class="btn btn-primary btn-block sizeMenus" @click="alternarDatoTecla()"><i class="fas fa-euro-sign"></i></button>
			</div>
		</div>
	</div>
</div>
    `,
    data() {
        return {
            cesta: {
                _id: -1,
                lista: []
            },
            activo: null,
            conCliente: {},
            puntosClienteActivo: 0,
            lineaDeRegalo: null
        };
    },
    computed: {
        getTotal() {
            let suma = 0;
            for (let i = 0; i < this.cesta.lista.length; i++) {
                if (i !== this.lineaDeRegalo) {
                    suma += this.cesta.lista[i].subtotal;
                }
            }
            return suma.toFixed(2);
        },
        listaAlReves() {
            return this.cesta.lista.reverse();
        }
    },
    methods: {
        getCesta() {
            this.cesta = toc.getCesta();
        },
        recibirCesta(data) {
            this.cesta = data;
        },
        selectActivo(index) {
            this.activo = index;
        },
        returnCesta() {
            return this.cesta.lista[this.activo];
        },
        getActivo() {
            return this.activo;
        },
        borrar() {
            if (this.activo === null) {
                toc.borrarCesta();
            }
            else {
                toc.borrarItemCesta(this.activo);
            }
            this.activo = null;
            this.lineaDeRegalo = null;
        },
        cobrar() {
            if (this.cesta.lista.length > 0) {
                toc.abrirModalPago();
            }
            else {
                vueToast.abrir('danger', 'Cesta vacía');
            }
        },
        abrirMenuPrincipal() {
            vueMenuPrincipal.abrirModal();
        },
        abrirFichajes() {
            vueFichajes.abrirModalNoRestrictivo();
        },
        abrirModalClientes() {
            vueClientes.abrirModal();
        },
        limpiarEstiloClienteActivo() {
            this.conCliente = {};
        },
        activarEstiloClienteActivo() {
            this.conCliente = {
                "background-color": 'rgb(255, 167, 18)'
            };
        },
        abrirModalNumerico() {
            vueTecladoUnidades.abrirModal();
        },
        abrirModalTicketsAbiertos() {
            vueCestasAbiertas.abreModal();
        },
        abrirModalBuscarProductos() {
            vueBuscarProducto.abrirModal();
        },
        alternarDatoTecla() {
            vuePanelVentas.alternar();
        },
        sePuedeRegalar(subtotal, esPromo) {
            if (esPromo) {
                return false;
            }
            else {
                if (subtotal <= toc.convertirPuntosEnDinero(this.puntosClienteActivo)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        regalar(index) {
            this.lineaDeRegalo = index;
            this.puntosClienteActivo = 0;
        }
    }
});
//# sourceMappingURL=vueCesta.js.map