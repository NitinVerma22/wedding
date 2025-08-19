
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Data = {
  images: string[];
  heroImage: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { event } = req.query;
  
  if (typeof event !== 'string') {
    return res.status(400).json({ images: [], heroImage: '' });
  }

  const publicDir = path.join(process.cwd(), 'public', 'images');
  
  try {
    // Check if images directory exists
    if (!fs.existsSync(publicDir)) {
      return res.status(200).json({ 
        images: [], 
        heroImage: `/images/${event}-hero.jpg` 
      });
    }

    const files = fs.readdirSync(publicDir);
    
    // Filter images for the specific event
    const eventImages = files
      .filter(file => {
        const name = file.toLowerCase();
        return name.startsWith(`${event.toLowerCase()}`) && 
               !name.includes('hero') &&
               (name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png'));
      })
      .map(file => `/images/${file}`)
      .sort(); // Sort to maintain consistent order

    const heroImage = `/images/${event}-hero.jpg`;

    res.status(200).json({ 
      images: eventImages, 
      heroImage 
    });
  } catch (error) {
    res.status(500).json({ 
      images: [], 
      heroImage: `/images/${event}-hero.jpg` 
    });
  }
}
