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
            <div class="row">
                <div class="col colJuntitas"  v-if="currentListadoTeclas[0].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1" @click="clickTecla(currentListadoTeclas[0].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[0].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[1].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1" @click="clickTecla(currentListadoTeclas[1].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[1].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[2].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1" @click="clickTecla(currentListadoTeclas[2].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[2].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[3].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1" @click="clickTecla(currentListadoTeclas[3].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[3].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[4].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1" @click="clickTecla(currentListadoTeclas[4].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[4].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[5].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1" @click="clickTecla(currentListadoTeclas[5].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[5].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
            </div>
            <div class="row">
                <div class="col colJuntitas" v-if="currentListadoTeclas[6].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan2" @click="clickTecla(currentListadoTeclas[6].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[6].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[7].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan2" @click="clickTecla(currentListadoTeclas[7].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[7].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[8].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan2" @click="clickTecla(currentListadoTeclas[8].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[8].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[9].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan2" @click="clickTecla(currentListadoTeclas[9].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[9].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[10].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan2" @click="clickTecla(currentListadoTeclas[10].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[10].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[11].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan2" @click="clickTecla(currentListadoTeclas[11].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[11].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
            </div>
            <div class="row">
                <div class="col colJuntitas" v-if="currentListadoTeclas[12].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan3" @click="clickTecla(currentListadoTeclas[12].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[12].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[13].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan3" @click="clickTecla(currentListadoTeclas[13].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[13].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[14].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan3" @click="clickTecla(currentListadoTeclas[14].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[14].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[15].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan3" @click="clickTecla(currentListadoTeclas[15].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[15].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[16].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan3" @click="clickTecla(currentListadoTeclas[16].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[16].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[17].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan3" @click="clickTecla(currentListadoTeclas[17].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[17].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
            </div>
            <div class="row">
                <div class="col colJuntitas" v-if="currentListadoTeclas[18].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan4" @click="clickTecla(currentListadoTeclas[18].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[18].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[19].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan4" @click="clickTecla(currentListadoTeclas[19].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[19].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[20].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan4" @click="clickTecla(currentListadoTeclas[20].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[20].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[21].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan4" @click="clickTecla(currentListadoTeclas[21].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[21].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[22].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan4" @click="clickTecla(currentListadoTeclas[22].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[22].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[23].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan4" @click="clickTecla(currentListadoTeclas[23].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[23].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
            </div>
            <div class="row">
                <div class="col colJuntitas" v-if="currentListadoTeclas[24].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan5" @click="clickTecla(currentListadoTeclas[24].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[24].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[25].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan5" @click="clickTecla(currentListadoTeclas[25].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[25].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[26].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan5" @click="clickTecla(currentListadoTeclas[26].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[26].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[27].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan5" @click="clickTecla(currentListadoTeclas[27].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[27].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[28].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan5" @click="clickTecla(currentListadoTeclas[28].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[28].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[29].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan5" @click="clickTecla(currentListadoTeclas[29].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[29].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
            </div>
            <div class="row">
                <div class="col colJuntitas" v-if="currentListadoTeclas[30].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan6" @click="clickTecla(currentListadoTeclas[30].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[30].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[31].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan6" @click="clickTecla(currentListadoTeclas[31].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[31].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[32].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan6" @click="clickTecla(currentListadoTeclas[32].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[32].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[33].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan6" @click="clickTecla(currentListadoTeclas[33].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[33].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
                
                <div class="col colJuntitas" v-if="currentListadoTeclas[34].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan6" @click="clickTecla(currentListadoTeclas[34].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[34].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
               
                <div class="col colJuntitas" v-if="currentListadoTeclas[35].idArticle >= 0"><button class="btn btn-primary rounded-0 w-100 teclas colorIvan6" @click="clickTecla(currentListadoTeclas[35].idArticle)" style="background-color: #dee3e9;">{{currentListadoTeclas[35].nombreArticulo}}</button></div>
                <div class="col colJuntitas" v-else><button class="btn btn-primary rounded-0 w-100 teclas colorIvan1"></button></div>
            </div>
        </div>
    </div>
    `,
    data () {
      return {
        listaMenus: [],
        menuActivo: 0,
        currentListadoTeclas: [
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
            {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''}
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
                this.currentListadoTeclas[data[i].pos].nombreArticulo = data[i].nombreArticulo;
                this.currentListadoTeclas[data[i].pos].idArticle = data[i].idArticle;
                this.currentListadoTeclas[data[i].pos].color = data[i].color;
            }
        },
        cargarMenus(data)
        {
            this.listaMenus = data;
        },
        clickTecla(idArticle)
        {
            console.log("has hecho click en : ", idArticle);
        },
        resetTeclado()
        {
            this.currentListadoTeclas = [
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''},
                {idArticle: -1, pos: -1, color: -1, nombreArticulo: ''}
            ];
        }
    }
  });