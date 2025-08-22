import { boolean, integer, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});
export const coursesTable = pgTable("courses", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    cid: varchar().notNull().unique(),
    Name: varchar(),
    Description: varchar(),
    NumbreChapetrs: integer().notNull(),
    IncludeVideo: boolean().default(false),
    ChooseLevel: varchar(),
    Category: varchar(),
    courseJson: json(),
    courseContent: json(),
    imageURL: varchar().default(""),
    email: varchar('email').references(() => usersTable.email),
});
export const enrollToCourseTable = pgTable("enrollToCourseTable", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    cid: varchar('cid').references(() => coursesTable.cid),
    email: varchar('email').references(() => usersTable.email),
    coursesDone: json()
})
