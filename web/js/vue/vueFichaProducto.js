var vueFichaProducto = new Vue({
    el: '#vueFichaProducto',
    template: 
    /*html*/ `
        <div class="modal" id="modalFichaProducto" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document" style="max-width: 900px">
                <div class="modal-content">		
                    <div class="modal-body">
                        <iframe id="frameFichaProducto" src="url" frameborder="0" height="650px" width="100%"></iframe>
                    </div>
                </div>
            </div>
        </div>
                `,
    data() {
        return {
            url: ''
        };
    },
    methods: {
        abreModal() {
            this.recargar();
            $('#modalFichaProducto').modal();
        },
        cerrarModal() {
            $('#modalFichaProducto').modal('hide');
        },
        cerrar() {
            this.cerrarModal();
        },
        setId(idArticulo) {
            let parametros = toc.getParametros();
            this.url = `http://silema.hiterp.com/Facturacion/ElForn/gestion/FichaTecnicaHtml.asp?codi=${idArticulo}&Llic=00${parametros.licencia}`;
        },
        recargar() {
            $("#frameFichaProducto").attr("src", this.url);
        }
    }
});
//# sourceMappingURL=vueFichaProducto.js.map