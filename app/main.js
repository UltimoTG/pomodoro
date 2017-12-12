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

  // FAQ window
  faqWindow = new BrowserWindow({
      width:700,
      height:450,
      center:true,
      transparent: true,
      show: false,
      frame: false
  });
  faqWindow.loadURL('file://' + __dirname + '/templates/faq.html');

  // Settings window
  settingsWindow = new BrowserWindow({
      width:700,
      height:450,
      center:true,
      transparent: true,
      show: false,
      frame: false
  });
  settingsWindow.loadURL('file://' + __dirname + '/templates/settings.html');

  // display main window once ready to show
  appWindow.once('ready-to-show', function() {
    appWindow.show();
  });

  ipc.on('openFAQ', function(event, arg){
    event.returnValue='';
    faqWindow.show();
  });

  ipc.on('closeFAQ', function(event, arg){
    event.returnValue='';
    faqWindow.hide();
  });

  ipc.on('openSettings', function(event, arg){
    event.returnValue='';
    settingsWindow.show();
  });

  ipc.on('closeSettings', function(event, arg){
    event.returnValue='';
    settingsWindow.hide();
  });
});
