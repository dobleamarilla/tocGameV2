var vueToast = new Vue({
    el: '#vueCaja',
    template: 
    /*html*/`
    <div>
    </div>
    `,
    data () 
    {
      return {
          mensaje: '',
      }
    },
    methods: 
    {
        abrir(tipo, mensaje)
        {
            this.mensaje    = mensaje;
            this.tipo       = tipo;

            var x = document.getElementById("snackbar");
            x.className = "show " + tipo;

            setTimeout(function(){ x.setAttribute("class", ""); }, 3000);
        }
    }
  });