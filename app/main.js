var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var app = electron.app;
var ipc = electron.ipcMain;

// Main window
app.on('ready', function() {
  var appWindow, faqWindow, settingsWindow;
  appWindow = new BrowserWindow({
      width:820,
      height:510,
      center:true,
      show: false
  });
  appWindow.loadURL('file://' + __dirname + '/templates/timer.html');

  // display main window once ready to show
  appWindow.once('ready-to-show', function() {
    appWindow.show();
  });
});
