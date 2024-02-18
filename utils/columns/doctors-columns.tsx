"use client";

import DeleteDoctor from "@/components/delete-doctor";
import UpdateDoctor from "@/components/update-doctor";
import useUserStore from "@/hooks/use-user-store";
import { DoctorWithUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<DoctorWithUser>[] = [
  {
    accessorKey: "displayName",
    header: "Display Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "speciality",
    header: "Speciality",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => moment(row.original.createdAt).format("DD/MM/YYYY"),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const { isAdmin } = useUserStore((state) => state);

      if (!isAdmin) {
        return <span>No actions</span>;
      }

      return (
        <div className="flex flex-row gap-4">
          <UpdateDoctor {...row.original} />
          <DeleteDoctor id={row.original.user.id} />
        </div>
      );
    },
  },
];
