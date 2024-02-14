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

export default function BookAppointment() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    accountType: "doctor",
  });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/doctors", form);
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
        <span>Work in progress</span>
      </DialogContent>
    </Dialog>
  );
}
