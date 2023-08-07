const { app, BrowserWindow, ipcMain } = require('electron');
const puppeteer = require('puppeteer');

let browser;

async function createWindow() {
  browser = await puppeteer.launch();
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', async () => {
  if (browser) {
    await browser.close();
  }
  app.quit();
});

ipcMain.on('generate-sitemap', async (event, url) => {
  try {
    const page = await browser.newPage();
    await page.goto(url);
    
    const links = await page.$$eval('a', as => as.map(a => a.href));
    event.reply('sitemap-response', links);
    
    await page.close();
  } catch (error) {
    event.reply('sitemap-response', null, error.toString());
  }
});
