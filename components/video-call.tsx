"use client";

import { Button } from "@/components/ui/button";
import useUserStore from "@/hooks/use-user-store";
import { useRouter } from "next/navigation";

type VideoCallProps = {
  appointmentId: string;
  isEnabled: boolean;
};

export default function VideoCall({
  appointmentId,
  isEnabled,
}: VideoCallProps) {
  const { user } = useUserStore();
  const router = useRouter();

  async function handleJoin() {
    router.push(`/dashboard/meet?room_id=${appointmentId}`);
  }

  return (
    <div>
      <Button onClick={handleJoin} disabled={isEnabled}>
        {user?.accountType === "doctor" ? "Start" : "Join"} Video Call
      </Button>
    </div>
  );
}
