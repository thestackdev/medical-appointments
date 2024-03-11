import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { doctorsSpeciality } from "@/lib/constants";

export const accountType = pgEnum("accountType", [
  "admin",
  "doctor",
  "patient",
]);

export const speciality = pgEnum("speciality", doctorsSpeciality);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  displayName: text("display_name").notNull(),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
  accountType: accountType("account_type")
    .notNull()
    .default("patient" as const),
  age: integer("age").default(0),
  gender: varchar("gender").default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const doctors = pgTable("doctors", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  isAvailable: boolean("is_available").notNull().default(true),
  speciality: speciality("speciality")
    .notNull()
    .default("dentist" as const),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const doctorAppointments = pgTable("doctor_appointments", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  doctorId: uuid("doctor_id")
    .notNull()
    .references(() => doctors.id, {
      onDelete: "cascade",
    }),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  prescription: text("prescription"),
  appointmentDate: timestamp("appointment_date", {
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const doctorUserRelation = relations(doctors, ({ one }) => ({
  user: one(users, {
    fields: [doctors.userId],
    references: [users.id],
  }),
}));

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
    doctor: one(doctors, {
      fields: [doctorAppointments.doctorId],
      references: [doctors.id],
    }),
  })
);
