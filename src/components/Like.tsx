// components/LikeButton.tsx
import { HandThumbUpIcon as SolidLike } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineLike } from "@heroicons/react/24/outline";
import { ActionButton } from "./ActionButton";

interface Props {
  active: boolean;
  count: number;
  apiUrl: string;
}

export const LikeButton = ({ active, count, apiUrl }: Props) => (
  <ActionButton
    active={active}
    count={count}
    showCount
    apiUrl={apiUrl}
    icon={{ active: SolidLike, inactive: OutlineLike }}
    activeColor="text-yellow-400"
  />
);
