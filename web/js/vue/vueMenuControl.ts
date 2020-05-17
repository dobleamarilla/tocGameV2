var vueMenuControl = new Vue({
    el: '#vueMenuControl',
    template: 
    /*html*/`
    <div>
        <div class="row">
            <div class="col-md-8 paraRowsTotal" id="botonTotal">
                <button class="btn btn-primary btn-block sizeMenus"><i class="fas fa-shopping-cart"></i> 15,65 €</button>
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
    `,
    data () {
      return {
          mensaje: '',
      }
    },
    methods: {

    }
  });