import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import db from "@/database";
import { users } from "@/database/schema";
import { desc, eq, sql } from "drizzle-orm";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import { columns as userColumns } from "@/utils/columns/user-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const [{ count: totalDoctors }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.accountType, "doctor"));

  const [{ count: totalPatients }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.accountType, "patient"));

  const doctors = await db.query.users.findMany({
    where: eq(users.accountType, "doctor"),
    limit: 10,
  });

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
              <div className="bg-green-500 rounded-full p-3">
                <GraduationCap size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Total Doctors</CardTitle>
                <CardDescription>{totalDoctors}</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
              <div className="bg-orange-500 rounded-full p-3">
                <Users size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Total Patients</CardTitle>
                <CardDescription>{totalPatients}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold mt-8 mb-4">Our Doctors</h1>
          <Link href="/dashboard/appointments">
            <Button className="mt-4">
              My Appointments
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
        <DataTable columns={userColumns} data={doctors} />
      </div>
    </main>
  );
}
