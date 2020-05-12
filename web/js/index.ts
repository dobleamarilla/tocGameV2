var toc: TocGame;
electron.ipcRenderer.send('getParametros',  ()=>{
    console.log("Eres un fenómeno");
});
electron.ipcRenderer.on('getParametros', (event, res)=>{
    console.log(res.toJSON());
    toc = new TocGame(res);
});