const { ipcRenderer } = require('electron');

ipcRenderer.on('sitemap-response', (event, links, error) => {
    if (error) {
        alert('Error generating the sitemap: ' + error);
        return;
    }
    
    const priority = document.getElementById('priority').value;
    const changefreq = document.getElementById('changefreq').value;
    const lastmod = document.getElementById('lastmod').value;
    const uniqueLinks = [...new Set(links)];
    const sitemapXml = createSitemapXml(uniqueLinks, priority, changefreq, lastmod);
  
    document.getElementById('output').textContent = sitemapXml;
});

function generateSitemap() {
    const websiteUrl = document.getElementById('websiteUrl').value;
    if (!websiteUrl) {
        alert('Please enter a valid URL.');
        return;
    }

    const priority = document.getElementById('priority').value;
    const changefreq = document.getElementById('changefreq').value;
    const lastmod = document.getElementById('lastmod').value;

    const sitemapData = { websiteUrl, priority, changefreq, lastmod };
    ipcRenderer.send('generate-sitemap', sitemapData);
}

function createSitemapXml(links, priority, changefreq, lastmod) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const link of links) {
        xml += '  <url>\n';
        xml += `    <loc>${link}</loc>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += '  </url>\n';
    }

    xml += '</urlset>';
    return xml;
}

document.getElementById('generateBtn').addEventListener('click', generateSitemap);
