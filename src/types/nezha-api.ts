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
  /** 跟帖数量 */
  commentCount: number
  /** 内容 */
  content: string
  created_at: string
  id: number
  /** 图片 	// 回复可见内容 */
  imageList: string
  images: ModelUpload[]
  /** 最后回复时间 */
  lastCommentTime: number
  /** 最后回复用户 	// 扩展数据 */
  lastCommentUserId: number
  /** 点赞数量 */
  likeCount: number
  /** 是否推荐 */
  recommend: boolean
  /** 推荐时间 */
  recommendTime: number
  /** 状态：0：正常、1：删除 */
  status: number
  /** 置顶 */
  sticky: boolean
  /** 置顶时间 */
  stickyTime: number
  /** 用户 */
  title: string
  updated_at: string
  /** 查看数量 */
  viewCount: number
}

export interface CreateResponse {
  success: boolean
  data: {
    id: number
  }
}

export interface ModelTopicForm {
  /** 跟帖数量 */
  commentCount?: number
  /** 内容 	// 图片 	// 回复可见内容 */
  content?: string
  images?: ModelUpload[]
  /** 最后回复时间 */
  lastCommentTime?: number
  /** 最后回复用户 	// 扩展数据 */
  lastCommentUserId?: number
  /** 点赞数量 */
  likeCount?: number
  /** 是否推荐 */
  recommend?: boolean
  /** 推荐时间 */
  recommendTime?: number
  /** 状态：0：正常、1：删除 */
  status?: number
  /** 置顶 */
  sticky?: boolean
  /** 置顶时间 */
  stickyTime?: number
  /** 标题 */
  title: string
  /** 查看数量 */
  viewCount?: number
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