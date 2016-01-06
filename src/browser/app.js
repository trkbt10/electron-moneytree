var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var fs = require('fs');
var Menu = require("menu");
var mainWindow = null;
app.on('window-all-closed', function() {
  app.quit();
});
app.on('ready', function() {
  mainWindow = new BrowserWindow({
    'width': 992,
    'height': 558,
    'use-content-size': true,
    'node-integration': false,
    'title': 'MoneyTree',
    'title-bar-style': 'hidden-inset',
    'icon': __dirname + '/icon.png'
  });

  mainWindow.loadURL('https://www.moneytree.jp/app/');
  mainWindow.webContents.on('dom-ready', function() {
    mainWindow.webContents.insertCSS(`
      .mt-header {
          position:fixed;
          top:0;
          left:0;
          width:100%;
      }
      .mt-header.container-fluid {
        padding-left: 80px;
        box-sizing: border-box;
      }
      .mt-header.container-fluid .link-container-width {
        width: 100%;
      }

      .mt-header.container-fluid .link-container-width .col-sm-4 {
        display: none;
      }

      .mt-header.container-fluid .link-container-width .col-sm-5 {
        width: 75%;
      }
      .list-inline {
        text-align: center;
      }
      .list-inline li {
        float:none;
        display: inline-block;
      }
  `);
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  var template = [{
      label: "Moneytree",
      submenu: [
          { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
          { type: "separator" },
          { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]}, {
      label: "Edit",
      submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]}
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});
