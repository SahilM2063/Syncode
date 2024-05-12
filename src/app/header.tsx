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
import { LogIn, LogOut, Trash } from "lucide-react";
import Link from "next/link";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useState } from "react";
import { deleteAccountAction } from "./action";

export function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({
                  callbackUrl: "/",
                });
              }}
            >
              Yes, delete account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"}>
            <Avatar className="mr-2">
              <AvatarImage
                src={session.data?.user?.image || ""}
                alt="@shadcn"
              />
              <AvatarFallback>
                {!session.data?.user?.image &&
                  session.data?.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {session.data?.user.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={"/your-rooms"}>Your Rooms</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="curser-pointer"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOut className="mr-2 size-4" />
            Sign Out
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              onClick={() => setOpen(true)}
              variant={"destructive"}
              className="w-full flex justify-between"
            >
              <Trash className="mr-2 size-4" /> Delete Account
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  return (
    <header className="bg-gray-200 dark:bg-gray-900 py-4 px-8 h-[80px]">
      <div className="flex justify-between items-center w-full h-full">
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
              <LogIn className="mr-2 size-4" />
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
