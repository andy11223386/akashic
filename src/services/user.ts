import api from '@/api/axios'
import {
    IGetProfileRes,
    IGetProfileParams,
    ILoginRes,
    ILoginParams,
    IUpdateProfileParams,
    IUpdateProfileRes,
} from '../types/services/user'

const BASE_ROUTE = 'api/auth'

export const login =   async (params: ILoginParams): Promise<ILoginRes> =>
    await api.post(`${BASE_ROUTE}/login`, params)

export const getProfile =
  async (params: IGetProfileParams): Promise<IGetProfileRes> => 
    await api.post(`${BASE_ROUTE}/profile/${params.username}`)

  export const updateProfile =
  async (username:string, params: IUpdateProfileParams): Promise<IUpdateProfileRes> => 
    await api.post(`${BASE_ROUTE}/updateProfile/${username}`, params)
