var vueSalidaDinero = new Vue({
    el: '#vueSalidaDinero',
    template: 
    /*html*/`
<div class="modal" id="vueModalSalidaDinero" tabindex="-1" role="dialog">
	<div class="modal-dialog" style="max-width: 800px" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Listado de tickets</h5>
				</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12 text-center">
                        <div class="btn-group-vertical ml-12 mt-12" role="group" aria-label="Basic example">
                            <div class="btn-group">
                                &nbsp;&nbsp;&nbsp;<input class="text-center form-control-lg mb-2" id="code">
                            </div>
                            <div class="btn-group">
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '1';">1</a>
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '2';">2</a>
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '3';">3</a>
                            </div>
                            <div class="btn-group">
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '4';">4</a>
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '5';">5</a>
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '6';">6</a>
                            </div>
                            <div class="btn-group">
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '7';">7</a>
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '8';">8</a>
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '9';">9</a>
                            </div>
                            <div class="btn-group">
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value.slice(0, -1);">&lt;</a>
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + '0';">0</a>
                                <a class="boton" onclick="document.getElementById('code').value=document.getElementById('code').value + ',';">,</a>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" @click="confirmarSalida()">OK</button>
			</div>
		</div>
    </div>
</div>
    `,
    data () {
      return {
          ticketActivo: null,
          listaTickets: null
      }
    },
    methods: {
        abreModal()
        {
            $('#vueModalSalidaDinero').modal();
        },
        cerrarModal()
        {
            $('#vueModalSalidaDinero').modal('hide');
        },
        confirmarSalida()
        {

        }
    }
  });