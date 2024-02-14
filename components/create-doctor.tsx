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
import { DialogClose } from "@radix-ui/react-dialog";

export default function CreateDoctor() {
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
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Create doctor</DialogTitle>
            <DialogDescription>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="coupon-code" className="mt-4">
                  Display Name
                </Label>
                <Input
                  type="text"
                  required
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
                  Password
                </Label>
                <Input
                  type="password"
                  required
                  id="password"
                  placeholder="*********"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
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
                  Add
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
