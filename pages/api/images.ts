import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

function getAllImages(absDir: string, basePublicPath: string): string[] {
  let results: string[] = [];
  const entries = fs.readdirSync(absDir, { withFileTypes: true });

  for (const entry of entries) {
    const abs = path.join(absDir, entry.name);
    const pub = path.posix.join(basePublicPath, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllImages(abs, pub));
    } else if (/\.(jpe?g|png|gif|webp|avif)$/i.test(entry.name)) {
      results.push(pub);
    }
  }
  return results;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const folder = (req.query.folder as string || "images").replace(/^\/*|\/*$/g, "");
  if (folder.includes("..")) return res.status(400).json({ error: "Invalid folder" });

  const root = path.join(process.cwd(), "public");
  const absTarget = path.join(root, folder);

  if (!fs.existsSync(absTarget)) return res.status(200).json([]);
  const images = getAllImages(absTarget, "/" + folder);
  res.status(200).json(images);
}
