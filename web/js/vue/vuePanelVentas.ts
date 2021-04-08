var vuePanelVentas = new Vue({
    el: '#vuePanelVentas',
    template: 
    /*html*/`
    <div>
        <div class="row p-2" id="menusColores">
            <template v-if="listaMenus.length <= 11">
                <div v-for="(item, index) of listaMenus" :key="item.nomMenu" class="col colJuntitasMenus menus" style="padding-left: 4px;">
                    <button class="btn btn-secondary w-100 menus menusColorIvan" v-bind:class="[{'activo' : esActivo(index)}, 'colorMenus']" @click="clickMenu(index)">{{item.nomMenu}}</button>
                </div>
            </template>
            <template v-else class="scrollmenu">
                <div class="scrollmenu">
                    <template v-for="(item, index) of listaMenus" class="col colJuntitasMenus menus">
                        <button style="width: 200px" class="btn btn-secondary menus menusColorIvan ml-2" v-bind:class="[{'activo' : esActivo(index)}, 'colorMenus']" @click="clickMenu(index)">{{item.nomMenu}}</button>
                    </template>
                </div>
            </template>
        </div>
        <div>
        <div class="row" v-for="index in 6" :key="index">
            <template v-for="index2 in 6">
                <div class="col colJuntitas"  v-if="listadoTeclas[(index-1)*6+(index2-1)].idArticle >= 0">
                    <template v-if="listadoTeclas[(index-1)*6+(index2-1)].esSumable === true">
                        <div v-if="botonesPrecio === true">
                            <button v-bind:id="listadoTeclas[(index-1)*6+(index2-1)].idBoton" v-bind:class="['btn', 'btn-primary', 'rounded-0', 'w-100', 'teclas', 'colorIvan'+index]" @click="clickTecla(listadoTeclas[(index-1)*6+(index2-1)]); mostrarInfoVisor(listadoTeclas[(index-1)*6+(index2-1)]);" v-on:contextmenu="abrirFicha(listadoTeclas[(index-1)*6+(index2-1)])" style="background-color: #dee3e9; font-size: 1.02vw;">{{listadoTeclas[(index-1)*6+(index2-1)].nombreArticulo.nombre}} {{listadoTeclas[(index-1)*6+(index2-1)].nombreArticulo.precio}}</button>
                        </div>
                        <div v-else>
                            <button v-bind:id="listadoTeclas[(index-1)*6+(index2-1)].idBoton" v-bind:class="['btn', 'btn-primary', 'rounded-0', 'w-100', 'teclas', 'colorIvan'+index]" @click="clickTecla(listadoTeclas[(index-1)*6+(index2-1)]); mostrarInfoVisor(listadoTeclas[(index-1)*6+(index2-1)]);" v-on:contextmenu="abrirFicha(listadoTeclas[(index-1)*6+(index2-1)])" style="background-color: #dee3e9;">{{listadoTeclas[(index-1)*6+(index2-1)].nombreArticulo.nombre}}</button>
                        </div>
                    </template>
                    <template v-else>
                        <button v-bind:id="listadoTeclas[(index-1)*6+(index2-1)].idBoton" v-bind:class="['btn', 'btn-primary', 'rounded-0', 'w-100', 'teclas', 'colorIvan'+index]" @click="modalesSumable(listadoTeclas[(index-1)*6+(index2-1)], listadoTeclas[(index-1)*6+(index2-1)].idBoton); mostrarInfoVisor(listadoTeclas[(index-1)*6+(index2-1)])" style="background-color: #dee3e9;">{{listadoTeclas[(index-1)*6+(index2-1)].nombreArticulo.nombre}}</button>
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
        listaPrecios: [],
        menuActivo: 0,
        listadoTeclas: [
            {idBoton: 'tecla0', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla1', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla2', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla3', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla4', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla5', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla6', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla7', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla8', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla9', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla10', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla11', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla12', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla13', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla14', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla15', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla16', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla17', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla18', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla19', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla20', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla21', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla22', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla23', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla24', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla25', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla26', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla27', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla28', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla29', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla30', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla31', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla32', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla33', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla34', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
            {idBoton: 'tecla35', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true}
        ],
        botonesPrecio: false
      }
    },
    methods: {
        abrirFicha(infoArt)
        {
            vueFichaProducto.setId(infoArt.idArticle);
            vueFichaProducto.abreModal();
        },
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
            if(!toc.getStopNecesario())
            {
                toc.clickMenu(this.listaMenus[index].nomMenu);
                this.menuActivo = index;
            }
            else
            {
                vueToast.abrir('warning', 'Precios y teclado en proceso de actualización');
            }            
        },
        cargarTeclado(data)
        {
            this.resetTeclado();
            for(let i = 0; i < data.length; i++)
            {
                this.listadoTeclas[data[i].pos].nombreArticulo.nombre = data[i].nombreArticulo;
                this.listadoTeclas[data[i].pos].idArticle = data[i].idArticle;
                this.listadoTeclas[data[i].pos].color = data[i].color;
                this.listadoTeclas[data[i].pos].esSumable = data[i].esSumable;
                /* LISTADO PRECIOS */
                let datosProducto = this.listaPrecios.find(x => x.nombre === data[i].nombreArticulo);
                this.listadoTeclas[data[i].pos].nombreArticulo.precio = (datosProducto !== undefined) ? datosProducto.precioConIva + "€" : "0€";

            }
        },
        cargarMenus(data)
        {
            this.listaMenus = data;
            if(this.listaMenus.length > 0)
            {
                this.clickMenu(0);
            }
        },
        cargarPrecios(data) {
            this.listaPrecios = data;
            let params = toc.getParametros();
            if(params.botonesConPrecios == "Si") this.botonesPrecio = true;
            else this.botonesPrecio = false;
        },
        clickTecla(objListadoTeclas, esAPeso: boolean = false) //CUANDO SEA A PESO PASAR CON clickTecla(objListadoTeclas, true)
        {
            if(!toc.getStopNecesario())
            {
                toc.addItem(objListadoTeclas.idArticle, objListadoTeclas.idBoton, esAPeso);
            }
            else
            {
                vueToast.abrir('warning', 'Precios y teclado en proceso de actualización');
            }                
        },
        alternar() {
            for(let i = 0; i < this.listadoTeclas.length; i++) {
                let precioTemp = this.listadoTeclas[i].nombreArticulo.precio;
                this.listadoTeclas[i].nombreArticulo.precio = this.listadoTeclas[i].nombreArticulo.nombre;
                this.listadoTeclas[i].nombreArticulo.nombre = precioTemp;
            }
        },
        mostrarInfoVisor(objListadoTeclas) {
            let nombreArticulo = objListadoTeclas.nombreArticulo.nombre;
            let precioArticulo = objListadoTeclas.nombreArticulo.precio;
            precioArticulo = precioArticulo.replace("€", "");
            let totalCesta = toc.getCesta().tiposIva.importe1 + toc.getCesta().importe2 + toc.getCesta().importe3;
            ipcRenderer.send('mostrar-visor', {texto: nombreArticulo, precio: precioArticulo, total: totalCesta, dependienta: toc.getCurrentTrabajador().nombre});
        },
        resetTeclado()
        {
            this.listadoTeclas = [
                {idBoton: 'tecla0', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla1', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla2', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla3', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla4', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla5', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla6', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla7', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla8', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla9', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla10', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla11', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla12', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla13', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla14', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla15', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla16', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla17', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla18', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla19', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla20', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla21', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla22', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla23', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla24', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla25', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla26', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla27', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla28', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla29', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla30', idArticle: -1, pos: -1, color: 1, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla31', idArticle: -1, pos: -1, color: 2, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla32', idArticle: -1, pos: -1, color: 3, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla33', idArticle: -1, pos: -1, color: 4, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla34', idArticle: -1, pos: -1, color: 5, nombreArticulo: {nombre: '', precio: ''}, esSumable: true},
                {idBoton: 'tecla35', idArticle: -1, pos: -1, color: 6, nombreArticulo: {nombre: '', precio: ''}, esSumable: true}
            ];
        },
        modalesSumable(articuloAPeso, idBoton)
        {
            vueTecladoPeso.abrirModal(articuloAPeso.idArticle, idBoton);
        }
    }
  });
