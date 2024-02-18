import { JWTPayload } from "jose";
import { createSelectSchema } from "drizzle-zod";
import { users, doctorAppointments, doctors } from "./database/schema";
import * as z from "zod";

export type Session = JWTPayload & {
  id: string;
  displayName: string;
  email: string;
  accountType: string;
};

const selectUserSchema = createSelectSchema(users);
const selectDoctorAppointmentsSchema = createSelectSchema(doctorAppointments);
const selectDoctorsSchema = createSelectSchema(doctors);

export type User = z.infer<typeof selectUserSchema>;
export type Doctors = z.infer<typeof selectDoctorsSchema>;
export type DoctorAppointment = z.infer<typeof selectDoctorAppointmentsSchema>;

export type DoctorWithUser = Doctors & {
  user: User;
};

export type DoctorAppointmentWithDoctorWithUser = DoctorAppointment & {
  doctor: DoctorWithUser & { user: User };
  patient: User;
};
