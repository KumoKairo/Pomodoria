const { app, BrowserWindow } = require('electron');

let window;

function createWindow() {
    window = new BrowserWindow({
        //width: 304,
        //height: 256,
        //maximizable: false,
        //resizable: false,
        alwaysOnTop: false
    });

    window.loadFile('view/timer.html');

    //window.setMenu(null);

    window.on('closed', () => {
        window = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (window == null) {
        createWindow();
    }
});