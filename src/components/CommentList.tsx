import { Button } from "@/components/ui/button"
import { LikeButton } from "@/components/Like.tsx"
import { HandThumbUpIcon as SolidLike } from "@heroicons/react/24/solid"
import { HandThumbUpIcon as OutlineLike } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import { fetchComment } from "@/lib/nezha-api.ts"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"

type CommentListProps = {
  entityId: number
  entityType: number
  refreshSignal?: any
  onCountChange?: (count: number) => void
}

export function CommentList({ entityId,entityType,refreshSignal,onCountChange }: CommentListProps) {
  const [limit, setLimit] = useState(10)
  const { data } = useQuery({
    queryKey: ["comment", entityId, entityType, refreshSignal, limit],
    queryFn: () => fetchComment(entityId, entityType, limit),
    refetchOnMount: true,
    enabled: !!entityId && !!entityType,
  })

  useEffect(() => {
    if (data?.data && typeof onCountChange === "function") {
      onCountChange(data.data.length) // 或 data.total 视你的 API 结构而定
    }
  }, [data, onCountChange])

  return (
    <>
      <div className="space-y-6">
        {data?.data?.map((comment) => (
          <div className="flex" key={comment.id}>
            <div className="p-1">
              <Avatar>
                <AvatarImage src="http://localhost:8008/api/v1/uploads/file/avatar1.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="font-medium">用户</div>
              <div className="text-sm text-gray-500">{comment.created_at}</div>
              <p className="mt-2 text-gray-700">{comment.content}</p>
              <div className="flex items-center mt-2 space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-500"
                >
                  <LikeButton
                    active={comment.liked}
                    count={comment.likeCount}
                    icon={{ active: SolidLike, inactive: OutlineLike }}
                    activeColor="text-yellow-400"
                    req={{ entityId: comment.id, entityType: 1 }}
                  />
                  赞同 ({comment.likeCount})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-500"
                >
                  回复
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full mt-6"
        onClick={()=>{setLimit(0)}}
      >
        查看更多评论
      </Button>
    </>
  )
}