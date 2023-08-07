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

async function crawlPage(page, url, depth = 1, maxDepth = 2) {
    if (depth > maxDepth) {
      return [];
    }
  
    await page.goto(url, { waitUntil: 'networkidle2' });
  
    // Extract all links from the current page
    const linksOnPage = await page.$$eval('a', as => as.map(a => a.href));
  
    // Filter out only the internal links
    const internalLinks = linksOnPage.filter(link => link.startsWith(url));
  
    let childLinks = [];
    for (const link of internalLinks) {
      // This will prevent the crawler from visiting a link it has already visited
      if (!childLinks.includes(link)) {
        childLinks.push(...await crawlPage(page, link, depth + 1, maxDepth));
      }
    }
  
    return [...internalLinks, ...childLinks];
  }
  

ipcMain.on('generate-sitemap', async (event, url) => {
  try {
    const page = await browser.newPage();

    const links = await crawlPage(page, url);

    await page.close();
    
    event.reply('sitemap-response', links);

  } catch (error) {
    event.reply('sitemap-response', null, error.toString());
  }
});
