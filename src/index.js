import { app, BrowserWindow, ipcMain } from 'electron';
import isDev  from 'electron-is-dev';
//ONLY THIS IS THE MAIN PROCESS
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
/**
* package - create output files
* make - package + deb etc
* publish - make + github
*/
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

//main window options
const mainWindowOptions=null;
if (isDev) {
  mainWindowOptions= {
    width: 1200,
    height: 600,
    icon: __dirname + '/img/favicon.ico'
  }
} else {
  mainWindowOptions= {
    width: 800,
    height: 600,
    resizable:false ,
    icon: __dirname + '/img/favicon.ico',
    webPreferences: {
      devTools: false
    }
  }
}

function loadMainWindow(){
  mainWindow.loadURL(`file://${__dirname}/newCharacter.html`);
}

function loadEditorWindow(){
  mainWindow.loadURL(`file://${__dirname}/newCharacter.html`);
}

function loadGameWindow(){
  mainWindow.loadURL(`file://${__dirname}/game.html`);
}

app.on('ready', function(){
  mainWindow = new BrowserWindow(mainWindowOptions);
  
  // and load the index.html of the app.
  loadMainWindow()
  
  // Open the DevTools.
  if (isDev) 
  mainWindow.webContents.openDevTools();
  else
  mainWindow.setMenu(null);
  //TODO check that language and log status query is done only once
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow();
  }
});

//other configuration

mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'modal') {
    // open window as modal
    event.preventDefault()
    Object.assign(options, {
      modal: true,
      parent: mainWindow,
      width: 100,
      height: 100
    })
    event.newGuest = new BrowserWindow(options)
  }
})




//comunication

ipcMain.on("launchEditor", (event, content) => {
  console.log("ipcMain on create character");
  console.log(content);
  
  loadEditorWindow()
  
});

ipcMain.on("hideEditor", (event, content) => {
  console.log("ipcMain on create character");
  console.log(content);
  
  loadMainWindow()
  
});

ipcMain.on("LaunchGame", (event, content) => {
  console.log("ipcMain on enter game");
  console.log(content);
  loadGameWindow()
});

