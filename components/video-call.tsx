"use client";

import { Button } from "@/components/ui/button";
import useUserStore from "@/hooks/use-user-store";
import { useRouter } from "next/navigation";

type VideoCallProps = {
  appointmentId: string;
  appointmentDate: Date;
};

export default function VideoCall({
  appointmentId,
  appointmentDate,
}: VideoCallProps) {
  const { user } = useUserStore();
  const router = useRouter();

  function isVideoCallEnabledHandler() {
    const _appointmentDate = new Date(appointmentDate);
    _appointmentDate.setHours(_appointmentDate.getMinutes() + 30);
    const now = new Date();
    return now < _appointmentDate;
  }

  async function handleJoin() {
    router.push(`/dashboard/meet?room_id=${appointmentId}`);
  }

  const isVideoCallEnabled = isVideoCallEnabledHandler();

  return (
    <div>
      <Button onClick={handleJoin} disabled={isVideoCallEnabled}>
        {user?.accountType === "doctor" ? "Start" : "Join"} Video Call
      </Button>
    </div>
  );
}
