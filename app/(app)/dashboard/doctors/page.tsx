import db from "@/database";
import { doctors, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { DataTable } from "@/components/ui/data-table";
import { columns as doctorColumns } from "@/utils/columns/doctors-columns";
import CreateDoctor from "@/components/create-doctor";
import { checkSignedIn } from "@/helpers/session";

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
      <main className="max-w-screen-xl mx-auto p-4 mt-8">
        <div>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-bold mt-8 mb-4">Doctors</h1>
            {session?.accountType === "admin" && <CreateDoctor />}
          </div>
          <DataTable columns={doctorColumns} data={doctorsResponse} />
        </div>
      </main>
    </div>
  );
}
