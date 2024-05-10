"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image || ""} alt="@shadcn" />
            <AvatarFallback>
              {!session.data?.user?.image &&
                session.data?.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {session.data?.user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOut className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();
  return (
    <header className="bg-gray-200 dark:bg-gray-900 py-4 container mx-auto ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer">
          <Link href={"/"}>
            {/* <Image src={"/logo.png"} alt="logo" width={100} height={100} /> */}
            <h1 className="text-3xl font-bold">Syncode</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {session.data && <AccountDropdown />}
          {!session.data && (
            <Button variant="default" onClick={() => signIn("google")}>
              <LogIn className="mr-2" />
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
