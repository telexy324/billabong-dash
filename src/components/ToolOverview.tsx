import { Card, CardContent } from "@/components/ui/card"
import { useStatus } from "@/hooks/use-status"
import { cn } from "@/lib/utils"

type ToolOverviewProps = {
  online: number
  offline: number
  total: number
}

export default function ToolOverview({ online, offline, total }: ToolOverviewProps) {
  const { status, setStatus } = useStatus()

  const customBackgroundImage = (window.CustomBackgroundImage as string) !== "" ? window.CustomBackgroundImage : undefined

  return (
    <>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 server-overview">
        <Card
          onClick={() => {
            setStatus("all")
          }}
          className={cn("hover:border-blue-500 cursor-pointer transition-all", {
            "bg-card/70": customBackgroundImage,
          })}
        >
          <CardContent className="flex h-full items-center px-6 py-3">
            <section className="flex flex-col gap-1">
              <p className="text-sm font-medium md:text-base">工具总数</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                </span>
                <div className="text-lg font-semibold">{total}</div>
              </div>
            </section>
          </CardContent>
        </Card>
        <Card
          onClick={() => {
            setStatus("online")
          }}
          className={cn(
            "cursor-pointer hover:ring-green-500 ring-1 ring-transparent transition-all",
            {
              "bg-card/70": customBackgroundImage,
            },
            {
              "ring-green-500 ring-2 border-transparent": status === "online",
            },
          )}
        >
          <CardContent className="flex h-full items-center px-6 py-3">
            <section className="flex flex-col gap-1">
              <p className="text-sm font-medium md:text-base">在使用工具</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>

                <div className="text-lg font-semibold">{online}</div>
              </div>
            </section>
          </CardContent>
        </Card>
        <Card
          onClick={() => {
            setStatus("offline")
          }}
          className={cn(
            "cursor-pointer hover:ring-red-500 ring-1 ring-transparent transition-all",
            {
              "bg-card/70": customBackgroundImage,
            },
            {
              "ring-red-500 ring-2 border-transparent": status === "offline",
            },
          )}
        >
          <CardContent className="flex h-full items-center px-6 py-3">
            <section className="flex flex-col gap-1">
              <p className="text-sm font-medium md:text-base">下线工具</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
                <div className="text-lg font-semibold">{offline}</div>
              </div>
            </section>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
