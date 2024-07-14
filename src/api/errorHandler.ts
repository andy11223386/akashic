import { IErrorHandler } from '../types/api/errorHandler'
import router from '@/router'
import { ElMessage } from 'element-plus'

export const targetHandler = (msg: string, target: string) => {
  const targetPageList = {
    PROFILE: () => router.push({ name: 'Profile' }),
  }
  targetPageList[target as keyof typeof targetPageList]()
}

export const errorHandler = (data: IErrorHandler) => {
  ElMessage({
    message: data.message,
    type: 'warning',
    duration: 6000,
  })

  return Promise.reject(data)
}
