const electron = require('electron');
const dialog = require('electron').dialog;
const fs = require('fs');
const { ipcMain } = require('electron');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 870,
        resizable: true
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../www/index.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    app.quit();
    // }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});


function generateFile(event, res, arg) {
    const homeDir = app.getPath('home');
    const menuDir = `${homeDir}/.local/share/applications/`;
    // console.log();

    let fileContents = '#!/usr/bin/env xdg-open' +
        '\n[Desktop Entry]' +
        '\nVersion=1.0';
    // fileContents += "\n" + "Type=" + "Application";
    fileContents += `${'\nType='}${arg.state.valueTp}`;
    // fileContents += "\n" + "Name=" + "Simple Note";
    fileContents += `${'\nName='}${arg.state.valueName}`;
    // fileContents += "\n" + "Icon=" + "/home/brunno/Install/simplenote/Simplenote.png";valueIcon
    fileContents += `${'\nIcon='}${arg.state.valueIcon}`;
    // fileContents += "\n" + "Icon=" + "/home/brunno/Install/simplenote/Simplenote.png";
    fileContents += `${'\nExec='}${arg.state.valueExec}`;
    // fileContents += "\n" + "Exec=" + "/home/brunno/Install/simplenote/Simplenote";
    fileContents += `${'\nComment='}${arg.state.valueComment}`;
    // fileContents += "\n" + "Comment=" + "note notepad fast write text";
    // fileContents += "\n" + "Categories=" + "IDE;Development;";
    fileContents += `${'\nCategories='}${arg.state.valueCategories}`;
    let tpTerminal = '';
    if (arg.state.valueTerminal === 1) {
        tpTerminal = 'true';
    } else {
        tpTerminal = 'false';
    }
    fileContents += `${'\nTerminal='}${tpTerminal}`;
    if (arg.state.valueWMClass !== '') {
        fileContents += `${'\nStartupWMClass='}${arg.state.valueWMClass}`;
    }

    // event.sender.send('asynchronous-reply', res);

    // var fileName = "SimpleNote.desktop";
    let fileName = (`${arg.state.valueName}.desktop`).replace(' ', '');
    fileName = menuDir + fileName;

    console.log(`Creating File ${fileName}`);

    fs.writeFile(fileName, fileContents, (err) => {
        if (err) {
            res.noError = 0;
            res.error = err;

            // return console.log(err);
            console.log('The file was NOT saved!');
            console.log(res);
        } else {
            res.error = '';
            res.noError = 1;
            console.log('The file was saved!');
            console.log(`Contents${fileContents}`);
            console.log(`Name${arg.state.valueName}`);
        }
        event.sender.send('asynchronous-reply', res);
    });
}

ipcMain.on('asynchronous-message', (ev, argument) => {
    console.log(argument); // prints "ping"

    if (argument.type === 'loadExecutable') {
        const res = {
            type: 'execPath',
            path: 'xablau',
            noError: 1
        };
        dialog.showOpenDialog({
            properties: ['openFile']
        }, (files) => {
            if (files) {
                res.files = files;
            } else {
                res.noError = 0;
            }
            ev.sender.send('asynchronous-reply', res);
        });
    }

    if (argument.type === 'loadIcon') {
        const res = {
            type: 'iconPath',
            path: 'xablonga',
            noError: 1
        };
        dialog.showOpenDialog({
            properties: ['openFile']
        }, (files) => {
            if (files) {
                res.files = files;
            } else {
                res.noError = 0;
            }
            ev.sender.send('asynchronous-reply', res);
        });
    }


    if (argument.type === 'createFile') {
        const res = {
            type: 'createShortcut',
            response: 'xablau',
            noError: 1,
            error: ''
        };

        generateFile(ev, res, argument);
    }

    if (argument.type === 'log') {
        console.log(argument);
    }
});
