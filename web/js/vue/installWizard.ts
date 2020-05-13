declare var Vue: any;
declare var nombre: string;

var vueToc = new Vue({
    el: "#vueInstallWizard",
    data: {
        nombre: 'Ezequiel'
    },
    methods: {
        diAlgo()
        {
            console.log("Hola " + this.nombre);
        }
    }
});