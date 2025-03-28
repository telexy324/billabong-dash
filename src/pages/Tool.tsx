// import GlobalMap from "@/components/GlobalMap"
// import GroupSwitch from "@/components/GroupSwitch"
// import ServerCard from "@/components/ServerCard"
// import ServerCardInline from "@/components/ServerCardInline"
// import { ServiceTracker } from "@/components/ServiceTracker"
// import { Label } from "@/components/ui/label"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { SORT_ORDERS, SORT_TYPES } from "@/context/sort-context"
// import { useSort } from "@/hooks/use-sort"
import { fetchToolGroup, fetchTool } from "@/lib/nezha-api"
// import { cn } from "@/lib/utils"
import { ToolGroup } from "@/types/nezha-api"
// import { ArrowDownIcon, ArrowUpIcon, ArrowsUpDownIcon, ViewColumnsIcon } from "@heroicons/react/20/solid"
import { HandThumbUpIcon } from "@heroicons/react/20/solid"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
// import ToolOverview from "@/components/ToolOverview.tsx"
// import ToolCard from "@/components/ToolCard.tsx"
// import ToolCardInline from "@/components/ToolCardInline.tsx"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Tools() {
  // const { sortType, sortOrder, setSortOrder, setSortType } = useSort()
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
  // const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
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

  // const totalTools = filteredTools.length || 0
  // // todo 增加真实数量
  // const onlineTools = 2
  // const offlineTools = 4

  return (
    <div className="mx-auto w-full max-w-5xl px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/*<ToolOverview*/}
          {/*  total={totalTools}*/}
          {/*  online={onlineTools}*/}
          {/*  offline={offlineTools}*/}
          {/*/>*/}
          <Tabs defaultValue="recommend" className="bg-white rounded-lg shadow-sm">
            <TabsList className="w-full justify-start border-b rounded-none h-12 bg-white">
              {groupTabs.map((group) => (
                <TabsTrigger key={group} value={group}
                  className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-12"
                >
                  {group}
                </TabsTrigger>
              ))}
            </TabsList>
            {filteredTools.map((tool) => (
              <TabsContent key={tab} value={tab}>
                <p>{tab.charAt(0).toUpperCase() + tab.slice(1)} 内容</p>
              </TabsContent>
            ))}
            <TabsContent value="recommend" className="p-0 m-0">
              {/* Feed Items */}
              <div className="divide-y">
                {/* Feed Item 1 */}
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">用户名</span>
                    <span className="text-xs text-gray-500">回答了问题</span>
                  </div>
                  <Link href="#" className="block">
                    <h3 className="text-lg font-bold hover:text-blue-600">为什么越来越多的年轻人选择"躺平"？</h3>
                  </Link>
                  <p className="text-gray-700 line-clamp-3">
                    近年来，"躺平"成为了一种社会现象，特别是在年轻人中间。这种现象反映了当代社会压力与个人选择之间的矛盾。一方面，社会竞争日益激烈，房价、教育、医疗等生活成本不断上升；另一方面，部分年轻人开始反思传统的成功观念，寻求更加平衡的生活方式。
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <HandThumbUpIcon className="h-4 w-4 mr-1" />
                        <span>1.2k</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>345</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span>分享</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Feed Item 2 */}
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">科技爱好者</span>
                    <span className="text-xs text-gray-500">发布了文章</span>
                  </div>
                  <Link href="#" className="block">
                    <h3 className="text-lg font-bold hover:text-blue-600">人工智能将如何改变我们的未来工作方式？</h3>
                  </Link>
                  <p className="text-gray-700 line-clamp-3">
                    随着人工智能技术的快速发展，我们的工作方式正在经历前所未有的变革。AI不仅能够自动化重复性任务，还能辅助决策、提高效率，甚至创造新的工作岗位。然而，这也带来了就业结构的调整和技能需求的变化。未来，人类与AI的协作将成为主流工作模式。
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <HandThumbUpIcon className="h-4 w-4 mr-1" />
                        <span>876</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>231</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span>分享</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Feed Item 3 */}
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">健康专家</span>
                    <span className="text-xs text-gray-500">回答了问题</span>
                  </div>
                  <Link href="#" className="block">
                    <h3 className="text-lg font-bold hover:text-blue-600">如何在忙碌的工作中保持健康的生活方式？</h3>
                  </Link>
                  <p className="text-gray-700 line-clamp-3">
                    在当今快节奏的社会中，许多人因工作繁忙而忽视了健康。然而，保持健康的生活方式对于提高工作效率和生活质量至关重要。建议从以下几个方面入手：合理规划时间，确保充足睡眠；工作间隙进行短暂的伸展或步行；注意饮食均衡，避免过度依赖快餐；培养定期锻炼的习惯；学会减压和放松。
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <HandThumbUpIcon className="h-4 w-4 mr-1" />
                        <span>543</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>178</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span>分享</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="follow" className="p-4 text-center text-gray-500">
              关注内容将显示在这里
            </TabsContent>
            <TabsContent value="hot" className="p-4 text-center text-gray-500">
              热榜内容将显示在这里
            </TabsContent>
            <TabsContent value="video" className="p-4 text-center text-gray-500">
              视频内容将显示在这里
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
