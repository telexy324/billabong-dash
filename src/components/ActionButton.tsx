// components/base/ActionButton.tsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { m } from "framer-motion";
import axios from "axios";
import clsx from "clsx";

export interface ActionButtonProps {
  showCount?: boolean;
  count?: number;
  active: boolean;
  apiUrl: string;
  icon: {
    active: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    inactive: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  activeColor: string;
}

export const ActionButton = ({
                               showCount = false,
                               count = 0,
                               active,
                               apiUrl,
                               icon,
                               activeColor,
                             }: ActionButtonProps) => {
  const [isActive, setIsActive] = useState(active);
  const [displayCount, setDisplayCount] = useState(count);

  const mutation = useMutation({
    mutationFn: async (newState: boolean) => {
      await axios.post(apiUrl, { active: newState });
    },
    onMutate: async (newState: boolean) => {
      setIsActive(newState);
      if (showCount) {
        setDisplayCount((prev) => prev + (newState ? 1 : -1));
      }
    },
    onError: () => {
      setIsActive(!isActive);
      if (showCount) {
        setDisplayCount((prev) => prev + (isActive ? -1 : 1));
      }
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
      {showCount && <span>{displayCount}</span>}
    </m.button>
  );
};
