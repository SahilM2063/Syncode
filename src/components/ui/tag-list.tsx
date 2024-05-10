import { Badge } from "@/components/ui/badge";

export function splitTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim());
}

export default function TagList({ tags }: { tags: string[] }) {
  return (
    tags &&
    tags.map((tag) => (
      <Badge key={tag} variant={"default"} className="cursor-pointer">
        {tag}
      </Badge>
    ))
  );
}
