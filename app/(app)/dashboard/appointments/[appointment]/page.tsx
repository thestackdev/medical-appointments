import DeleteAppointment from "@/components/delete-appointment";
import Prescription from "@/components/prescription";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VideoCall from "@/components/video-call";
import db from "@/database";
import { doctorAppointments } from "@/database/schema";
import { checkSignedIn } from "@/helpers/session";
import { DoctorAppointmentWithDoctorWithUser } from "@/types";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import PDF from "../../pdf/page";
import moment from "moment";

export default async function Page({
  params,
  searchParams: { openPrescription },
}: {
  params: { appointment: string };
  searchParams: { openPrescription: boolean };
}) {
  const session = await checkSignedIn();
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

  if (!response || !session) {
    redirect("/dashboard/appointments");
  }

  function isVideoCallEnabledHandler() {
    const appointmentDate = new Date(response.appointmentDate);
    appointmentDate.setHours(appointmentDate.getMinutes() + 30);
    const now = new Date();
    return now < appointmentDate;
  }

  function formatDate(date: Date) {
    return date.toTimeString();
  }

  const isVideoCallEnabled = isVideoCallEnabledHandler();

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
                  <p>{moment(response.appointmentDate).format("hh:mm A")}</p>
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
            <VideoCall
              appointmentId={response.id}
              isEnabled={isVideoCallEnabled}
            />
            {session.accountType === "doctor" ? (
              <Prescription
                prescription={response.prescription}
                id={response.id}
                defaultOpen={openPrescription}
              />
            ) : (
              <PDF id={response.id} />
            )}
            <DeleteAppointment id={response.id} name="Delete Appointment" />
          </div>
        </div>
      </main>
    </div>
  );
}
