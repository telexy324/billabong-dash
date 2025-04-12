import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchTopicDetail } from "@/lib/nezha-api.ts"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card.tsx"
import { LikeButton } from "@/components/Like.tsx"
import { FavoriteButton } from "@/components/Favorite.tsx"
import { HandThumbUpIcon as SolidLike } from "@heroicons/react/24/solid"
import { HandThumbUpIcon as OutlineLike } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid"
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline"

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

  interface HtmlRendererProps {
    html: string;
    className?: string;
  }

  const HtmlRenderer: React.FC<HtmlRendererProps> = ({ html, className }) => {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-0">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="space-y-6">
          <Card className="bg-white rounded-none shadow-sm p-4">
            <CardContent className="border-t">
              <HtmlRenderer html={data ? data.content : ""}/>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-5 space-y-6">
          <Card className="bg-white rounded-none shadow-sm p-4">
            <CardHeader>
              <CardTitle>{data?.title}</CardTitle>
              {/*<CardDescription>Deploy your new project in one-click.</CardDescription>*/}
            </CardHeader>
            <CardContent className="border-t">
              <HtmlRenderer html={data ? data.content : ""}/>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-6 items-center">
                <LikeButton
                  active={data?data.liked:false}
                  count={data?data.likeCount:0}
                  icon={{ active: SolidLike, inactive: OutlineLike }}
                  activeColor="text-yellow-400"
                  req={{entityId:data?data.id:0,entityType:1}}
                />
                <FavoriteButton
                  active={data?data.favorited:false}
                  icon={{ active: SolidHeart, inactive: OutlineHeart }}
                  activeColor="text-red-500"
                  req={{entityId:data?data.id:0,entityType:2}}
                />
              </div>
            </CardFooter>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-none shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{data?.title}</h3>
              <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                更多
              </Button>
            </div>
            <ol className="space-y-3">
              <li className="flex items-start gap-2">
                  <span
                    className="flex items-center justify-center bg-blue-600 text-white rounded h-5 w-5 text-xs font-medium">
                    1
                  </span>
                <div>
                  <p className="font-medium text-sm">2023年全球经济展望如何？</p>
                  <p className="text-xs text-gray-500">5243万热度</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                  <span
                    className="flex items-center justify-center bg-blue-600 text-white rounded h-5 w-5 text-xs font-medium">
                    2
                  </span>
                <div>
                  <p className="font-medium text-sm">如何看待近期科技行业的裁员潮？</p>
                  <p className="text-xs text-gray-500">4876万热度</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                  <span
                    className="flex items-center justify-center bg-blue-600 text-white rounded h-5 w-5 text-xs font-medium">
                    3
                  </span>
                <div>
                  <p className="font-medium text-sm">大学生毕业后应该选择创业还是就业？</p>
                  <p className="text-xs text-gray-500">3921万热度</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                  <span
                    className="flex items-center justify-center bg-gray-200 text-gray-700 rounded h-5 w-5 text-xs font-medium">
                    4
                  </span>
                <div>
                  <p className="font-medium text-sm">如何培养孩子的阅读习惯？</p>
                  <p className="text-xs text-gray-500">3654万热度</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                  <span
                    className="flex items-center justify-center bg-gray-200 text-gray-700 rounded h-5 w-5 text-xs font-medium">
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
