import Prescription from "@/components/prescription";
import DeleteAppointment from "@/components/delete-appointment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { doctorAppointments } from "@/database/schema";
import { DoctorAppointmentWithDoctorWithUser } from "@/types";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import db from "@/database";
import VideoCall from "@/components/video-call";

export default async function Page({
  params,
}: {
  params: { appointment: string };
}) {
  const response = (await db.query.doctorAppointments.findFirst({
    where: eq(doctorAppointments.id, params.appointment),
    with: {
      doctor: {
        with: {
          user: true,
        },
      },
      patient: true,
    },
  })) as DoctorAppointmentWithDoctorWithUser;

  if (!response) {
    redirect("/dashboard/appointments");
  }

  return (
    <div>
      <main className="max-w-screen-xl mx-auto p-4 mt-8">
        <div>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-bold mt-8 mb-4">
              Appointment Details
            </h1>
          </div>
          <Card className="p-4">
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-lg font-bold">Doctor</h2>
                  <p>{response.doctor.user.displayName}</p>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Patient</h2>
                  <p>{response.patient.displayName}</p>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Date</h2>
                  <p>
                    {new Date(response.appointmentDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Time</h2>
                  <p>
                    {new Date(response.appointmentDate).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold">Prescription</h2>
                <p>
                  {response.prescription ?? "No prescription available yet"}
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-4 mt-4">
            <VideoCall />
            <Prescription
              prescription={response.prescription}
              id={response.id}
            />
            <DeleteAppointment id={response.id} name="Delete Appointment" />
          </div>
        </div>
      </main>
    </div>
  );
}
