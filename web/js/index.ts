const toc = new TocGame();
const moment = require('moment');
toc.iniciar();
setInterval(sincronizarToc, 10000);
setInterval(sincronizarDatosRapidos, 3000);