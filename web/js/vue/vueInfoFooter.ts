var vueInfoFooter = new Vue({
    el: '#vueInfoFooter',
    template: 
    /*html*/`
<div>
    <div style="position: fixed; bottom: 0; right: 0;">{{hora}}&nbsp;&nbsp;&nbsp;Versión: {{version}}&nbsp;&nbsp;&nbsp;Internet <img v-bind:src="'assets/imagenes/'+internet" alt="estadoInternet">&nbsp;&nbsp;&nbsp;Cestas abiertas: {{numCestas}} &nbsp;&nbsp;&nbsp; Nombre tienda: {{nombreTienda}}</div>
</div>
    `,
    data () 
    {
      return {
          numCestas: 1,
          nombreTienda: 'SIN LICENCIA',
          internet: 'offline.png',
          version: '',
          hora: ''
      }
    },
    methods: {
        setNumeroCestas(x: number)
        {
            this.numCestas = x;
        },
        getParametros()
        {
            this.nombreTienda = toc.getParametros().nombreTienda;
            this.version = ipcRenderer.sendSync('get-version');
            this.hora = toc.horaActual();
            setInterval(this.getParametros, 1000);
        },
        hayInternet(res)
        {
            if(res)
            {
                this.internet = 'online.png';
            }
            else
            {
                this.internet = 'offline.png';
            }
        }
    }
});