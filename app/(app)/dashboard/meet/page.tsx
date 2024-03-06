"use client";

import useUserStore from "@/hooks/use-user-store";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const { user } = useUserStore((state) => state);
  const roomId = searchParams.get("room_id");

  const [token, setToken] = useState("");

  async function getToken() {
    try {
      const resp = await fetch(
        `/api/get-participant-token?room=${roomId}&username=${user?.displayName}`
      );
      const data = await resp.json();
      setToken(data.token);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!user || !roomId) return;
    getToken();
  }, [user, roomId]);

  if (!roomId) {
    return <h1>Missing room ID, please go back and try again</h1>;
  }

  if (token === "") {
    return <div>Please wait while we connect you to the doctor...</div>;
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: "100dvh" }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
