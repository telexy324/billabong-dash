import { useEffect } from "react"
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
          <Card className="rounded-none mt-6 p-6">
            <h3 className="mb-4 text-xl font-bold">评论 (56)</h3>

            <div className="flex mb-4">
            <UserIcon className="h-6 w-6" />
            <CommentForm
              className="w-full p-3 text-sm border border-gray-200 rounded-none focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
              initialData={{
                entityId:data?data.id:0,
                entityType:1,
              }}
            />
            </div>

            <Separator className="my-6" />

             {/*Sample Comments */}
            {/*<div className="space-y-6">*/}
            {/*  <div className="flex">*/}
            {/*    <UserIcon className="h-6 w-6" />*/}
            {/*    <div>*/}
            {/*      <div className="font-medium">王小明</div>*/}
            {/*      <div className="text-sm text-gray-500">2023年4月16日</div>*/}
            {/*      <p className="mt-2 text-gray-700">*/}
            {/*        非常有见地的文章！我特别同意AI将增强而不是取代人类能力的观点。在我的工作中，AI工具已经帮助我节省了大量处理数据的时间。*/}
            {/*      </p>*/}
            {/*      <div className="flex items-center mt-2 space-x-4">*/}
            {/*        <Button variant="ghost" size="sm" className="text-xs text-gray-500">*/}
            {/*          <LikeButton*/}
            {/*            active={data?data.liked:false}*/}
            {/*            count={data?data.likeCount:0}*/}
            {/*            icon={{ active: SolidLike, inactive: OutlineLike }}*/}
            {/*            activeColor="text-yellow-400"*/}
            {/*            req={{entityId:data?data.id:0,entityType:1}}*/}
            {/*          />*/}
            {/*          赞同 (24)*/}
            {/*        </Button>*/}
            {/*        <Button variant="ghost" size="sm" className="text-xs text-gray-500">*/}
            {/*          回复*/}
            {/*        </Button>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}

            {/*  <div className="flex">*/}
            {/*    <UserIcon className="h-6 w-6" />*/}
            {/*    <div>*/}
            {/*      <div className="font-medium">陈思思</div>*/}
            {/*      <div className="text-sm text-gray-500">2023年4月15日</div>*/}
            {/*      <p className="mt-2 text-gray-700">*/}
            {/*        文章提到了AI的伦理问题，这点非常重要。随着AI技术的发展，我们需要建立更完善的监管框架，确保技术发展的同时保护隐私和安全。*/}
            {/*      </p>*/}
            {/*      <div className="flex items-center mt-2 space-x-4">*/}
            {/*        <Button variant="ghost" size="sm" className="text-xs text-gray-500">*/}
            {/*          <LikeButton*/}
            {/*            active={data?data.liked:false}*/}
            {/*            count={data?data.likeCount:0}*/}
            {/*            icon={{ active: SolidLike, inactive: OutlineLike }}*/}
            {/*            activeColor="text-yellow-400"*/}
            {/*            req={{entityId:data?data.id:0,entityType:1}}*/}
            {/*          />*/}
            {/*          赞同 (18)*/}
            {/*        </Button>*/}
            {/*        <Button variant="ghost" size="sm" className="text-xs text-gray-500">*/}
            {/*          回复*/}
            {/*        </Button>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/*<Button variant="outline" className="w-full mt-6">*/}
            {/*  查看更多评论*/}
            {/*</Button>*/}
            <CommentList onLoadMore={() => console.log("加载更多")} entityType={1} entityId={data?data.id:0} />
          </Card>
        </div>
        {/* Sidebar */}
      </div>
    </div>
  )
}
