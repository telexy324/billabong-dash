import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchTopicDetail } from "@/lib/nezha-api.ts"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card.tsx"
import { LikeButton } from "@/components/Like.tsx"
import { FavoriteButton } from "@/components/Favorite.tsx"
import { HandThumbUpIcon as SolidLike } from "@heroicons/react/24/solid"
import { HandThumbUpIcon as OutlineLike } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid"
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline"
import { UserIcon } from "@heroicons/react/20/solid"
// import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CommentForm from "@/components/CommentForm.tsx"
import { CommentList } from "@/components/CommentList.tsx"
import { Button } from "@/components/ui/button.tsx"
import { handleDownload } from "@/lib/utils.ts"
import HtmlRenderer from "@/components/HtmlRender.tsx"

export default function TopicDetail() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [])

  const { id: topic_id } = useParams()

  const [refreshSignal, setRefreshSignal] = useState(Date.now())
  const handleValueCommit = () => {
    setRefreshSignal(Date.now()) // 触发 CommentList 的刷新
  }
  const [commentCount, setCommentCount] = useState(0)

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

  // interface HtmlRendererProps {
  //   html: string;
  //   className?: string;
  // }
  //
  // const HtmlRenderer: React.FC<HtmlRendererProps> = ({ html, className }) => {
  //   return (
  //     <div
  //       className={className}
  //       dangerouslySetInnerHTML={{ __html: html }}
  //     />
  //   )
  // }

  return (
    <div className="mx-auto w-full max-w-5xl px-0">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/*<div className="space-y-6">*/}
        {/*  <Card className="bg-white rounded-none shadow-sm p-4">*/}
        {/*    <CardContent className="border-t">*/}
        {/*      <HtmlRenderer html={data ? data.content : ""}/>*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}
        {/*</div>*/}

        <div className="md:col-span-6 space-y-6">
          <Card className="bg-white rounded-none shadow-sm p-4">
            <CardHeader>
              <CardTitle>{data?.title}</CardTitle>
              {/*<CardDescription>Deploy your new project in one-click.</CardDescription>*/}
            </CardHeader>
            <CardContent className="border-t">
              <HtmlRenderer html={data ? data.content : ""}/>
              <Separator className="my-6" />
              {data?.affixes?.map((affix) => (
                <div className="flex" key={affix.id}>
                  <Button variant="ghost" asChild onClick={handleDownload(affix)} className="p-0 h-auto">
                    <p className='text-foreground/80 line-clamp-1 text-sm font-medium cursor-pointer hover:text-blue-600 focus:text-blue-600 focus:outline-none'>
                      {affix.name}
                    </p>
                  </Button>
                </div>
              ))}
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
                  req={{entityId:data?data.id:0,entityType:1}}
                />
              </div>
            </CardFooter>
          </Card>
          <Card className="rounded-none mt-6 p-6">
            <h3 className="mb-4 text-xl font-bold">评论 ({commentCount})</h3>

            <div className="flex mb-4">
            <UserIcon className="h-6 w-6" />
            <CommentForm
              className="w-full p-3 text-sm border border-gray-200 rounded-none focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
              initialData={{
                entityId:data?data.id:0,
                entityType:1,
              }}
              onValueCommit={handleValueCommit}
            />
            </div>

            <Separator className="my-6" />
            <CommentList
              entityType={1}
              entityId={data?data.id:0}
              refreshSignal={refreshSignal}
              onCountChange={setCommentCount}
            />
          </Card>
        </div>
        {/* Sidebar */}
      </div>
    </div>
  )
}
