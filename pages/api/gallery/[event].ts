
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Data = {
  images: string[];
  heroImages: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { event } = req.query;
  
  if (typeof event !== 'string') {
    return res.status(400).json({ images: [], heroImages: [] });
  }

  const eventDir = path.join(process.cwd(), 'public', 'images', event.toLowerCase());
  
  try {
    // Check if event directory exists
  if (!fs.existsSync(eventDir)) {
    return res.status(200).json({ 
      images: [], 
      heroImages: [
        `/images/${event.toLowerCase()}/${event.toLowerCase()}-1.webp`,
        `/images/${event.toLowerCase()}/${event.toLowerCase()}-2.webp`,
        `/images/${event.toLowerCase()}/${event.toLowerCase()}-3.webp`
      ]
    });
  }

    const files = fs.readdirSync(eventDir);
    
    // Filter images for the specific event
    const eventImages = files
      .filter(file => {
        const name = file.toLowerCase();
        return (name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png') || name.endsWith('.webp'));
      })
      .map(file => `/images/${event.toLowerCase()}/${file}`)
      .sort(); // Sort to maintain consistent order

    // Get first 3 images for carousel (or all available if less than 3)
    const heroImages = eventImages.slice(0, 3);

    res.status(200).json({ 
      images: eventImages, 
      heroImages 
    });
  } catch (error) {
    res.status(500).json({ 
      images: [], 
      heroImages: [
        `/images/${event.toLowerCase()}/${event.toLowerCase()}-1.webp`,
        `/images/${event.toLowerCase()}/${event.toLowerCase()}-2.webp`,
        `/images/${event.toLowerCase()}/${event.toLowerCase()}-3.webp`
      ]
    });
  }
}
