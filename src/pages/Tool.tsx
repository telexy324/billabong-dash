// import GlobalMap from "@/components/GlobalMap"
import GroupSwitch from "@/components/GroupSwitch"
// import ServerCard from "@/components/ServerCard"
// import ServerCardInline from "@/components/ServerCardInline"
// import { ServiceTracker } from "@/components/ServiceTracker"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SORT_ORDERS, SORT_TYPES } from "@/context/sort-context"
import { useSort } from "@/hooks/use-sort"
import { fetchToolGroup, fetchTool } from "@/lib/nezha-api"
import { cn } from "@/lib/utils"
import { ToolGroup } from "@/types/nezha-api"
import { ArrowDownIcon, ArrowUpIcon, ArrowsUpDownIcon, ViewColumnsIcon } from "@heroicons/react/20/solid"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import ToolOverview from "@/components/ToolOverview.tsx"
import ToolCard from "@/components/ToolCard.tsx"
import ToolCardInline from "@/components/ToolCardInline.tsx"

export default function Tools() {
  const { sortType, sortOrder, setSortOrder, setSortType } = useSort()
  const { data: groupData } = useQuery({
    queryKey: ["tool-group"],
    queryFn: () => fetchToolGroup(),
  })
  const { data: toolData } = useQuery({
    queryKey: ["tool"],
    queryFn: () => fetchTool(),
  })
  // const [showServices, setShowServices] = useState<string>("0")
  // const [showMap, setShowMap] = useState<string>("0")
  const [inline, setInline] = useState<string>("0")
  const containerRef = useRef<HTMLDivElement>(null)
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
  const [currentGroup, setCurrentGroup] = useState<string>("All")

  const customBackgroundImage = (window.CustomBackgroundImage as string) !== "" ? window.CustomBackgroundImage : undefined

  const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem("scrollPosition")
    if (savedPosition && containerRef.current) {
      containerRef.current.scrollTop = Number(savedPosition)
    }
  }

  const handleTagChange = (newGroup: string) => {
    setCurrentGroup(newGroup)
    sessionStorage.setItem("selectedGroup", newGroup)
    sessionStorage.setItem("scrollPosition", String(containerRef.current?.scrollTop || 0))
  }

  // useEffect(() => {
  //   const showServicesState = localStorage.getItem("showServices")
  //   if (window.ForceShowServices) {
  //     setShowServices("1")
  //   } else if (showServicesState !== null) {
  //     setShowServices(showServicesState)
  //   }
  // }, [])

  useEffect(() => {
    const inlineState = localStorage.getItem("inline")
    if (window.ForceCardInline) {
      setInline("1")
    } else if (inlineState !== null) {
      setInline(inlineState)
    }
  }, [])

  // useEffect(() => {
  //   const showMapState = localStorage.getItem("showMap")
  //   if (window.ForceShowMap) {
  //     setShowMap("1")
  //   } else if (showMapState !== null) {
  //     setShowMap(showMapState)
  //   }
  // }, [])

  useEffect(() => {
    const savedGroup = sessionStorage.getItem("selectedGroup") || "All"
    setCurrentGroup(savedGroup)

    restoreScrollPosition()
  }, [])

  // const nezhaWsData = lastMessage ? (JSON.parse(lastMessage.data) as NezhaWebsocketResponse) : null

  const groupTabs = [
    "All",
    ...(groupData?.data
      ?.filter((item: ToolGroup) => {
        return Array.isArray(item.tools) && item.tools.some((toolId) => toolData?.data?.some((tool) => tool.id === toolId))
      })
      ?.map((item: ToolGroup) => item.group.name) || []),
  ]

  // if (!connected && !lastMessage) {
  //   return (
  //     <div className="flex flex-col items-center min-h-96 justify-center ">
  //       <div className="font-semibold flex items-center gap-2 text-sm">
  //         <Loader visible={true} />
  //         {t("info.websocketConnecting")}
  //       </div>
  //     </div>
  //   )
  // }

  // if (!toolData) {
  //   return (
  //     <div className="flex flex-col items-center justify-center ">
  //       <p className="font-semibold text-sm">{t("info.processing")}</p>
  //     </div>
  //   )
  // }

  const filteredTools =
    toolData?.data?.filter((tool) => {
      if (currentGroup === "All") return true
      const group = groupData?.data?.find(
        (g: ToolGroup) => g.group.name === currentGroup && Array.isArray(g.tools) && g.tools.includes(tool.id),
      )
      return !!group
    }) || []

  const totalTools = filteredTools.length || 0
  // todo 增加真实数量
  const onlineTools = 2
  const offlineTools = 4

  return (
    <div className="mx-auto w-full max-w-5xl px-0">
      <ToolOverview
        total={totalTools}
        online={onlineTools}
        offline={offlineTools}
      />
      <div className="flex mt-6 items-center justify-between gap-2 server-overview-controls">
        <section className="flex items-center gap-2 w-full overflow-hidden">
          <button
            onClick={() => {
              setInline(inline === "0" ? "1" : "0")
              localStorage.setItem("inline", inline === "0" ? "1" : "0")
            }}
            className={cn(
              "rounded-[50px] bg-white dark:bg-stone-800 cursor-pointer p-[10px] transition-all border dark:border-none border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
              {
                "shadow-[inset_0_1px_0_rgba(0,0,0,0.2)] !bg-blue-600 hover:!bg-blue-600 border-blue-600 dark:border-blue-600": inline === "1",
                "text-white": inline === "1",
              },
              {
                "bg-opacity-70 dark:bg-opacity-70": customBackgroundImage,
              },
            )}
          >
            <ViewColumnsIcon
              className={cn("size-[13px]", {
                "text-white": inline === "1",
              })}
            />
          </button>
          <GroupSwitch tabs={groupTabs} currentTab={currentGroup} setCurrentTab={handleTagChange} />
        </section>
        <Popover onOpenChange={setSettingsOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "rounded-[50px] flex items-center gap-1 dark:text-white border dark:border-none text-black cursor-pointer dark:[text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] dark:bg-stone-800 bg-white  p-[10px] transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]  ",
                {
                  "shadow-[inset_0_1px_0_rgba(0,0,0,0.2)] dark:bg-stone-700 bg-stone-200": settingsOpen,
                },
                {
                  "dark:bg-stone-800/70 bg-stone-100/70 ": customBackgroundImage,
                },
              )}
            >
              <p className="text-[10px] font-bold whitespace-nowrap">{sortType === "default" ? "Sort" : sortType.toUpperCase()}</p>
              {sortOrder === "asc" && sortType !== "default" ? (
                <ArrowUpIcon className="size-[13px]" />
              ) : sortOrder === "desc" && sortType !== "default" ? (
                <ArrowDownIcon className="size-[13px]" />
              ) : (
                <ArrowsUpDownIcon className="size-[13px]" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-4 w-[240px] rounded-lg">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Sort by</Label>
                <Select value={sortType} onValueChange={setSortType}>
                  <SelectTrigger className="w-full text-xs h-8">
                    <SelectValue placeholder="Choose type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_TYPES.map((type) => (
                      <SelectItem key={type} value={type} className="text-xs">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Sort order</Label>
                <Select value={sortOrder} onValueChange={setSortOrder} disabled={sortType === "default"}>
                  <SelectTrigger className="w-full text-xs h-8">
                    <SelectValue placeholder="Choose order" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_ORDERS.map((order) => (
                      <SelectItem key={order} value={order} className="text-xs">
                        {order.charAt(0).toUpperCase() + order.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {inline === "1" && (
        <section ref={containerRef} className="flex flex-col gap-2 overflow-x-scroll scrollbar-hidden mt-6 server-inline-list">
          {filteredTools.map((toolInfo) => (
            <ToolCardInline key={toolInfo.id} toolInfo={toolInfo} />
          ))}
        </section>
      )}
      {inline === "0" && (
        <section ref={containerRef} className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-6 server-card-list">
          {filteredTools.map((toolInfo) => (
            <ToolCard key={toolInfo.id} toolInfo={toolInfo} />
          ))}
        </section>
      )}
    </div>
  )
}
