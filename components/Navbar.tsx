"use client";

import { ThemeToggle } from "@/app/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Session } from "@/types";
import {
  AlignLeft,
  GiftIcon,
  Home,
  MenuSquare,
  PersonStanding,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Logout from "./Logout";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useEffect } from "react";
import useUserStore from "@/hooks/use-user-store";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    name: "Doctors",
    icon: PersonStanding,
    href: "/dashboard/doctors",
  },
  {
    name: "Patients",
    icon: MenuSquare,
    href: "/dashboard/patient",
  },
];

interface MainNavProps {
  className?: string;
  session: Session;
}

export default function MainNav({ className, session }: MainNavProps) {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (!session) return;
    setUser(session);
  }, [session]);

  return (
    <>
      <nav
        className={cn(
          "flex items-center justify-between p-2 space-x-4 mx-auto lg:space-x-6",
          className
        )}
      >
        <Sheet>
          <SheetTrigger asChild>
            <AlignLeft className="cursor-pointer" size={30} />
          </SheetTrigger>
          <SheetContent
            position="left"
            className="w-full max-w-sm flex flex-col flex-1 justify-between"
          >
            <SheetDescription className="mt-4">
              <ul className="flex flex-col w-full gap-2 text-sm">
                {sidebarItems.map(({ name, icon: Icon, href }, index) => (
                  <li key={index} className="my-3">
                    <SheetClose asChild>
                      <Link
                        className="flex flex-row items-center gap-4"
                        href={href}
                      >
                        <Icon size={19} />{" "}
                        <span className="font-medium text-sm">{name}</span>
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetDescription>
            <div className="flex flex-col w-full items-start">
              <Label className="text-lg mb-4">{session?.email}</Label>
              <Logout />
            </div>
          </SheetContent>
        </Sheet>
        <Input className="max-w-lg" placeholder="Search" />
        <ThemeToggle />
      </nav>
      <Separator />
    </>
  );
}
