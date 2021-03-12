#!/bin/bash

#Cerrar ClearOne si estuviese instalado
sh ~/clearOne/clearOne.sh

#Dependencias ESCPOS USB y ClearONE
sudo dpkg --add-architecture i386
sudo apt update -y
sudo apt upgrade -y
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 -y

#NodeJS + NPM
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
source ~/.profile
nvm install 12.19.0

#Acciones previsorias
killall tocGame
killall lanzadera.sh
echo sa | sudo -S rm -rf ~/inicioGnome/  ~/tocGame/ ~/updater/ ~/clearOne/ ~/instaladorBeta.* ~/instalador.zip.* ~/instalador.zip ~/instalador/ ~/tocGameFunciona/ ~/tocGameTemporal/ ~/tocGameScripts/

#Instalar GIT y descargar archivos del instalador
sudo apt install git -y
cd ~
git clone --depth 1 https://github.com/dobleamarilla/instalador.git

#ClearONE
cd instalador
cp -f -r clearOne ~

#Updater
cp -f -r updater ~

#TocGame
wget http://silema.hiterp.com/instalador/binariosToc.zip
unzip binariosToc.zip
cp -f -r tocGame ~

#Scripts tocGame
cp -f -r tocGame/scripts ~/tocGame

#Arranque automático y persistencia
sudo cp inicioGnome/clearOne.desktop /etc/xdg/autostart
sudo cp inicioGnome/lanzadera.desktop /etc/xdg/autostart

#Permisos
sudo chmod a+x ~/tocGame/tocGame
sudo chmod a+x ~/tocGame/scripts/lanzadera.sh
sudo chmod a+x ~/tocGame/scripts/permisos.sh
sudo chmod a+x ~/tocGame/scripts/starttoc.sh
sudo chmod a+x ~/tocGame/scripts/minivpn.sh
sudo chmod a+x ~/tocGame/scripts/borrarMongo.sh
sudo chmod a+x ~/tocGame/scripts/borrarDatabase.sh
sudo chmod a+x ~/updater/tocGameUpdater.sh
sudo chmod a+x ~/clearOne/clearOne.sh
sudo chmod a+x ~/clearOne/CoLinux
sudo chmod a+x ~/clearOne/kill_ipcs.sh
sudo chmod a+x ~/clearOne/kil_sema.sh

#MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl enable mongod

#Limpieza
echo sa | sudo -S rm -rf ~/instalador/ ~/instalador.sh

#Reinicio
reboot