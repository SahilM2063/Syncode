import { db } from "@/db";

export default async function Home() {
  const rooms = await db.query.room.findMany();

  return (
    <main>
      {rooms.map((room) => (
        <div key={room.id}>{room.id}-{room.name}</div>
      ))}
    </main>
  );
}
