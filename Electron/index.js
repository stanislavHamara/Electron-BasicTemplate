const electron = require('electron')
const log = require('electron-log')
const ipcMain = electron.ipcMain

const app = electron.app
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const path = require('path')
const url = require('url')
let autoUpdater = undefined

log.info('Electron started...')
log.info('Electron version: ' + app.getVersion())
log.transports.file.level = 'info'

const buildDestination = "./ui";

function isDebug() {
    return process.argv.length > 3 && process.argv[2] === 'debug'
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800
    })

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.setTitle('Sensitive Data Detector (' + app.getVersion() + ')')
    })

    global.dirname = __dirname;
    global.userDataPath = app.getPath('userData')

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, buildDestination + '/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

app.on('ready', function () {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})
