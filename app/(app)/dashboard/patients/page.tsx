import db from "@/database";
import { users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { DataTable } from "@/components/ui/data-table";
import { columns as userColumns } from "@/utils/columns/user-columns";
import CreateDoctor from "@/components/create-doctor";

export default async function Page() {
  const usersResponse = await db.query.users.findMany({
    where: eq(users.accountType, "patient"),
    orderBy: desc(users.createdAt),
  });

  return (
    <div>
      <main className="max-w-screen-xl mx-auto p-4 mt-8">
        <div>
          <h1 className="text-2xl font-bold mt-8 mb-4">Patients</h1>
          <DataTable columns={userColumns} data={usersResponse} />
        </div>
      </main>
    </div>
  );
}
