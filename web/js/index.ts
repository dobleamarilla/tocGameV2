const toc = new TocGame();
const moment = require('moment');
const axios = require('axios');
toc.iniciar();
setInterval(sincronizarToc, 5000);
setInterval(sincronizarDatosRapidos, 3000);