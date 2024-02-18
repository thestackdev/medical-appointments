"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

interface PrescriptionProps {
  id: string;
  prescription: string | null;
}

export default function Prescription({ id, prescription }: PrescriptionProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id,
    prescription: "",
  });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch("/api/appointments", form);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger>
        <Button>
          {prescription ? "Update " : "Add "}
          Prescription
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogTitle>
              {prescription ? "Update" : "Add"} prescription
            </DialogTitle>
            <DialogDescription>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="coupon-code" className="mt-4">
                  Prescription
                </Label>
                <Textarea
                  required
                  placeholder="Enter prescription"
                  value={form.prescription}
                  onChange={(e) =>
                    setForm({ ...form, prescription: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </DialogDescription>
            <DialogFooter>
              <div className="flex gap-4">
                <Button
                  variant="destructive"
                  className="mt-4"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  loading={loading}
                  type="submit"
                  className="mt-4"
                >
                  {prescription ? "Update" : "Add"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
