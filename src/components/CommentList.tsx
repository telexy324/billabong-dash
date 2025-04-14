import { UserIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/ui/button"
import { LikeButton } from "@/components/Like.tsx"
import { HandThumbUpIcon as SolidLike } from "@heroicons/react/24/solid"
import { HandThumbUpIcon as OutlineLike } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import { fetchComment } from "@/lib/nezha-api.ts"

type CommentListProps = {
  onLoadMore?: () => void
  entityId: number
  entityType: number
  refreshSignal?: any
}

export function CommentList({ onLoadMore,entityId,entityType,refreshSignal }: CommentListProps) {
  const { data } = useQuery({
    queryKey: ["comment", entityId, entityType, refreshSignal],
    queryFn: () => fetchComment(entityId, entityType),
    refetchOnMount: true,
    enabled: !!entityId && !!entityType,
  })

  return (
    <>
      <div className="space-y-6">
        {data?.data.map((comment) => (
          <div className="flex" key={comment.id}>
            <UserIcon className="h-6 w-6 mr-3 mt-1" />
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

      {onLoadMore && (
        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={onLoadMore}
        >
          查看更多评论
        </Button>
      )}
    </>
  )
}