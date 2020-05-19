var vueCobrar = new Vue({
    el: '#vueCobrar',
    template: 
    /*html*/`
<div class="modal" id="modalVueCobrar" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 600px">
		<div class="modal-content">
			<div class="modal-body">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <img src="assets/imagenes/img-efectivo.png" alt="Cobrar con efectivo" width="250px">
                    </div>
                    <div class="col-md-6 text-center">
                        <img src="assets/imagenes/img-tarjetas.png" alt="Cobrar con tarjeta" width="250px">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <span>{{total}} €</span>
                    </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" @click="confirmar()">Confirmar</button>
				<button type="button" class="btn btn-danger" @click="reset()">Reset</button>
			</div>
		</div>
    </div>
</div>
    `,
    data () 
    {
      return {
          total: 0,
          arrayFichados: []
      }
    },
    methods: 
    {
        abreModal()
        {
            $('#modalVueCobrar').modal();
        },
        cerrarModal()
        {
            $('#modalVueCobrar').modal('hide');
        },
        prepararModalVenta(total: number, arrayFichados: any)
        {
            this.total = total;
            this.arrayFichados = arrayFichados;
        }
    }
  });