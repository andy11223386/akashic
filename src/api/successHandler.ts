import { ElMessage } from "element-plus";

export const successHandler = (
    data: { status: string; message?: string; isBackToPT?: boolean },
    url: string
  ) => {
    const messageType = data.isBackToPT ? 'warning' : 'success'
  
    if (data.message) {
      ElMessage({
        message: data.message,
        type: messageType,
      })
    }
  
    return data
  }
  