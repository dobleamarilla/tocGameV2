var vuePedidos = new Vue({
    el: '#vuePedidos',
    template:
    /*html*/`
    <!-- Inicio modal fichar -->
    <div class="modal" id="modalPedidos" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="max-width: 900px">
		<div class="modal-content">		
			<div class="modal-body">
                <iframe :src="url" frameborder="0" height="650px" width="100%"></iframe>
			</div>
		</div>
	</div>
</div>
    <!-- Fin modal fichar -->
    `,
    data() 
    {
        return {
            url: ''
        }
    },
    methods: 
    {
        abrirModal() 
        {
            $('#modalPedidos').modal();
        },
        cerrarModal()
        {
            $('#modalPedidos').modal('hide');
        },
        getUrl()
        {
            this.url = toc.getUrlPedidos();
        }
    }
});