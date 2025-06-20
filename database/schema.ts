import { varchar,uuid,integer, pgTable, serial, text,boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const users = pgTable("users", { 
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName:varchar(name:"full_name",config:{length:255}).notNull(),
 email: text(name:"email").notNull().unique(),
 universityId:integer(name:"university_id").notNull().unique(),
 password:text(name:'password').notNull(),
 universityCard:text(name:'university_card').notNull(),
status:STATUS_ENUM(name:'status').default(value:'Pending'),
 role:ROLE_ENUM(name:'role').default(value:'USER'),
 lastActivityDate:date('last_activity_date').default('now()'),

//   name: text('name').notNull(),
//   age: integer('age').notNull(),
 
});



export const STATUS_ENUM=pgEnum(enumName:'status',values:['Pending','Approved','Rejected']);
export  const ROLE_ENUM=pgEnum(enumName:'role',values:['USER','ADMIN']);
export  const BORROW_STATUS_ENUM=pgEnum(enumName:'borrow_status',values:['BORROWED','RETURNED']);

// export const postsTable = pgTable('posts_table', {
//   id: serial('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at')
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
