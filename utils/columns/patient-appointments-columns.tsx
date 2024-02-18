"use client";

import DeleteAppointment from "@/components/delete-appointment";
import { Button } from "@/components/ui/button";
import { DoctorAppointmentWithDoctorWithUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Link from "next/link";

export const columns: ColumnDef<DoctorAppointmentWithDoctorWithUser>[] = [
  {
    accessorKey: "patientName",
    header: "Patient Name",
    cell: ({ row }) => row.original.patient.displayName,
  },
  {
    accessorKey: "sheduledAt",
    header: "Sheduled At",
    cell: ({ row }) =>
      moment(row.original.appointmentDate).format("DD/MM/YYYY"),
  },
  {
    accessorKey: "sheduledTime",
    header: "Sheduled At",
    cell: ({ row }) => moment(row.original.appointmentDate).format("hh:mm A"),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-4">
          <DeleteAppointment id={row.original.id} />
          <Button variant="default" size="sm">
            <Link href={`/dashboard/appointments/${row.original.id}`}>
              View
            </Link>
          </Button>
        </div>
      );
    },
  },
];
