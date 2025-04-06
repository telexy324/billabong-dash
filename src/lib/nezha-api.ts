import {
  LoginUserResponse,
  MonitorResponse,
  ServerGroupResponse,
  ServiceResponse,
  SettingResponse,
  ToolGroupResponse,
  ToolResponse,
  ModelUpload, CreateResponse, ModelTopicForm, TopicResponse, TopicGroupResponse, TopicDetailResponse, ModelTopic,
} from "@/types/nezha-api"

let lastestRefreshTokenAt = 0

export const fetchServerGroup = async (): Promise<ServerGroupResponse> => {
  const response = await fetch("/api/v1/server-group")
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data
}

export const fetchLoginUser = async (): Promise<LoginUserResponse> => {
  const response = await fetch("/api/v1/profile")
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }

  // auto refresh token
  if (document.cookie && (!lastestRefreshTokenAt || Date.now() - lastestRefreshTokenAt > 1000 * 60 * 60)) {
    lastestRefreshTokenAt = Date.now()
    fetch("/api/v1/refresh-token")
  }

  return data
}

export const fetchMonitor = async (server_id: number): Promise<MonitorResponse> => {
  const response = await fetch(`/api/v1/service/${server_id}`)
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data
}

export const fetchService = async (): Promise<ServiceResponse> => {
  const response = await fetch("/api/v1/service")
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data
}

export const fetchSetting = async (): Promise<SettingResponse> => {
  const response = await fetch("/api/v1/setting")
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data
}

export const fetchToolGroup = async (): Promise<ToolGroupResponse> => {
  const response = await fetch("/api/v1/tool-group")
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data
}

export const fetchTool = async (group_id?: number): Promise<ToolResponse> => {
  let url: string
  console.log(group_id)
  if (group_id) {
    url = `/api/v1/tool?groupId=${group_id}`
  } else {
    url = `/api/v1/tool`
  }
  const response = await fetch(url)
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data
}

export const upload = async (file: File): Promise<ModelUpload> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/v1/file", {
    method: "POST",
    body: formData,
  })
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data.data
}

export const createTopic = async (req: ModelTopicForm): Promise<CreateResponse> => {
  const response = await fetch("/api/v1/topic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data.data
}

export const fetchTopicGroup = async (): Promise<TopicGroupResponse> => {
  const response = await fetch("/api/v1/topic-group")
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data
}

export const fetchTopic = async (group_id?: number): Promise<TopicResponse> => {
  let url: string
  console.log(group_id)
  if (group_id) {
    url = `/api/v1/topic?groupId=${group_id}`
  } else {
    url = `/api/v1/topic`
  }
  const response = await fetch(url)
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data
}

export const fetchTopicDetail = async (topic_id: number): Promise<ModelTopic> => {
  const response = await fetch(`/api/v1/topic/${topic_id}`)
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data.data
}