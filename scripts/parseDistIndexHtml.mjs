import fs from 'fs/promises';
import path from 'path';

const htmlFilePath = path.resolve('./dist/index.html');

async function editHtml() {
  try {
    const htmlContent = await fs.readFile(htmlFilePath, 'utf-8');

    const modifiedHtmlContent = htmlContent.replace('src="../dist/index.js"', 'src="./index.js"');

    await fs.writeFile(htmlFilePath, modifiedHtmlContent, 'utf-8');
  } catch (error) {
    console.error('Error updating index.html:', error);
  }
}

editHtml();
