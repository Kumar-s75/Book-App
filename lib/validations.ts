import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty('University card is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});


export const bookSchema=z.object(shape:{
  title: z.string().trim().min(minLength:2).max(maxLength:100),
  description: z.string().trim().min(minLength:10).max(maxLength:1000),
  author:z.string().trim().min(minLength:2).max(maxLength:100),
  genre:z.string().trim().min(minLength:2).max(maxLength:50),
  rating:z.number().min(value:1).max(value:5),
  totalCopies:z.coerce.number().int().positive().lte(10000),
  coverUrl:z.string().nonempty(),
  coverColor:z.string().trim().regex(regex:/^#[0-9A-F]{6}$/i),
  videoUrl:z.string().nonempty(),
  summary:z.string().trim().min(minLength:10),


})