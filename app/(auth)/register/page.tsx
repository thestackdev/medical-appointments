"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Page() {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    age: 0,
    gender: "male",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/register", form);
      router.refresh();
    } catch (error: any) {
      toast({ title: "Registration Failed", description: error?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-screen-sm mx-auto p-4 mt-8 rounded-3xl">
      <h1 className="text-2xl font-bold text-center text-black">REGISTER</h1>
      <Card className="mt-4 p-4 border-0">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-black">
            <Label>Display Name</Label>
            <Input
              className="mt-2"
              type="text"
              placeholder="John Doe"
              value={form.displayName}
              onChange={(e) =>
                setForm({ ...form, displayName: e.target.value })
              }
            />
          </div>
          <div className="mb-4 text-black">
            <Label>Email</Label>
            <Input
              className="mt-2"
              type="email"
              placeholder="user@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-4 text-black">
            <Label>Age</Label>
            <Input
              className="mt-2"
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={(e) =>
                setForm({ ...form, age: Number(e.target.value) })
              }
            />
          </div>
          <div className="mb-4 text-black">
            <Label>Gender</Label>
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
          <div className="mb-4 text-black">
            <Label>Password</Label>
            <Input
              className="mt-2"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <Button disabled={loading} className="mt-4 w-full bg-blue-400 hover-blue-300">
            {loading && <Loader className="mr-2 animate-spin" size={16} />}
            Register
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span>
            Already have an account?
            <Link href="/login">Login</Link>
          </span>
        </div>
      </Card>
    </main>
  );
}
