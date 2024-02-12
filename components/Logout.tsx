"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function logout() {
    try {
      setLoading(true);
      await axios.post("/api/logout");
      router.refresh();
    } catch (error) {
      toast({ title: "Logout Failed", description: "Unable to logout" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button className="w-full" onClick={logout}>
      Logout
    </Button>
  );
}
