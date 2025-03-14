// import ServerFlag from "@/components/ServerFlag"
// import ServerUsageBar from "@/components/ServerUsageBar"
// import { formatBytes } from "@/lib/format"
// import { GetFontLogoClass, GetOsName, MageMicrosoftWindows } from "@/lib/logo-class"
import { cn } from "@/lib/utils"
import { Tool } from "@/types/nezha-api"
// import { useTranslation } from "react-i18next"
// import { useNavigate } from "react-router-dom"
//
// import PlanInfo from "./PlanInfo"
// import BillingInfo from "./billingInfo"
import { Card } from "./ui/card"
import { Separator } from "./ui/separator"

export default function ToolCardInline({ toolInfo }: { toolInfo: Tool }) {
  // const { t } = useTranslation()
  // const navigate = useNavigate()
  // const { name, country_code, online, cpu, up, down, mem, stg, platform, uptime, net_in_transfer, net_out_transfer, public_note } = formatNezhaInfo(
  //   now,
  //   serverInfo,
  // )
  //
  // const cardClick = () => {
  //   sessionStorage.setItem("fromMainPage", "true")
  //   navigate(`/server/${serverInfo.id}`)
  // }

  // const showFlag = true

  const customBackgroundImage = (window.CustomBackgroundImage as string) !== "" ? window.CustomBackgroundImage : undefined

  // const parsedData = parsePublicNote(public_note)

  return <Card
    className={cn(
      "flex  min-h-[61px] min-w-[900px] items-center justify-start p-3 md:px-5 flex-row cursor-pointer hover:bg-accent/50 transition-colors",
      {
        "bg-card/70": customBackgroundImage,
      },
    )}
    // onClick={cardClick}
  >
    <section className={cn("grid items-center gap-2 w-40")} style={{ gridTemplateColumns: "auto auto 1fr" }}>
      <span className="h-2 w-2 shrink-0 rounded-full bg-red-500 self-center"></span>
      <div className="relative flex flex-col">
        <p className={cn("break-all font-bold w-28 tracking-tight", "text-sm")}>{toolInfo.name}</p>
        {toolInfo.downloads}
      </div>
    </section>
    <Separator orientation="vertical" className="h-8 ml-3 lg:ml-1 mr-3" />
    {toolInfo.description}
  </Card>
}
