const { ipcRenderer } = require('electron');

ipcRenderer.on('sitemap-response', (event, links, error) => {
  if (error) {
    alert('Error generating the sitemap: ' + error);
    return;
  }
  
  const uniqueLinks = [...new Set(links)];
  const sitemapXml = createSitemapXml(uniqueLinks);

  document.getElementById('output').textContent = sitemapXml;
});

function generateSitemap() {
  const websiteUrl = document.getElementById('websiteUrl').value;
  if (!websiteUrl) {
    alert('Please enter a valid URL.');
    return;
  }

  ipcRenderer.send('generate-sitemap', websiteUrl);
}

function createSitemapXml(links) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const link of links) {
    xml += '  <url>\n';
    xml += `    <loc>${link}</loc>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>';
  return xml;
}
