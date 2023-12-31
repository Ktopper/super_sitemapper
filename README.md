

### **Super SiteMapper: Summary & User Guide**

**Application Overview:**
Super SiteMapper is an Electron-based desktop application that allows users to generate a sitemap XML for a given website URL. The app provides additional customization options for each sitemap entry, such as specifying the last modification date, change frequency, and priority.

**How It Works:**
1. **Frontend**: The frontend UI is built using standard web technologies: HTML, CSS, and JavaScript. It provides input fields for the website URL, last modification date, change frequency, and priority.

2. **Backend**: Electron provides a main process (`main.js`) and renderer processes (`renderer.js`). The main process initializes and manages application windows, while the renderer processes handle the rendering of web pages within those windows.

3. **Sitemap Generation**: The app leverages the Puppeteer library to crawl the specified website. It retrieves all internal links up to the specified depth and organizes them into a sitemap XML format. Additional sitemap XML tags (like `<lastmod>`, `<changefreq>`, and `<priority>`) are added based on user input.

4. **Display & Export**: Once the sitemap is generated, it's displayed in a textarea on the frontend. Users can then manually copy the generated XML.

### Setting Up the Application:

- Clone or download the project from GitHub.
- Navigate to the project folder in the terminal.
- Run npm install to install all required dependencies.
- Launch the application with npm start.


**How to Use Super SiteMapper:**
1. **Enter Website URL**: Start by typing the full URL (e.g., `https://www.example.com`) of the website you want to generate a sitemap for.

2. **Specify Optional Details**: 
    - `Last Modification Date`: This represents the date when the webpage was last modified. By default, it's set to today's date.
    - `Change Frequency`: Indicates how frequently the content of the webpage is likely to change. Select from the dropdown options like "daily", "weekly", "monthly", etc.
    - `Priority`: This value indicates the priority of a particular URL relative to other URLs on the same website. It's a number between 0.0 (lowest priority) and 1.0 (highest priority).

3. **Generate Sitemap**: Click the "Generate Sitemap" button. The app will crawl the website and display the sitemap XML in the textarea below.

4. **Copy & Use**: Once the sitemap is generated, you can copy the XML from the textarea. This XML can then be uploaded to your website's root directory and submitted to search engines to improve SEO.

---

