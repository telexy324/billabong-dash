// components/FavoriteButton.tsx
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { ActionButton } from "./ActionButton";

interface Props {
  active: boolean;
  apiUrl: string;
}

export const FavoriteButton = ({ active, apiUrl }: Props) => (
  <ActionButton
    active={active}
    apiUrl={apiUrl}
    icon={{ active: SolidHeart, inactive: OutlineHeart }}
    activeColor="text-red-500"
  />
);
