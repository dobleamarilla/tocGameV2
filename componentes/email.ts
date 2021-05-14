const nodemailer = require('nodemailer');
//https://myaccount.google.com/lesssecureapps?pli=1
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mensajestocgame@gmail.com',
      pass: 'LOperas93786'
    }
  });

  function fechaParaTitulo(fecha: number)
  {
    var fechaFinal = null;
    if(typeof fecha === 'string' || typeof fecha === 'number')
    {
        fechaFinal = new Date(fecha);
    }
    
    let finalYear = `${fechaFinal.getFullYear()}`;
    let finalMonth = `${fechaFinal.getMonth() + 1}`;
    let finalDay = `${fechaFinal.getDate()}`;

    if (finalMonth.length === 1) {
        finalMonth = '0' + finalMonth;
    }
    if (finalDay.length === 1) {
        finalDay = '0' + finalDay;
    }

    return `${finalDay}/${finalMonth}/${finalYear}`;
  }
  function fechaParaMovimientos(fecha: number)
  {
      var fechaFinal = null;
      if(typeof fecha === 'string' || typeof fecha === 'number')
      {
          fechaFinal = new Date(fecha);
      }
    
      let finalHours = `${fechaFinal.getHours()}`;
      let finalMinutes = `${fechaFinal.getMinutes()}`;

  
      if (finalHours.length === 1) {
          finalHours = '0' + finalHours;
      }
      if (finalMinutes.length === 1) {
          finalMinutes = '0' + finalMinutes;
      }
      return `${finalHours}:${finalMinutes}`;
  }
  function fechaParaCaja(fecha: number)
  {
    var fechaFinal = null;
    if(typeof fecha === 'string' || typeof fecha === 'number')
    {
        fechaFinal = new Date(fecha);
    }
    
    let finalYear = `${fechaFinal.getFullYear()}`;
    let finalMonth = `${fechaFinal.getMonth() + 1}`;
    let finalDay = `${fechaFinal.getDate()}`;
    let finalHours = `${fechaFinal.getHours()}`;
    let finalMinutes = `${fechaFinal.getMinutes()}`;
    let finalSeconds = `${fechaFinal.getSeconds()}`;


    if (finalMonth.length === 1) {
        finalMonth = '0' + finalMonth;
    }
    if (finalDay.length === 1) {
        finalDay = '0' + finalDay;
    }
    if (finalHours.length === 1) {
        finalHours = '0' + finalHours;
    }
    if (finalMinutes.length === 1) {
        finalMinutes = '0' + finalMinutes;
    }
    if (finalSeconds.length === 1) {
        finalSeconds = '0' + finalSeconds;
    }
    return `${finalHours}:${finalMinutes}:${finalSeconds} - ${finalYear}-${finalMonth}-${finalDay}`;
  }
function enviarEmail(info)
{
  let htmlMovimientos = '';
  for(let i = 0; i < info.arrayMovimientos.length; i++)
  {
    if(info.arrayMovimientos[i].tipoExtra != 'TARJETA')
    {
      htmlMovimientos += `
      <tr>
          <td>${fechaParaMovimientos(info.arrayMovimientos[i]._id)}</td>														
          <td>${info.arrayMovimientos[i].concepto}</td>														
          <td>${info.arrayMovimientos[i].tipoExtra}</td>														
          <td class="align-right">${info.arrayMovimientos[i].valor.toFixed(2)} €</td>
      </tr>
      `;
    }
  }
  var codigoHTML = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title>Cierre de caja</title>
      <style type="text/css" rel="stylesheet" media="all">
        /* Base ------------------------------ */
        @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
        body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        -webkit-text-size-adjust: none;
        }
        a {
        color: #3869D4;
        }
        a img {
        border: none;
        }
        td {
        word-break: break-word;
        }
        .preheader {
        display: none !important;
        visibility: hidden;
        mso-hide: all;
        font-size: 1px;
        line-height: 1px;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        }
        /* Type ------------------------------ */
        body,
        td,
        th {
        font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
        }
        h1 {
        margin-top: 0;
        color: #333333;
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        }
        h2 {
        margin-top: 0;
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        }
        h3 {
        margin-top: 0;
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        }
        td,
        th {
        font-size: 16px;
        }
        p,
        ul,
        ol,
        blockquote {
        margin: .4em 0 1.1875em;
        font-size: 16px;
        line-height: 1.625;
        }
        p.sub {
        font-size: 13px;
        }
        /* Utilities ------------------------------ */
        .align-right {
        text-align: right;
        }
        .align-left {
        text-align: left;
        }
        .align-center {
        text-align: center;
        }
        /* Buttons ------------------------------ */
        .button {
        background-color: #3869D4;
        border-top: 10px solid #3869D4;
        border-right: 18px solid #3869D4;
        border-bottom: 10px solid #3869D4;
        border-left: 18px solid #3869D4;
        display: inline-block;
        color: #FFF;
        text-decoration: none;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
        -webkit-text-size-adjust: none;
        box-sizing: border-box;
        }
        .button--green {
        background-color: #22BC66;
        border-top: 10px solid #22BC66;
        border-right: 18px solid #22BC66;
        border-bottom: 10px solid #22BC66;
        border-left: 18px solid #22BC66;
        }
        .button--red {
        background-color: #FF6136;
        border-top: 10px solid #FF6136;
        border-right: 18px solid #FF6136;
        border-bottom: 10px solid #FF6136;
        border-left: 18px solid #FF6136;
        }
        @media only screen and (max-width: 500px) {
        .button {
        width: 100% !important;
        text-align: center !important;
        }
        }
        /* Attribute list ------------------------------ */
        .attributes {
        margin: 0 0 21px;
        }
        .attributes_content {
        background-color: #F4F4F7;
        padding: 16px;
        }
        .attributes_item {
        padding: 0;
        }
        /* Related Items ------------------------------ */
        .related {
        width: 100%;
        margin: 0;
        padding: 25px 0 0 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        }
        .related_item {
        padding: 10px 0;
        color: #CBCCCF;
        font-size: 15px;
        line-height: 18px;
        }
        .related_item-title {
        display: block;
        margin: .5em 0 0;
        }
        .related_item-thumb {
        display: block;
        padding-bottom: 10px;
        }
        .related_heading {
        border-top: 1px solid #CBCCCF;
        text-align: center;
        padding: 25px 0 10px;
        }
        /* Discount Code ------------------------------ */
        .discount {
        width: 100%;
        margin: 0;
        padding: 24px;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #F4F4F7;
        border: 2px dashed #CBCCCF;
        }
        .discount_heading {
        text-align: center;
        }
        .discount_body {
        text-align: center;
        font-size: 15px;
        }
        /* Social Icons ------------------------------ */
        .social {
        width: auto;
        }
        .social td {
        padding: 0;
        width: auto;
        }
        .social_icon {
        height: 20px;
        margin: 0 8px 10px 8px;
        padding: 0;
        }
        /* Data table ------------------------------ */
        .purchase {
        width: 100%;
        margin: 0;
        padding: 35px 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        }
        .purchase_content {
        width: 100%;
        margin: 0;
        padding: 25px 0 0 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        }
        .purchase_item {
        padding: 10px 0;
        color: #51545E;
        font-size: 15px;
        line-height: 18px;
        }
        .purchase_heading {
        padding-bottom: 8px;
        border-bottom: 1px solid #EAEAEC;
        }
        .purchase_heading p {
        margin: 0;
        color: #85878E;
        font-size: 12px;
        }
        .purchase_footer {
        padding-top: 15px;
        border-top: 1px solid #EAEAEC;
        }
        .purchase_total {
        margin: 0;
        text-align: right;
        font-weight: bold;
        color: #333333;
        }
        .purchase_total--label {
        padding: 0 15px 0 0;
        }
        body {
        background-color: #F4F4F7;
        color: #51545E;
        }
        p {
        color: #51545E;
        }
        p.sub {
        color: #6B6E76;
        }
        .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #F4F4F7;
        }
        .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        }
        /* Masthead ----------------------- */
        .email-masthead {
        padding: 25px 0;
        text-align: center;
        }
        .email-masthead_logo {
        width: 94px;
        }
        .email-masthead_name {
        font-size: 16px;
        font-weight: bold;
        color: #A8AAAF;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
        }
        /* Body ------------------------------ */
        .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #FFFFFF;
        }
        .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #FFFFFF;
        }
        .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
        }
        .email-footer p {
        color: #6B6E76;
        }
        .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
        }
        .body-sub {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #EAEAEC;
        }
        .content-cell {
        padding: 35px;
        }
        /*Media Queries ------------------------------ */
        @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
        width: 100% !important;
        }
        }
        @media (prefers-color-scheme: dark) {
        body,
        .email-body,
        .email-body_inner,
        .email-content,
        .email-wrapper,
        .email-masthead,
        .email-footer {
        background-color: #333333 !important;
        color: #FFF !important;
        }
        p,
        ul,
        ol,
        blockquote,
        h1,
        h2,
        h3 {
        color: #FFF !important;
        }
        .attributes_content,
        .discount {
        background-color: #222 !important;
        }
        .email-masthead_name {
        text-shadow: none !important;
        }
        }
        :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
        }
      </style>
      <!--[if mso]>
      <style type="text/css">
        .f-fallback  {
        font-family: Arial, sans-serif;
        }
      </style>
      <![endif]-->
    </head>
    <body>
      <span class="preheader">Resumen del cierre de caja</span>
      <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td class="email-masthead">
                  <a href="https://cafe365.es" class="f-fallback email-masthead_name">
                  365 Cafè - cafe365.es 
                  </a>
                </td>
              </tr>
              <!-- Email Body -->
              <tr>
                <td class="email-body" width="100%" cellpadding="0" cellspacing="0">
                  <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                    <!-- Body content -->
                    <tr>
                      <td class="content-cell">
                        <div class="f-fallback">
                          <h1>${info.nombreTienda}</h1>
                          <p>Información general del cierre de caja de la tienda ${info.nombreTienda}:</p>
                          <table class="attributes" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td class="attributes_content">
                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Fecha inicio:</strong> ${fechaParaCaja(info.caja.inicioTime)}
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Fecha final:</strong> ${fechaParaCaja(info.caja.finalTime)}
                                      </span>
                                    </td>
                                  </tr>																
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Calaix fet:</strong> ${info.caja.calaixFetZ.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Descuadre:</strong> ${info.caja.descuadre.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>																
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Descuadre solo TARJETA:</strong> ${((info.caja.totalDatafono3G+info.caja.totalClearOne)-info.caja.infoExtra.totalTarjeta).toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>																
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>3G:</strong> ${(info.caja.totalDatafono3G+info.caja.totalClearOne != 0) ? (((info.caja.totalDatafono3G)/(info.caja.totalDatafono3G+info.caja.totalClearOne))*100).toFixed(2): '0'} %
                                      </span>
                                    </td>
                                  </tr>																
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>ClearOne:</strong> ${(info.caja.totalDatafono3G+info.caja.totalClearOne != 0) ? (((info.caja.totalClearOne)/(info.caja.totalDatafono3G+info.caja.totalClearOne))*100).toFixed(2) : '0'} %
                                      </span>
                                    </td>
                                  </tr>																
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Clients atesos:</strong> ${info.caja.nClientes}
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Recaudat:</strong> ${info.caja.recaudado.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>																
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Canvi inicial:</strong> ${info.caja.totalApertura.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Canvi final:</strong> ${info.caja.totalCierre.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          												
                          <p>Información extra:</p>
                          <table class="attributes" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td class="attributes_content">
                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Teórico efectivo:</strong> ${info.caja.infoExtra.totalEnEfectivo.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Teórico tarjeta:</strong> ${info.caja.infoExtra.totalTarjeta.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>																
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Total entradas:</strong> ${info.caja.infoExtra.totalEntradas.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Total salidas:</strong> ${info.caja.infoExtra.totalSalidas.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>						

                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Total deudas:</strong> ${info.caja.infoExtra.totalDeuda.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Deuda Deliveroo:</strong> ${info.deudaDeliveroo.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Deuda Glovo:</strong> ${info.deudaGlovo.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Total T.Restaurant:</strong> ${info.totalTkrs.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Nombre dependienta (cierre):</strong> ${info.nombreDependienta}
                                      </span>
                                    </td>
                                  </tr>													
                                  <tr>
                                    <td class="attributes_item">
                                      <span class="f-fallback">
                                      <strong>Introducido dependienta 3G:</strong> ${info.caja.totalDatafono3G.toFixed(2)} €
                                      </span>
                                    </td>
                                  </tr>								                                 													
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!-- Action -->
                          <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td align="center">
                                <!-- Border based button
                                  https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                  <tr>
                                    <td align="center" style="font-weight: bold">
                                      Movimientos entrada/salida:
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table class="purchase" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <h3>Fecha</h3>
                              </td>														
                              <td>
                                <h3>Concepto</h3>
                              </td>														
                              <td>
                                <h3>Tipo</h3>
                              </td>
                              <td>
                                <h3 class="align-right">Valor</h3>
                              </td>
                            </tr>
                            ${htmlMovimientos}
                          </table>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="content-cell" align="center">
                        <p class="f-fallback sub align-center">&copy; 2020 Soluciones IT 365 S.L. Todos los derechos reservados</p>											
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
    var destinatarios = '';
    if(info.nombreTienda == 'T--000')
    {
      destinatarios = 'ezequiel@solucionesit365.com';
    }
    else
    {
      destinatarios = 'ezequiel@solucionesit365.com, atena@silemabcn.com';
    }
    let mailOptions = {
    from: 'mensajestocgame@gmail.com',
    to: destinatarios,
    subject: 'Info. caja [' + info.nombreTienda + '] [' + fechaParaTitulo(info.caja.finalTime)+ ']',
    html: codigoHTML
    };
    
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
    
}

exports.enviarEmail = enviarEmail;