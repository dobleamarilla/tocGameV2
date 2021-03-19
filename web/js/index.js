var toc = null;
tocgame.getParametros().then(infoParams => {
    tocgame.getInfoCaja().then(infoCaja => {
        toc = new TocGame(infoParams, infoCaja);
    });
});
// const toc = new TocGame();
const moment = require('moment');
const axios = require('axios');
toc.iniciar();
setInterval(sincronizarToc, 10000);
setInterval(sincronizarDatosRapidos, 3000);
//# sourceMappingURL=index.js.map