export interface NezhaWebsocketResponse {
  now: number
  servers: NezhaServer[]
}

export interface NezhaServer {
  id: number
  name: string
  public_note: string
  last_active: string
  country_code: string
  host: NezhaServerHost
  state: NezhaServerStatus
}

export interface NezhaServerHost {
  platform: string
  platform_version: string
  cpu: string[]
  gpu: string[]
  mem_total: number
  disk_total: number
  swap_total: number
  arch: string
  boot_time: number
  version: string
}

export interface NezhaServerStatus {
  cpu: number
  mem_used: number
  swap_used: number
  disk_used: number
  net_in_transfer: number
  net_out_transfer: number
  net_in_speed: number
  net_out_speed: number
  uptime: number
  load_1: number
  load_5: number
  load_15: number
  tcp_conn_count: number
  udp_conn_count: number
  process_count: number
  temperatures: temperature[]
  gpu: number[]
}

interface temperature {
  Name: string
  Temperature: number
}

export interface ServerGroupResponse {
  success: boolean
  data: ServerGroup[]
}

export interface ServerGroup {
  group: {
    id: number
    created_at: string
    updated_at: string
    name: string
  }
  servers: number[]
}

export interface LoginUserResponse {
  success: boolean
  data: {
    id: number
    username: string
    password: string
    created_at: string
    updated_at: string
  }
}

export interface MonitorResponse {
  success: boolean
  data: NezhaMonitor[]
}

export type ServerMonitorChart = {
  [key: string]: {
    created_at: number
    avg_delay: number
  }[]
}

export interface NezhaMonitor {
  monitor_id: number
  monitor_name: string
  server_id: number
  server_name: string
  created_at: number[]
  avg_delay: number[]
}

export interface ServiceResponse {
  success: boolean
  data: {
    services: {
      [key: string]: ServiceData
    }
    cycle_transfer_stats: CycleTransferStats
  }
}

export interface ServiceData {
  service_name: string
  current_up: number
  current_down: number
  total_up: number
  total_down: number
  delay: number[]
  up: number[]
  down: number[]
}

export interface CycleTransferStats {
  [key: string]: CycleTransferData
}

export interface CycleTransferData {
  name: string
  from: string
  to: string
  max: number
  min: number
  server_name: {
    [key: string]: string
  }
  transfer: {
    [key: string]: number
  }
  next_update: {
    [key: string]: string
  }
}

type SettingConfig = {
  debug: boolean
  language: string
  site_name: string
  user_template: string
  admin_template: string
  custom_code: string
}

export interface SettingResponse {
  success: boolean
  data: {
    config: SettingConfig
    version: string
  }
}

export interface ToolGroupResponse {
  success: boolean
  data: ToolGroup[]
}

export interface ToolGroup {
  group: {
    id: number
    created_at: string
    updated_at: string
    name: string
  }
  tools: number[]
}

export interface ToolResponse {
  success: boolean
  data: Tool[]
}

export interface Tool {
  id: number
  created_at: string
  updated_at: string
  name: string
  summary: string
  description: string
  downloads: number
  enabled: boolean
}

export interface ModelUpload {
  created_at: string
  id: number
  /** 编号 */
  key: string
  /** 文件名 */
  name: string
  size: number
  /** 文件标签 */
  tag: string
  updated_at: string
  /** 文件地址 */
  url: string
}

export interface ModelTopic {
  /** 图片 	// 回复可见内容 */
  affixList: string
  affixes: ModelUpload[]
  /** 跟帖数量 */
  commentCount: number
  /** 内容 */
  content: string
  created_at: string
  favorited: boolean
  id: number
  /** 最后回复时间 */
  lastCommentTime: SqlNullTime
  /** 最后回复用户 	// 扩展数据 */
  lastCommentUserId: number
  /** 点赞数量 */
  likeCount: number
  liked: boolean
  /** 是否推荐 */
  recommend: boolean
  /** 推荐时间 */
  recommendTime: SqlNullTime
  /** 状态：0：正常、1：删除 */
  status: number
  /** 置顶 */
  sticky: boolean
  /** 置顶时间 */
  stickyTime: SqlNullTime
  /** 用户 */
  title: string
  updated_at: string
  /** 查看数量 */
  viewCount: number
}

export interface ModelTopicForm {
  affixes?: ModelUpload[]
  /** 跟帖数量 */
  commentCount?: number
  /** 内容 	// 图片 	// 回复可见内容 */
  content: string
  /** LastCommentTime   time.Time `json:"lastCommentTime,omitempty" validate:"optional"`   // 最后回复时间 */
  lastCommentUserId?: number
  /** 点赞数量 */
  likeCount?: number
  /** 是否推荐 */
  recommend?: boolean
  /** 状态：0：正常、1：删除 */
  status?: number
  /** RecommendTime     time.Time `json:"recommendTime,omitempty" validate:"optional"`     // 推荐时间 */
  sticky?: boolean
  /** 标题 */
  title: string
  /** StickyTime        time.Time `json:"stickyTime,omitempty" validate:"optional"`        // 置顶时间 */
  viewCount?: number
}

export interface CreateResponse {
  success: boolean
  data: {
    id: number
  }
}

export interface ModelTopicGroup {
  created_at: string
  id: number
  name: string
  updated_at: string
}

export interface ModelTopicGroupResponseItem {
  group: ModelTopicGroup
  topics: number[]
}

export interface TopicResponse {
  success: boolean
  data: ModelTopic[]
}

export interface TopicGroupResponse {
  success: boolean
  data: ModelTopicGroupResponseItem[]
}

export interface TopicDetailResponse {
  success: boolean
  data: ModelTopic
}

export interface ModelUserFavoriteForm {
  /** 实体编号 */
  entityId: number
  /** 实体类型 	// 创建时间 */
  entityType: number
}

export interface ModelUserLikeForm {
  /** 实体编号 */
  entityId: number
  /** 实体类型 	// 创建时间 */
  entityType: number
}

export interface ModelGetLikeIdsForm {
  /** 实体编号 */
  entityIds: number[]
  /** 实体类型 	// 创建时间 */
  entityType: number
}

export interface ModelFavorite {
  created_at: string
  /** 收藏实体编号 */
  entityId: number
  /** 收藏实体类型 */
  entityType: number
  id: number
  updated_at: string
}

export interface ModelComment {
  /** 评论数量 */
  commentCount: number
  /** 内容 */
  content: string
  /** 内容类型：markdown、html */
  contentType: string
  created_at: string
  /** 被评论实体编号 */
  entityId: number
  /** 被评论实体类型 */
  entityType: number
  favorited: boolean
  id: number
  /** 图片 */
  imageList: string
  images: ModelUpload[]
  /** 点赞数量 */
  likeCount: number
  liked: boolean
  /** 引用的评论编号 */
  quoteId: number
  /** 状态：0：待审核、1：审核通过、2：审核失败、3：已发布 */
  status: number
  updated_at: string
}

export interface ModelCommentForm {
  /** 评论数量 */
  commentCount?: number
  /** 内容 */
  content?: string
  /** 内容类型：markdown、html */
  contentType?: string
  /** 被评论实体编号 */
  entityId?: number
  /** 被评论实体类型 */
  entityType?: number
  /** 图片 */
  imageList?: string
  images?: ModelUpload[]
  /** 点赞数量 */
  likeCount?: number
  /** 引用的评论编号 */
  quoteId?: number
  /** 状态：0：待审核、1：审核通过、2：审核失败、3：已发布 */
  status?: number
}

export interface CommentResponse {
  success: boolean
  data: ModelComment[]
}

export interface ModelUpload {
  created_at: string
  id: number
  /** 编号 */
  key: string
  /** 文件名 */
  name: string
  size: number
  /** 文件标签 */
  tag: string
  updated_at: string
  /** 文件地址 */
  url: string
}

export interface SqlNullTime {
  time?: string
  /** Valid is true if Time is not NULL */
  valid?: boolean
}