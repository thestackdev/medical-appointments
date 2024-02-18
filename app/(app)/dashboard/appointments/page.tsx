import db from "@/database";
import { doctorAppointments, doctors } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { DataTable } from "@/components/ui/data-table";
import { columns as doctorAppointmentsColumns } from "@/utils/columns/doctor-appointments-columns";
import { columns as patientAppointmentsColumns } from "@/utils/columns/patient-appointments-columns";
import { checkSignedIn } from "@/helpers/session";
import BookAppointment from "@/components/book-appointment";

export default async function Page() {
  const session = await checkSignedIn();

  if (!session)
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background">
        <h1>You are not signed in</h1>
      </div>
    );

  if (session.accountType === "admin") {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background">
        <h1>Admin cannot book appointments</h1>
      </div>
    );
  }

  if (session.accountType === "doctor") {
    const doctorsResponse = await db.query.doctors.findFirst({
      where: eq(doctors.userId, session.id),
      with: {
        user: true,
      },
    });

    const data = await db.query.doctorAppointments.findMany({
      where: eq(doctorAppointments.doctorId, doctorsResponse?.id),
      orderBy: desc(doctorAppointments.createdAt),
      with: {
        doctor: {
          with: {
            user: true,
          },
        },
        patient: true,
      },
    });

    console.log("data", data);

    return (
      <div>
        <main className="max-w-screen-xl mx-auto p-4 mt-8">
          <div>
            <div className="flex w-full items-center justify-between">
              <h1 className="text-2xl font-bold mt-8 mb-4">Appointments</h1>
            </div>
            <DataTable columns={patientAppointmentsColumns} data={data} />
          </div>
        </main>
      </div>
    );
  }

  const doctorsResponse = await db.query.doctors.findMany({
    orderBy: desc(doctors.createdAt),
    with: {
      user: true,
    },
  });

  const data = await db.query.doctorAppointments.findMany({
    where: eq(doctorAppointments.patientId, session.id),
    orderBy: desc(doctorAppointments.createdAt),
    with: {
      doctor: {
        with: {
          user: true,
        },
      },
    },
  });

  return (
    <div>
      <main className="max-w-screen-xl mx-auto p-4 mt-8">
        <div>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-bold mt-8 mb-4">Appointments</h1>
            {session.accountType === "patient" && (
              <BookAppointment doctors={doctorsResponse} />
            )}
          </div>
          <DataTable columns={doctorAppointmentsColumns} data={data} />
        </div>
      </main>
    </div>
  );
}
