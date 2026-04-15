const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const treeKill = require("tree-kill");

let mainWindow;
let backendProcess;
let frontendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  // Poll until frontend is available
  const checkInterval = setInterval(() => {
    mainWindow.loadURL("http://localhost:3000").then(() => {
      clearInterval(checkInterval);
    }).catch(() => {
      // Still waiting for Next.js to start
    });
  }, 1000);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function startBackend() {
  const backendPath = path.join(__dirname, "backend");
  backendProcess = spawn("node", ["src/server.js"], {
    cwd: backendPath,
    stdio: "inherit",
    shell: true,
  });
}

function startFrontend() {
  const frontendPath = path.join(__dirname, "frontend");
  // Assuming frontend is already built. We run next start.
  frontendProcess = spawn("npx", ["next", "start", "-p", "3000"], {
    cwd: frontendPath,
    stdio: "inherit",
    shell: true,
  });
}

app.on("ready", () => {
  startBackend();
  startFrontend();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  if (backendProcess && backendProcess.pid) {
    treeKill(backendProcess.pid);
  }
  if (frontendProcess && frontendProcess.pid) {
    treeKill(frontendProcess.pid);
  }
});
