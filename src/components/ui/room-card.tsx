"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon, PenSquareIcon, Trash } from "lucide-react";
import TagList from "@/components/ui/tag-list";
import { splitTags } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { deleteRoomAction } from "@/app/your-rooms/action";

export function RoomCard({ room }: { room: Room }) {
  const session = useSession();
  return (
    <Card className="relative">
      {room.userId === session.data?.user.id && (
        <Button className="absolute top-2 right-2">
          <Link href={`/edit-room/${room.id}`}>
            <PenSquareIcon className="size-4 m-0" />
          </Link>
        </Button>
      )}
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex flex-row gap-2 items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardContent className="flex w-full gap-2 flex-wrap">
        <TagList tags={splitTags(room.tags || "")} />
      </CardContent>
      <CardFooter className="flex gap-2 w-full justify-between">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
        {room.userId === session.data?.user.id && (
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="ml-auto" variant="destructive">
                {" "}
                <Trash className="mr-2 size-4" /> delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your room and any data associated with it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteRoomAction(room.id)}>
                  Yes, delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}
