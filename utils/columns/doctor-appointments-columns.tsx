"use client";

import DeleteDoctor from "@/components/delete-doctor";
import { Button } from "@/components/ui/button";
import useUserStore from "@/hooks/use-user-store";
import { DoctorAppointment, User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<DoctorAppointment>[] = [
  {
    accessorKey: "patientName",
    header: "Patient Name",
  },
  {
    accessorKey: "doctorName",
    header: "doctor Name",
  },
  {
    accessorKey: "sheduledAt",
    header: "Sheduled At",
    cell: ({ row }) =>
      moment(row.original.appointmentDate).format("DD/MM/YYYY"),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-4">
          <Button variant="default" size="sm">
            View
          </Button>
        </div>
      );
    },
  },
];
