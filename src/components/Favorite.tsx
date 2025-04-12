import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { m } from "framer-motion"
import clsx from "clsx"
import { ModelUserFavoriteForm } from "@/types/nezha-api.ts"
import { favorite } from "@/lib/nezha-api.ts"

export interface ActionButtonProps {
  active: boolean;
  req: ModelUserFavoriteForm;
  icon: {
    active: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    inactive: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  activeColor: string;
}

export const FavoriteButton = ({
                             active,
                             icon,
                             req,
                             activeColor,
                           }: ActionButtonProps) => {
  const [isActive, setIsActive] = useState(active);

  const mutation = useMutation({
    mutationFn: async (newState: boolean) => {
      const url = newState ? `/api/v1/favorite` : `/api/v1/unFavorite`;
      return favorite(req,url);
    },
    onMutate: async (newState: boolean) => {
      setIsActive(newState);
    },
    onError: () => {
      setIsActive(!isActive);
    },
  });

  const Icon = isActive ? icon.active : icon.inactive;

  return (
    <m.button
      whileTap={{ scale: 1.2 }}
      onClick={() => mutation.mutate(!isActive)}
      disabled={mutation.isPending}
      className="flex items-center gap-1 transition-colors duration-300"
    >
      <Icon className={clsx("w-6 h-6", isActive ? activeColor : "text-gray-500")} />
    </m.button>
  );
};
