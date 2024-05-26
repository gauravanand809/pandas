import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const directoryPath = path.join(process.cwd(), 'blogpost');

  try {
    const files = await readDirectory(directoryPath);
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function readDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, { encoding: 'utf-8' }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}
