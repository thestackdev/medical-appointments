import CreateDoctor from "@/components/create-doctor";
import { DataTable } from "@/components/ui/data-table";
import db from "@/database";
import { doctors } from "@/database/schema";
import { checkSignedIn } from "@/helpers/session";
import {
  columnsForUsers,
  columns as doctorColumns,
} from "@/utils/columns/doctors-columns";
import { desc } from "drizzle-orm";

export default async function Page() {
  const session = await checkSignedIn();

  const response = await db.query.doctors.findMany({
    with: {
      user: true,
    },
    orderBy: desc(doctors.createdAt),
  });

  const doctorsResponse = response.map((doctor) => {
    return {
      ...doctor,
      displayName: doctor.user.displayName,
      email: doctor.user.email,
    };
  });

  return (
    <div>
      <main className="mx-auto mt-8 max-w-screen-xl p-4">
        <div>
          <div className="flex w-full items-center justify-between">
            <h1 className="mb-4 mt-8 text-2xl font-bold">Doctors</h1>
            {session?.accountType === "admin" && <CreateDoctor />}
          </div>
          {session?.accountType === "admin" ? (
            <DataTable columns={doctorColumns} data={doctorsResponse} />
          ) : (
            <DataTable columns={columnsForUsers} data={doctorsResponse} />
          )}
        </div>
      </main>
    </div>
  );
}
