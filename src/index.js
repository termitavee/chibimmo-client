import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import isDev  from 'electron-is-dev';

//ONLY THIS IS THE MAIN PROCESS
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
/**
* package - create output files
* make - package + deb etc
* publish - make + github
https://www.gitbook.com/
*/
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

//main window options
let mainWindowOptions=null;
//process.env.NODE_ENV
if (isDev) {
  //enableLiveReload()
  mainWindowOptions= {
    width: 1200,
    height: 600,
    icon: __dirname + '/img/icon.jpg'
  }
} else {
  mainWindowOptions= {
    width: 800,
    height: 600,
    resizable:false ,
    icon: __dirname + '/img/icon.jpg',
    webPreferences: {
      devTools: false
    }
  }
}

function loadLogInWindow(){
  mainWindow.loadURL(`file://${__dirname}/index.html`);
}

function loadMainWindow(){
  mainWindow.loadURL(`file://${__dirname}/logged.html`);
}

function loadEditorWindow(){
  mainWindow.loadURL(`file://${__dirname}/newCharacter.html`);
}

function loadGameWindow(){
  mainWindow.loadURL(`file://${__dirname}/game.html`);
}

function createMainWindow(){
  mainWindow = new BrowserWindow(mainWindowOptions);
  
  // and load the index.html of the app.
  loadLogInWindow()
  
  // Open the DevTools.
  if(isDev){
    
    //installExtension(VUEJS_DEVTOOLS);
    mainWindow.webContents.openDevTools();
  }else mainWindow.setMenu(null);
  
  //TODO check that language and log status query is done only once
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
app.on('ready', function(){
  
  createMainWindow()

  /*
  import { shell } from 'electron'
  
  mainWindow.webContents.on('new-window', (event, url) => {
    // stop Electron from opening another BrowserWindow
    event.preventDefault()
    // open the url in the default system browser
    shell.openExternal(url)
  })
  */
  
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

//comunication

ipcMain.on("logIn", (event, logged) => {
  console.log("Main process on LogChanged");
  console.log('content='+logged);
  if(logged){
    loadMainWindow()
  }else{
    loadLogInWindow()
  }
  //mainWindow.reload()
  
});

  
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

ipcMain.on("launchGame", (event, content) => {
  console.log("ipcMain on enter game");
  console.log(content);
  loadGameWindow()
  mainWindow.setFullScreen(true)
});

ipcMain.on("exitGame", (event, content) => {
  console.log("ipcMain on exit game");
  console.log(content);
  loadMainWindow()
  mainWindow.setFullScreen(false)
});

console.log('render proccess completed')