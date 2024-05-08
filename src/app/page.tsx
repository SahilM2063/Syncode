import { db } from "@/db";

export default async function Home() {
  const items = await db.query.testing.findMany();

  return (
    <main>
      {items.map((item) => (
        <div key={item.id}>{item.id}. {item.name}</div>
      ))}
    </main>
  );
}
