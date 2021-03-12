#!/bin/bash

#Acciones previsorias
killall tocGame
killall lanzadera.sh
echo sa | sudo -S rm -rf ~/inicioGnome/  ~/tocGame/ ~/instaladorBeta.* ~/instalador.zip.* ~/instalador.zip ~/instalador/ ~/tocGameFunciona/ ~/tocGameTemporal/ ~/tocGameScripts/

#Descargar archivos del instalador
cd ~
git clone --depth 1 https://github.com/dobleamarilla/instalador.git
cd instalador
#TocGame
wget http://silema.hiterp.com/instalador/binariosToc.zip
unzip binariosToc.zip
cp -f -r tocGame ~

#Scripts tocGame
cp -f -r tocGame/scripts ~/tocGame

#Permisos
sudo chmod a+x ~/tocGame/tocGame
sudo chmod a+x ~/tocGame/scripts/lanzadera.sh
sudo chmod a+x ~/tocGame/scripts/permisos.sh
sudo chmod a+x ~/tocGame/scripts/starttoc.sh
sudo chmod a+x ~/updater/tocGameUpdater.sh
sudo chmod a+x ~/clearOne/clearOne.sh
sudo chmod a+x ~/clearOne/CoLinux
sudo chmod a+x ~/clearOne/kill_ipcs.sh
sudo chmod a+x ~/clearOne/kil_sema.sh

#Limpieza
echo sa | sudo -S rm -rf ~/instalador/ ~/instalador.sh
~/tocGame/scripts/lanzadera.sh & disown