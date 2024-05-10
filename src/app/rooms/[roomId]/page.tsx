import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import TagList from "@/components/ui/tag-list";
import { SyncodeVideo } from "./video-player";
import { splitTags } from "@/lib/utils";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="container p-0 grid grid-cols-4 min-h-screen">
      <div className="col-span-3 py-4 pr-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <SyncodeVideo room={room} />
        </div>
      </div>
      <div className="col-span-1 py-4 pl-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-6">
          <h1 className="text-xl font-bold">{room?.name}</h1>
          <p className="text-sm text-gray-400">{room?.description}</p>
          <div className="w-full flex items-center flex-wrap gap-2">
            <TagList tags={splitTags(room?.tags || "")} />
          </div>
          <Link
            href={room?.githubRepo || ""}
            className="flex flex-row gap-2 items-center italic underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="size-4" />
            Github Project
          </Link>
        </div>
      </div>
    </div>
  );
}
