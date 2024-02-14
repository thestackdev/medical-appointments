"use client";

import DeleteDoctor from "@/components/delete-doctor";
import useUserStore from "@/hooks/use-user-store";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "displayName",
    header: "Display Name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
          <DeleteDoctor id={row.original.id} />
        </div>
      );
    },
  },
];
