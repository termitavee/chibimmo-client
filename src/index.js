import { app, BrowserWindow, ipcMain } from 'electron';
//ONLY THIS IS THE MAIN PROCESS
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
/**
 * package - create output files
 * make - package + deb etc
 * publish - make + github
 */
/*const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable:false 
    icon: __dirname + '/img/favicon.ico'
    .ico 
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};*/

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    /*resizable:false */
    icon: __dirname + '/img/favicon.ico'
    /* .ico */
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

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
    createWindow();
  }
});

//comunication

ipcMain.on("login", (event, content) => {
  console.log("ipcMain on login");
  console.log(content);
  //check connection
  if(content.isLogin){
    //send login to the server
  }else{
    //
  }
  //send to server
});

