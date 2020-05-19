var vuePanelVentas = new Vue({
    el: '#vuePanelVentas',
    template: 
    /*html*/`
    <div>
        <div class="row p-2">
            <div v-for="(item, index) of listaMenus" :key="item.nomMenu" class="col colJuntitasMenus menus" style="padding-left: 4px;">
                <button class="btn btn-secondary w-100 menus" v-bind:class="[{'activo' : esActivo(index)}, 'colorMenus']" @click="clickMenu(index)">{{item.nomMenu}}</button>
            </div>
        </div>
        <div>
        <div class="row" v-for="index in 6" :key="index">
            <template v-for="index2 in 6">
                <div class="col colJuntitas"  v-if="listadoTeclas[(index-1)*6+(index2-1)].idArticle >= 0">
                    <template v-if="listadoTeclas[(index-1)*6+(index2-1)].esSumable === true">
                        <button v-bind:id="listadoTeclas[(index-1)*6+(index2-1)].idBoton" class="btn btn-primary rounded-0 w-100 teclas colorIvan1" @click="clickTecla(listadoTeclas[(index-1)*6+(index2-1)])" style="background-color: #dee3e9;">{{listadoTeclas[(index-1)*6+(index2-1)].nombreArticulo}}</button>
                    </template>
                    <template v-else>
                        <button v-bind:id="listadoTeclas[(index-1)*6+(index2-1)].idBoton" class="btn btn-primary rounded-0 w-100 teclas colorIvan1" @click="modalesSumable(listadoTeclas[(index-1)*6+(index2-1)])" style="background-color: #dee3e9;">{{listadoTeclas[(index-1)*6+(index2-1)].nombreArticulo}}</button>
                    </template>
                </div>
                <div class="col colJuntitas" v-else></div>
            </template>
        </div>
        </div>
    </div>
    `,
    data () {
      return {
        listaMenus: [],
        menuActivo: 0,
        listadoTeclas: [
            {idBoton: 'tecla0', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla1', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla2', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla3', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla4', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla5', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla6', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla7', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla8', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla9', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla10', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla11', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla12', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla13', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla14', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla15', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla16', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla17', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla18', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla19', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla20', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla21', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla22', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla23', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla24', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla25', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla26', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla27', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla28', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla29', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla30', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla31', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla32', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla33', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla34', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
            {idBoton: 'tecla35', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true}
        ]
      }
    },
    methods: {
        esActivo(x: string)
        {
            if(x === this.menuActivo)
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        clickMenu(index)
        {
            toc.clickMenu(this.listaMenus[index].nomMenu);
            this.menuActivo = index;
        },
        cargarTeclado(data)
        {
            this.resetTeclado();
            for(let i = 0; i < data.length; i++)
            {
                this.listadoTeclas[data[i].pos].nombreArticulo = data[i].nombreArticulo;
                this.listadoTeclas[data[i].pos].idArticle = data[i].idArticle;
                this.listadoTeclas[data[i].pos].color = data[i].color;
                this.listadoTeclas[data[i].pos].esSumable = data[i].esSumable;
            }
        },
        cargarMenus(data)
        {
            this.listaMenus = data;
        },
        clickTecla(objListadoTeclas, esAPeso: boolean = false, peso: number = 0, subtotal: number = 0) //CUANDO SEA A PESO PASAR CON clickTecla(objListadoTeclas, true)
        {
            toc.addItem(objListadoTeclas.idArticle, objListadoTeclas.idBoton, esAPeso, peso, subtotal, 5);
        },
        resetTeclado()
        {
            this.listadoTeclas = [
                {idBoton: 'tecla0', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla1', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla2', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla3', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla4', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla5', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla6', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla7', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla8', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla9', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla10', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla11', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla12', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla13', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla14', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla15', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla16', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla17', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla18', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla19', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla20', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla21', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla22', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla23', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla24', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla25', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla26', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla27', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla28', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla29', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla30', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla31', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla32', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla33', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla34', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true},
                {idBoton: 'tecla35', idArticle: -1, pos: -1, color: -1, nombreArticulo: '', esSumable: true}
            ];
        },
        modalesSumable(ejemplo)
        {
            console.log("Es a peso:", ejemplo);
        }
    }
  });