const { app, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');
const exec = require('shelljs.exec');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, loadingWindow;

function createWindow() {
    loadingWindow = new BrowserWindow({
        width: 640,
        height: 400,
        backgroundColor: '#f1f1eb',
        icon: path.join(__dirname, '../public/electron-app/main-icon.png'),
        show: false,
        frame: false
    });

    // Create the browser window.
    loadingWindow.once('show', () => {
        mainWindow = new BrowserWindow({
            width: 1280,
            height: 800,
            minWidth: 1000,
            minHeight: 600,
            backgroundColor: '#f1f1eb',
            icon: path.join(__dirname, '../public/electron-app/main-icon.png'),
            show: false
        });
    
        mainWindow.webContents.once('dom-ready', () => {
            mainWindow.show();
            loadingWindow.hide();
            loadingWindow.close();
        });

        //mainWindow.loadURL('http://localhost:3000');

        setTimeout(() => mainWindow.loadURL('http://localhost:3000'), 1000);
        
        mainWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null;
            app.quit();
        });
    });

    loadingWindow.loadURL(`file://${__dirname}/loading.html`);
    loadingWindow.show();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.