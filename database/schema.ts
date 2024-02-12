import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const accountType = pgEnum("accountType", [
  "admin",
  "doctor",
  "patient",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  displayName: text("display_name"),
  email: varchar("email"),
  password: varchar("password"),
  accountType: accountType("account_type")
    .notNull()
    .default("patient" as const),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
