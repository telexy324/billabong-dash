// components/LikeButton.tsx
// import { HandThumbUpIcon as SolidLike } from "@heroicons/react/24/solid";
// import { HandThumbUpIcon as OutlineLike } from "@heroicons/react/24/outline";
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { m } from "framer-motion"
import clsx from "clsx"
import { ModelUserLikeForm } from "@/types/nezha-api.ts"
import { like } from "@/lib/nezha-api.ts"

// interface Props {
//   active: boolean;
//   count: number;
//   apiUrl: string;
// }
//
// export const LikeButton = ({ active, count, apiUrl }: Props) => (
//   <ActionButton
//     active={active}
//     count={count}
//     showCount
//     apiUrl={apiUrl}
//     icon={{ active: SolidLike, inactive: OutlineLike }}
//     activeColor="text-yellow-400"
//   />
// );

export interface ActionButtonProps {
  count?: number;
  active: boolean;
  req: ModelUserLikeForm;
  icon: {
    active: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    inactive: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  activeColor: string;
}

export const LikeButton = ({
                               count = 0,
                               active,
                               icon,
                               req,
                               activeColor,
                             }: ActionButtonProps) => {
  const [isActive, setIsActive] = useState(active);
  const [displayCount, setDisplayCount] = useState(count);

  const mutation = useMutation({
    mutationFn: async (newState: boolean) => {
      const url = newState ? `/api/v1/like` : `/api/v1/unlike`;
      return like(req,url);
    },
    onMutate: async (newState: boolean) => {
      setIsActive(newState);
      setDisplayCount((prev) => prev + (newState ? 1 : -1));
    },
    onSuccess: (newCount: number) => {
      setDisplayCount(newCount);
    },
    onError: () => {
      setIsActive(!isActive);
      setDisplayCount((prev) => prev + (isActive ? -1 : 1));
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
      {/*{showCount && <span>{displayCount}</span>}*/}
      <span>{displayCount}</span>
    </m.button>
  );
};
