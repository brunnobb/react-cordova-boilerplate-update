#!/bin/sh
cd electron
electron-packager ./../www/ react-cordova-bolerplate --platform=linux --arch=x64 --overwrite --version=1.0.0 --icon=../img/icon.png --out=../build --version-string.CompanyName=com.verticalti --version-string.ProductName=UbuntuLauncherCreator --version-string.ProductVersion=1.0 --ignore="node_modules/(some-package[0-9]*|dev-dependency)"
