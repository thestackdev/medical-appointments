"use client";

import useUserStore from "@/hooks/use-user-store";

export default function Page() {
  const { user } = useUserStore();

  if (!user) {
    return <div>Redirecting...</div>;
  }

  if (user.accountType === "admin") {
    return (
      <div>
        <span>You are logged in as an admin.</span>
      </div>
    );
  }

  if (user.accountType === "doctor") {
    return (
      <div>
        <span>You are logged in as a doctor.</span>
      </div>
    );
  }

  return (
    <div>
      <span>You are logged in as a patient.</span>
    </div>
  );
}
