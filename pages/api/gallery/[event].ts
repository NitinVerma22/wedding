
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

  const eventDir = path.join(process.cwd(), 'public', 'images', event.toLowerCase());
  
  try {
    // Check if event directory exists
    if (!fs.existsSync(eventDir)) {
      return res.status(200).json({ 
        images: [], 
        heroImage: `/images/${event.toLowerCase()}/${event.toLowerCase()}-hero.webp` 
      });
    }

    const files = fs.readdirSync(eventDir);
    
    // Filter images for the specific event (excluding hero images)
    const eventImages = files
      .filter(file => {
        const name = file.toLowerCase();
        return !name.includes('hero') &&
               (name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png') || name.endsWith('.webp'));
      })
      .map(file => `/images/${event.toLowerCase()}/${file}`)
      .sort(); // Sort to maintain consistent order

    // Look for hero image in different formats (prefer WebP)
    let heroImage = `/images/${event.toLowerCase()}/${event.toLowerCase()}-hero.webp`;
    const heroFiles = files.filter(file => file.toLowerCase().includes('hero'));
    if (heroFiles.length > 0) {
      // Prefer WebP, then other formats
      const webpHero = heroFiles.find(file => file.toLowerCase().endsWith('.webp'));
      const jpgHero = heroFiles.find(file => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'));
      const pngHero = heroFiles.find(file => file.toLowerCase().endsWith('.png'));
      
      if (webpHero) {
        heroImage = `/images/${event.toLowerCase()}/${webpHero}`;
      } else if (jpgHero) {
        heroImage = `/images/${event.toLowerCase()}/${jpgHero}`;
      } else if (pngHero) {
        heroImage = `/images/${event.toLowerCase()}/${pngHero}`;
      }
    }

    res.status(200).json({ 
      images: eventImages, 
      heroImage 
    });
  } catch (error) {
    res.status(500).json({ 
      images: [], 
      heroImage: `/images/${event.toLowerCase()}/${event.toLowerCase()}-hero.webp` 
    });
  }
}
