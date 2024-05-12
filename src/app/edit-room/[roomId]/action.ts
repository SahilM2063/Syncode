"use server";

import { editRoom, getRoom } from "@/data-access/rooms";
import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession();

  if (!session) {
    throw new Error("You must be logged in to create a room");
  }

  const room = await getRoom(roomData.id);

  if (room?.userId !== session?.user.id)
    throw new Error("You are not authorized to delete this room!");

  await editRoom({ ...roomData, userId: room.userId });

  revalidatePath("/your-rooms");
  redirect(`edit-room/${roomData.id}`);
  redirect("/your-rooms");
}
