import { neon } from "@neondatabase/serverless";
import dummyBooks from "../dummybooks.json";
import { drizzle } from "drizzle-orm/neon-http";
// import ImageKit from "image"; // You missed importing this

import { books } from "@/database/schema"; // Assuming you have this schema
import ImageKit from "imagekit";
import dotenv from 'dotenv';
// dotenv.config();


dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // You were mistakenly using the public key here
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
    return null;
  }
};

export const seed = async () => { // Seed function should be async
  console.log("Seeding data.....");

  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      );

      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      );

      if (coverUrl && videoUrl) {
        await db.insert(books).values({
          ...book,
          coverUrl,
          videoUrl
        });
      }
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
