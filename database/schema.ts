import { relations } from "drizzle-orm";
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

export const doctorAppointments = pgTable("doctor_appointments", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  doctorId: uuid("doctor_id").notNull(),
  patientId: uuid("patient_id").notNull(),
  appointmentDate: timestamp("appointment_date", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const doctorAppointmentsPatientRelation = relations(
  doctorAppointments,
  ({ one }) => ({
    patient: one(users, {
      fields: [doctorAppointments.patientId],
      references: [users.id],
    }),
  })
);

export const doctorAppointmentsDoctorRelation = relations(
  doctorAppointments,
  ({ one }) => ({
    doctor: one(users, {
      fields: [doctorAppointments.doctorId],
      references: [users.id],
    }),
  })
);
