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
