import Navbar from "@/components/Navbar";
import { checkSignedIn } from "@/helpers/session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkSignedIn();
  if (!session) redirect("/");

  return (
    <main>
      <Navbar className="mx-6" session={session} />
      {children}
    </main>
  );
}
