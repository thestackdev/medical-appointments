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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DoctorWithUser } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookAppointmentProps {
  doctors: DoctorWithUser[];
}

export default function BookAppointment({ doctors }: BookAppointmentProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    doctorId: "",
  });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/appointments", form);
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
        <Button>Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="coupon-expiry" className="mt-4">
              Doctor
            </Label>
            <Select
              onValueChange={(value) => setForm({ ...form, doctorId: value })}
              defaultValue={form.doctorId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.user.displayName} - {doctor.speciality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
