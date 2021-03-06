import {app, BrowserWindow, Menu, MenuItem, dialog} from "electron"
import * as fs from "fs"
import * as csv from "csv-parser"
import * as path from "path"
import * as url from "url"
import {option, map} from "fp-ts/lib/Option"
import fetch from "electron-fetch"
import {flow} from "fp-ts/lib/function"
import {Either, fold} from "fp-ts/lib/Either"

let mainWindow: BrowserWindow | null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      webSecurity: false,
      devTools: process.env.NODE_ENV === "production" ? false : true,
    },
  })
  const upload = () => {
    const results: any = []
    const filePath = dialog.showOpenDialog({title: "Upload CSV"})
    fs.createReadStream(filePath[0])
      .pipe(csv())
      .on("data", data => results.push(data))
      .on("end", () => {
        fetch("http://localhost:8080/csv", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(results),
        })
          .then(value => value.json() as Promise<Either<Error, any>>)
          .then(
            fold(
              err => console.log(`Error processing CSV: ${err.message}`),
              () => {}
            )
          )
      })
  }
  const menu = Menu.buildFromTemplate([
    {
      label: app.getName(),
    },
    {
      label: "File",
      submenu: [
        {
          label: "Import AMEX CSV",
          click: upload,
        },
        {role: "toggledevtools"},
        {role: "reload"},
      ],
    },
  ])
  // const currentMenu = option.of(Menu.getApplicationMenu())
  // flow(
  //   map<Menu | null, Menu>((menu: Menu) => {
  //     menu.items.push({
  //       label: "Import AMEX CSV",
  //       checked: false,
  //       enabled: true,
  //       visible: true,
  //       click: upload,
  //     })
  //     return menu
  //   }),
  //   map(Menu.setApplicationMenu)
  // )(currentMenu)
  Menu.setApplicationMenu(menu)

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"),
      protocol: "file:",
      slashes: true,
    })
  )

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
