var vuePasswd = new Vue({
    el: '#vuePasswd',
    template:
    /*html*/`
    <!-- Inicio modal passwd -->
    <div class="modal" id="modalPasswd" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 600px">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Introduce la contraseña</h5>
				</button>
			</div>
			<div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <input id="inputBusqueda" class="form-control passwd" type="password" placeholder="Contraseña">
                    </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary btn-lg mr-0" @click="okey()">OK</button>
			</div>
		</div>
	</div>
</div>
    <!-- Fin modal passwd -->
    `,
    data() 
    {
        return {
        }
    },
    methods: 
    {
        abrirModal() 
        {
            $('#modalPasswd').modal();
        },
        cerrarModal()
        {
            $('#modalPasswd').modal('hide');
        },
        okey()
        {
            var val = $(".passwd").val();
            if(val == 'Admin123') {
                vueToast.abrir('success', "CONTRASEÑA CORRECTA");
                this.cerrarModal();
                vueMenuTecnico.abrirModal();
            } else {
                vueToast.abrir('error', "CONTRASEÑA INCORRECTA");
            }
        }
    }
});