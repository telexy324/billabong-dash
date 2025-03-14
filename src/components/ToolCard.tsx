// import ServerFlag from "@/components/ServerFlag"
// import ServerUsageBar from "@/components/ServerUsageBar"
// import { formatBytes } from "@/lib/format"
// import { GetFontLogoClass, GetOsName, MageMicrosoftWindows } from "@/lib/logo-class"
import { cn } from "@/lib/utils"
import { Tool } from "@/types/nezha-api"
// import { useTranslation } from "react-i18next"
// import { useNavigate } from "react-router-dom"
import { Card } from "./ui/card"

export default function ToolCard({ toolInfo }: { toolInfo: Tool }) {
  // const { t } = useTranslation()
  // const navigate = useNavigate()
  // const { name, country_code, online, cpu, up, down, mem, stg, net_in_transfer, net_out_transfer, public_note, platform } = formatNezhaInfo(
  //   now,
  //   serverInfo,
  // )

  // const cardClick = () => {
  //   sessionStorage.setItem("fromMainPage", "true")
  //   navigate(`/server/${serverInfo.id}`)
  // }

  const showFlag = true

  const customBackgroundImage = (window.CustomBackgroundImage as string) !== "" ? window.CustomBackgroundImage : undefined

  // @ts-expect-error ShowNetTransfer is a global variable
  const showNetTransfer = window.ShowNetTransfer as boolean

  // @ts-expect-error FixedTopServerName is a global variable
  const fixedTopServerName = window.FixedTopServerName as boolean

  // const parsedData = parsePublicNote(public_note)

  return <Card
    className={cn(
      "flex flex-col items-center justify-start gap-3 sm:gap-0 p-3 md:px-5 cursor-pointer hover:bg-accent/50 transition-colors",
      showNetTransfer ? "lg:min-h-[91px] min-h-[123px]" : "lg:min-h-[61px] min-h-[93px]",
      {
        "flex-col": fixedTopServerName,
        "lg:flex-row": !fixedTopServerName,
      },
      {
        "bg-card/70": customBackgroundImage,
      },
    )}
    // onClick={cardClick}
  >
    <section
      className={cn("grid items-center gap-2", {
        "lg:w-40": !fixedTopServerName,
      })}
      style={{ gridTemplateColumns: "auto auto 1fr" }}
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-red-500 self-center"></span>
      <div className="relative flex flex-col">
        <p className={cn("break-all font-bold tracking-tight max-w-[108px]", showFlag ? "text-xs" : "text-sm")}>{toolInfo.name}</p>
        <div
          className={cn("hidden lg:block", {
            "lg:hidden": fixedTopServerName,
          })}
        >
          {toolInfo.downloads}
        </div>
      </div>
    </section>
    <div
      className={cn("flex items-center gap-2 lg:hidden", {
        "lg:flex": fixedTopServerName,
      })}
    >
      {toolInfo.summary}
    </div>
    {toolInfo.description}
  </Card>
}
