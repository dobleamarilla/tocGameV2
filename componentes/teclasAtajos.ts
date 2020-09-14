var exec = require('child_process').exec;
var os = require('os');

function execute(command, callback) 
{
    exec(command, (error, stdout, stderr) => 
    {
        callback(stdout);
    });
};
function atajosTeclado(globalShortcut, ventana) 
{
    /* REFRESH TOC */
    globalShortcut.register('F5', function () 
    {
        ventana.reload();
    });
    /* CLOSE TOC */
    globalShortcut.register('F4', function () 
    {
        ventana.close();
    });
    /* ACTUALIZAR TOCGAME */
    globalShortcut.register('F2', function () 
    {
        actualizarTocSanPedro();
    });
}
function actualizarTocSanPedro()
{
    if (os.platform() === 'win32') 
    {
        console.log("SOY WINDOWS! DE MOMENTO NO HAGO NADA, PERO LO HE INTENTADO");
    }
    else 
    {
        if (os.platform() === 'linux') 
        {
            console.log("SOY LINUX");
            execute('gnome-terminal -- bash -c "~/./instalador.sh; exec bash"', (output) => 
            {
                console.log(output);
            });
        }
    }
}
exports.atajos = atajosTeclado;
exports.actualizarTocSanPedro = actualizarTocSanPedro;