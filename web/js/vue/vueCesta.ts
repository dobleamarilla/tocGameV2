var vueCesta = new Vue({
    el: '#vueCesta',
    template: 
    /*html*/`
    <div class="row pt-1">
	<div class="col-md-5 ordenado">
		<div class="table-responsive estiloCesta">
			<table class="table table-hover fuenteIvan colorFuente" id="job-table">
				<thead>
					<tr>
						<th scope="col">Productos</th>
						<th scope="col">Unidades</th>
						<th scope="col">Precio</th>
					</tr>
				</thead>
				<tbody class="tableBody">
                    <tr v-for="item of listaAlReves" v-bind:class="{'estiloPromo': item.promocion}">
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
				<button class="btn btn-primary btn-block sizeMenus"><i class="fas fa-shopping-cart"></i> {{getTotal}} €</button>
			</div>
			<div class="col-md-4 paraRowsPeso" id="botonPeso">
				<button class="btn btn-primary btn-block sizeMenus"><i class="fas fa-balance-scale-right"></i></button>
			</div>
		</div>
		<div class="row pt-1">
			<div class="col-md-4 paraRowClientes" id="botonClientes">
				<button class="btn btn-primary btn-block sizeMenus"><i class="fas fa-users"></i></button>
			</div>
			<div class="col-md-4 paraRowMenus" id="botonMenus">
				<button class="btn btn-primary btn-block sizeMenus"><i class="fas fa-bars"></i></button>
			</div>
			<div class="col-md-4 paraRowBorrar" id="botonBorrar">
				<button class="btn btn-primary btn-block sizeMenus"><i class="fas fa-eraser"></i></button>
			</div>
		</div>
	</div>
</div>
    `,
    data () {
      return {
          cesta: {
            _id: new Date,
            lista: []
        },
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
        }
    }
  });