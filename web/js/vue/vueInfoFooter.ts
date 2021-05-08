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
        },
        hayInternet(res)
        {
            this.getHora();          
            if(res)
            {
                this.internet = 'online.png';
            }
            else
            {
                this.internet = 'offline.png';
            }
        },
        actualizarHora() {
            setInterval(() => {
                this.getHora();
            }, 60000)
        },
        getHora() {
            var currentTime = new Date()
            var hours = currentTime.getHours()
            var minutes = currentTime.getMinutes()
            if (minutes < 10){
                minutes = parseInt("0") + minutes
            }
            var t_str = hours + ":" + minutes + " ";
            if(hours > 11){
                t_str += "PM";
            } else {
                t_str += "AM";
            }
            var currentTime = new Date()
            var hours = currentTime.getHours()
            var minutes = currentTime.getMinutes()
            if (minutes < 10){
                minutes = parseInt("0") + minutes
            }
            var t_str = hours + ":" + minutes + " ";
            if(hours > 11){
                t_str += "PM";
            } else {
                t_str += "AM";
            }
            this.hora = t_str;
        }      
    }
});
