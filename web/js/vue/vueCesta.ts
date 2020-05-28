var vueCesta = new Vue({
    el: '#vueCesta',
    template: 
    /*html*/`
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
				<tbody class="tableBody">
                    <tr v-for="(item, index) of listaAlReves" v-bind:class="{'estiloPromo': item.promocion.esPromo, 'seleccionado': activo === index}" @click="selectActivo(index)">
                        <td>{{item.nombre}}</td>
                        <td>{{item.unidades}}</td>
                        <td>{{item.subtotal}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="col-md-7">
		<div class="row">
			<div class="col-md-8 paraRowsTotal" id="botonTotal">
				<button class="btn btn-primary btn-block sizeMenus" @click="cobrar()"><i class="fas fa-shopping-cart"></i> {{getTotal}} €</button>
			</div>
			<div class="col-md-4 paraRowBorrar" id="botonPeso">
				<button class="btn btn-primary btn-block sizeMenus" @click="borrar()"><i class="fas fa-eraser"></i></button>
			</div>
		</div>
		<div class="row pt-1">
			<div class="col-md-3 paraNumerico" id="botonClientes">
				<button class="btn btn-primary btn-block sizeMenus"><i class="fas fa-keyboard"></i></button>
			</div>
			<div class="col-md-3 paraRowMenus" id="botonMenus">
				<button @click="abrirModalCaja()" class="btn btn-primary btn-block sizeMenus"><i class="fas fa-bars"></i></button>
			</div>
			<div class="col-md-3 paraFichajes" id="botonFichajes">
				<button @click="abrirFichajes()" class="btn btn-primary btn-block sizeMenus"><i class="far fa-clock"></i></button>
			</div>
			<div class="col-md-3 paraRowClientes" id="botonBorrar">
				<button class="btn btn-primary btn-block sizeMenus"><i class="fas fa-users"></i></button>
			</div>
		</div>
	</div>
</div>
    `,
    data () {
      return {
          cesta: {
            _id: -1,
            lista: []
        },
        activo: null
      }
    },
    computed: 
    {
        getTotal()
        {
            let suma = 0;
            for(let i = 0; i < this.cesta.lista.length; i++)
            {
                suma += this.cesta.lista[i].subtotal;
            }
            return suma.toFixed(2);
        },
        listaAlReves()
        {
            return this.cesta.lista.reverse();
        }
    },
    methods: 
    {
        getCesta()
        {
            this.cesta = toc.getCesta();
        },
        recibirCesta(data)
        {
            this.cesta = data;
        },
        selectActivo(index: number)
        {
            this.activo = index;
        },
        borrar()
        {
            if(this.activo === null)
            {
                toc.borrarCesta();
            }
            else
            {
                toc.borrarItemCesta(this.activo);
            }
            this.activo = null;
        },
        cobrar()
        {
            if(this.cesta.lista.length > 0)
            {
                toc.abrirModalPago();
            }
            else
            {
                vueToast.abrir('danger', 'Cesta vacía');
            }
        },
        abrirModalCaja()
        {
            toc.abrirModalCaja();
        },
        abrirFichajes()
        {
            vueFichajes.abrirModalNoRestrictivo();
        }
    }
  });