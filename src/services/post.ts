import api from '@/api/axios'
import {
    IAddTweetRes,
    IAddTweetParams,
    IGetAllTweetRes
} from '../types/services/post'

const BASE_ROUTE = 'api/post'

export const addTweet =
  async (params: IAddTweetParams): Promise<IAddTweetRes> =>
    await api.post(`${BASE_ROUTE}/createPost`, params)


export const getAllTweet =
async (): Promise<IGetAllTweetRes> =>
  await api.post(`${BASE_ROUTE}/getAllTweets`)