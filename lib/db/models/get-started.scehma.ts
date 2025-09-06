import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const getStartedForm = pgTable("get_started_form", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstname: varchar("firstname", { length: 255 }).notNull(),
  lastname: varchar("lastname", { length: 255 }).notNull(),
  businessemail: varchar("businessemail", { length: 255 }).notNull(),
  businesscontact: varchar("businesscontact", { length: 20 }).notNull(),

  products: varchar("products", { length: 255 }),
  industry: varchar("industry", { length: 255 }),
  comments: text("comments"),

  tncCheckbox: boolean("tnc_checkbox").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull()
});
