"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
      });
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/forgot-password", { email, password });
    } catch (error: any) {
      toast({ title: "Error", description: error?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-screen-sm mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold">Forgot password</h1>
      <Card className="mt-4 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label>Email</Label>
            <Input
              className="mt-2"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              className="mt-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label>Password Repeat</Label>
            <Input
              className="mt-2"
              type="password"
              placeholder="Password Repeat"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>
          <Button disabled={loading} className="mt-4 w-full">
            {loading && <Loader className="mr-2 animate-spin" size={16} />}
            Reset password
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span>
            <Link href="/login"> Back to login</Link>
          </span>
        </div>
      </Card>
    </main>
  );
}
