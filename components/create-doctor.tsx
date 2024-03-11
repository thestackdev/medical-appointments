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
import { doctorsSpeciality } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export default function CreateDoctor() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const doctorSpecialities = doctorsSpeciality;
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    age: 0,
    gender: "male",
    password: "",
    speciality: doctorsSpeciality[0] as string,
  });
  const router = useRouter();

  function resetForm() {
    setForm({
      displayName: "",
      email: "",
      age: 0,
      gender: "male",
      password: "",
      speciality: doctorsSpeciality[0] as string,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/doctors", form);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
      resetForm();
      router.refresh();
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        resetForm();
      }}
    >
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
                  Age
                </Label>
                <Input
                  type="number"
                  required
                  id="age"
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) =>
                    setForm({ ...form, age: Number(e.target.value) })
                  }
                  className="mt-1"
                />
              </div>
            </DialogDescription>
            <DialogDescription>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="coupon-expiry" className="mt-4">
                  Password
                </Label>
                <RadioGroup
                  defaultValue={form.gender}
                  className="mt-4 flex flex-row gap-4"
                  onValueChange={(value) =>
                    setForm({ ...form, gender: value as string })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
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
                    {doctorSpecialities.map((speciality) => (
                      <SelectItem key={speciality} value={speciality}>
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
