'use strict';

const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow(
        {
            width: 2000,
            height: 1500
        }
    );
    //win.webContents.openDevTools();

    win.loadURL(`file://${__dirname}/index.html`);

    win.on('closed', () => {
        win = null;
    });


}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('active', () => {
    if (win === null) {
        createWindow();
    }
});