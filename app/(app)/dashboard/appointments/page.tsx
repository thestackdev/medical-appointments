import db from "@/database";
import { users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { DataTable } from "@/components/ui/data-table";
import { columns as doctorAppointments } from "@/utils/columns/doctor-appointments-columns";
import { checkSignedIn } from "@/helpers/session";
import { Button } from "@/components/ui/button";
import BookAppointment from "@/components/book-appointment";

export default async function Page() {
  const session = await checkSignedIn();

  if (!session)
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-100">
        <h1>You are not signed in</h1>
      </div>
    );

  const data = await db.query.doctorAppointments.findMany({
    where: eq(users.id, session.id),
    orderBy: desc(users.createdAt),
    with: {
      patient: true,
      doctor: true,
    },
  });

  return (
    <div>
      <main className="max-w-screen-xl mx-auto p-4 mt-8">
        <div>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-bold mt-8 mb-4">Appointments</h1>
            {session.accountType === "patient" && <BookAppointment />}
          </div>
          <DataTable columns={doctorAppointments} data={data} />
        </div>
      </main>
    </div>
  );
}
