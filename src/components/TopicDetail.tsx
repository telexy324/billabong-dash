import { NetworkChart } from "@/components/NetworkChart"
import ServerDetailChart from "@/components/ServerDetailChart"
import ServerDetailOverview from "@/components/ServerDetailOverview"
import TabSwitch from "@/components/TabSwitch"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchMonitor, fetchTopicDetail } from "@/lib/nezha-api.ts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"
import { ChevronRightIcon, UserIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/ui/button.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Card, CardHeader,CardTitle,CardDescription,CardContent,CardFooter } from "@/components/ui/card.tsx"

export default function TopicDetail() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [])

  const { id: topic_id } = useParams()

  const { data } = useQuery({
    queryKey: ["topic", topic_id],
    queryFn: () => fetchTopicDetail(Number(topic_id)),
    refetchOnMount: true,
    enabled: !!topic_id,
    // refetchOnWindowFocus: true,
    // refetchInterval: 10000,
  })

  if (!topic_id) {
    navigate("/404")
    return null
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">

        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="bg-white rounded-none shadow-sm p-4">
            <CardHeader>
              <CardTitle>{data?.title}</CardTitle>
              {/*<CardDescription>Deploy your new project in one-click.</CardDescription>*/}
            </CardHeader>
            <CardContent className="border-t">
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-none shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{data.title}</h3>
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
        </div>
      </div>
    </div>
  )
}
