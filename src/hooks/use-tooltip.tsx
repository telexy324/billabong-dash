import { TooltipContext } from "@/context/tooltip-context"
import { useContext } from "react"

export const useTooltip = () => {
  const context = useContext(TooltipContext)
  if (context === undefined) {
    throw new Error("useTooltip must be used within a TooltipProvider")
  }
  return context
}

export default useTooltip
