"use client";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function TagList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    tags &&
    tags.map((tag) => (
      <button
        onClick={() => router.push(`/?search=${tag}`)}
        key={tag}
        className={cn(badgeVariants()) + "cursor-pointer"}
        tabIndex={0}
        role="button"
      >
        {tag}
      </button>
    ))
  );
}
