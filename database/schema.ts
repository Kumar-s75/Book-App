import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  serial
} from 'drizzle-orm/pg-core';


// ✅ Declare enums first
export const STATUS_ENUM = pgEnum('status', ['Pending', 'Approved', 'Rejected']);
export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN']);
export const BORROW_STATUS_ENUM = pgEnum('borrow_status', ['BORROWED', 'RETURNED']);

// ✅ Then define the table
export const users = pgTable("users", {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),

  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),

  status: STATUS_ENUM("status").default("Pending"),
  role: ROLE_ENUM("role").default("USER"),

  lastActivityDate: timestamp("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});


export const books = pgTable("users", {
  id: uuid('id').defaultRandom().notNull().primaryKey().defaultRandom().unique(),

  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre:text('genre').notNull(),
  rating:integer('rating').notNull(),
  coverUrl:text('cover_url').notNull(),
  coverColor:varchar("cover_color"),{length:7}).notNull(),
  description:text(name:'description').notNull(),
  totalCopies:integer('total_copies').notNull().default(value:1),
  availableCopies:integer('available_copies').notNull().default(value:0),
  videoUrl:text('video_url').notNull(),
  summary:varchar('summary').notNull(),
  createdAt:timestamp('created_at',{withTimezone:true}).defaultNow(),
  

  
});