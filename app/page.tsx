import { Button } from "@/components/ui/button";
import { checkSignedIn } from "@/helpers/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await checkSignedIn();

  if (!session) redirect("/login");
  else redirect("/dashboard");

  return (
    <div>
      <Link href="/login">
        <Button className="mt-4 w-min">Login</Button>
      </Link>
    </div>
  );
}
