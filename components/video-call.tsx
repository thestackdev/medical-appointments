"use client";

import { Button } from "@/components/ui/button";
import useUserStore from "@/hooks/use-user-store";

export default function VideoCall() {
  const { user } = useUserStore();

  async function handleJoin() {}

  return (
    <div>
      <Button onClick={handleJoin}>
        {user?.role === "doctor" ? "Start" : "Join"} Video Call
      </Button>
    </div>
  );
}
