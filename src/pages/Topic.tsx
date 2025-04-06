import { fetchTopicGroup, fetchTopic } from "@/lib/nezha-api"
import { ChevronRightIcon, UserIcon } from "@heroicons/react/20/solid"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";

export default function Topic() {
  const { data: groupData } = useQuery({
    queryKey: ["topic-group"],
    queryFn: () => fetchTopicGroup(),
  })
  const [activeTab, setActiveTab] = useState<string | null>(null)
  useEffect(() => {
    if (!activeTab && groupData?.data && groupData.data.length > 0) {
      setActiveTab(groupData?.data[0].group.name)
    }
  }, [groupData])
  const defaultTab = groupData?.data[0].group.name
  const selectedTab = activeTab || defaultTab
  const selectedTabId = groupData?.data.find((data) => data.group.name === selectedTab)?.group.id
  const { data: topicData } = useQuery({
    queryKey: ["topic", selectedTabId],
    queryFn: () => fetchTopic(selectedTabId),
  })

  return (
    <div className="mx-auto w-full max-w-5xl px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Tabs value={selectedTab} onValueChange={setActiveTab} className="bg-white rounded-lg shadow-sm">
            <TabsList className="w-full justify-start border-b rounded-none h-12 bg-white">
              {groupData?.data.map((data) => (
                <TabsTrigger key={data.group.id} value={data.group.name}
                  className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-12"
                >
                  {data.group.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeTab?activeTab:""} className="p-0 m-0">
              <div className="divide-y">
              {topicData?.data.map((topic) => (
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-6 w-6" />
                    <span className="text-sm font-medium">用户名</span>
                    <span className="text-xs text-gray-500">发表了话题</span>
                  </div>
                  <Link to="#section-id">
                    <h3 className="text-lg font-bold hover:text-blue-600">{topic.title}</h3>
                  </Link>
                  <p className="text-gray-700 line-clamp-3">
                    {topic.title}
                  </p>
                </div>
              ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Creator Card */}
          <div className="bg-white rounded-none shadow-sm p-4">
            <h3 className="font-medium mb-3">创作中心</h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <UserIcon className="h-6 w-6" />
                <div>
                  <p className="font-medium">用户名</p>
                  <p className="text-xs text-gray-500">查看个人主页</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                写文章
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-lg font-medium">0</p>
                <p className="text-xs text-gray-500">创作数</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-lg font-medium">0</p>
                <p className="text-xs text-gray-500">浏览量</p>
              </div>
            </div>
          </div>

          {/* Hot Topics */}
          <div className="bg-white rounded-none shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">热门话题</h3>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ChevronRightIcon className="h-4 w-4" />
                <span className="sr-only">更多</span>
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Badge variant="outline" className="rounded-full">
                  科技
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  教育
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  健康
                </Badge>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="rounded-full">
                  职场
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  生活
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  文化
                </Badge>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="rounded-full">
                  经济
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  艺术
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  体育
                </Badge>
              </div>
            </div>
          </div>

          {/* Trending */}
          <div className="bg-white rounded-none shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">热搜榜</h3>
              <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                更多
              </Button>
            </div>
            <ol className="space-y-3">
              <li className="flex items-start gap-2">
                  <span className="flex items-center justify-center bg-blue-600 text-white rounded h-5 w-5 text-xs font-medium">
                    1
                  </span>
                <div>
                  <p className="font-medium text-sm">2023年全球经济展望如何？</p>
                  <p className="text-xs text-gray-500">5243万热度</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                  <span className="flex items-center justify-center bg-blue-600 text-white rounded h-5 w-5 text-xs font-medium">
                    2
                  </span>
                <div>
                  <p className="font-medium text-sm">如何看待近期科技行业的裁员潮？</p>
                  <p className="text-xs text-gray-500">4876万热度</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                  <span className="flex items-center justify-center bg-blue-600 text-white rounded h-5 w-5 text-xs font-medium">
                    3
                  </span>
                <div>
                  <p className="font-medium text-sm">大学生毕业后应该选择创业还是就业？</p>
                  <p className="text-xs text-gray-500">3921万热度</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                  <span className="flex items-center justify-center bg-gray-200 text-gray-700 rounded h-5 w-5 text-xs font-medium">
                    4
                  </span>
                <div>
                  <p className="font-medium text-sm">如何培养孩子的阅读习惯？</p>
                  <p className="text-xs text-gray-500">3654万热度</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                  <span className="flex items-center justify-center bg-gray-200 text-gray-700 rounded h-5 w-5 text-xs font-medium">
                    5
                  </span>
                <div>
                  <p className="font-medium text-sm">远程工作会成为未来的主流吗？</p>
                  <p className="text-xs text-gray-500">3287万热度</p>
                </div>
              </li>
            </ol>
          </div>

          {/*/!* Footer Links *!/*/}
          {/*<div className="p-4">*/}
          {/*  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">*/}
          {/*    <Link href="#" className="hover:text-blue-600">*/}
          {/*      关于知乎*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="hover:text-blue-600">*/}
          {/*      城市*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="hover:text-blue-600">*/}
          {/*      功能*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="hover:text-blue-600">*/}
          {/*      商业*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="hover:text-blue-600">*/}
          {/*      隐私*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="hover:text-blue-600">*/}
          {/*      条款*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="hover:text-blue-600">*/}
          {/*      联系我们*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="hover:text-blue-600">*/}
          {/*      工作*/}
          {/*    </Link>*/}
          {/*    <Link href="#" className="hover:text-blue-600">*/}
          {/*      申请认证*/}
          {/*    </Link>*/}
          {/*  </div>*/}
          {/*  <p className="mt-4 text-xs text-gray-400">© 2023 知乎</p>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}
