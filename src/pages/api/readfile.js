import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const queryParam = req.query.slug; 
    // Check if file exists before attempting to read i
    const filePath = path.join(process.cwd(), 'blogpost', `${queryParam}.json`);
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return res.status(404).json({ error: 'File not found' });
    }

    const fileContent = await readFile(filePath);
    const parsedContent = JSON.parse(fileContent);
    res.status(200).json(parsedContent);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function readFile(filePath) {
  try {
    const fileContent = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
    return fileContent;
  } catch (error) {
    throw error; 
  }
}
