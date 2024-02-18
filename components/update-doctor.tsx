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
import { doctorsSpeciality } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DoctorWithUser } from "@/types";

export default function UpdateDoctor(doctor: DoctorWithUser) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: doctor.id,
    displayName: doctor.user.displayName as string,
    email: doctor.user.email as string,
    speciality: doctor.speciality as string,
  });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch("/api/doctors", {
        id: doctor.user.id,
        speciality: form.speciality,
      });
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
        <Button>Update</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Update doctor</DialogTitle>
            <DialogDescription>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="coupon-code" className="mt-4">
                  Display Name
                </Label>
                <Input
                  type="text"
                  required
                  disabled
                  id="display-name"
                  placeholder="John Doe"
                  value={form.displayName}
                  onChange={(e) =>
                    setForm({ ...form, displayName: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </DialogDescription>
            <DialogDescription>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="coupon-expiry" className="mt-4">
                  Email
                </Label>
                <Input
                  type="email"
                  required
                  disabled
                  id="email"
                  placeholder="user@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1"
                />
              </div>
            </DialogDescription>
            <DialogDescription>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="coupon-expiry" className="mt-4">
                  Speciality
                </Label>
                <Select
                  onValueChange={(value) =>
                    setForm({ ...form, speciality: value })
                  }
                  defaultValue={form.speciality}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select speciality" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctorsSpeciality.map((speciality, idx) => (
                      <SelectItem key={idx} value={speciality}>
                        {speciality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  Update
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
