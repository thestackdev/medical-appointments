import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import db from "@/database";
import { doctors, users } from "@/database/schema";
import { checkSignedIn } from "@/helpers/session";
import {
  columnsForUsers,
  columns as doctorColumns,
} from "@/utils/columns/doctors-columns";
import { eq, sql } from "drizzle-orm";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await checkSignedIn();

  if (!session) {
    return redirect("/login");
  }

  const [{ count: totalDoctors }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(doctors);

  const [{ count: totalPatients }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.accountType, "patient"));

  const doctorsResponse = await db.query.doctors.findMany({
    with: {
      user: true,
    },
    limit: 10,
  });

  const doctorsResponseWithUser = doctorsResponse.map((doctor) => {
    return {
      ...doctor,
      displayName: doctor.user.displayName,
      email: doctor.user.email,
    };
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
          {session.accountType !== "admin" && (
            <Link href="/dashboard/appointments">
              <Button className="mt-4">
                My Appointments
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          )}
        </div>
        {session.accountType === "admin" ? (
          <DataTable columns={doctorColumns} data={doctorsResponseWithUser} />
        ) : (
          <DataTable columns={columnsForUsers} data={doctorsResponseWithUser} />
        )}
      </div>
    </main>
  );
}
