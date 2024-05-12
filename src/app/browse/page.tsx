import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "@/components/ui/room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams?.search);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Find dev rooms</h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>

      <div className="mb-6">
        <SearchBar />
      </div>

      {rooms.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
          <Image src={"/no-data.svg"} width={200} height={200} alt="no-data" />
          <h1 className="text-center text-xl">
            No rooms found, but you can create one
          </h1>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
