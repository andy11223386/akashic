import api from '@/api/axios'
import {
    IAddTweetRes,
    IAddTweetParams,
    IGetAllTweetRes,
    IGetMyTweetParams,
    IGetMyTweetRes,
    IAddCommentParams,
    IAddCommentRes,
    ILikeTweetParams,
    ILikeTweetRes,
    IGetTweetParams,
    IGetTweetRes,
} from '../types/services/post'

const BASE_ROUTE = 'api/post'

export const addTweet =
  async (params: IAddTweetParams): Promise<IAddTweetRes> =>
    await api.post(`${BASE_ROUTE}/createPost`, params)


export const getAllTweet =
async (): Promise<IGetAllTweetRes> =>
  await api.post(`${BASE_ROUTE}/getAllTweets`)

export const getTweet =
async (params: IGetTweetParams): Promise<IGetTweetRes> =>
  await api.post(`${BASE_ROUTE}/getTweet/${params.postId}`)

export const getMyTweet =
async (params: IGetMyTweetParams): Promise<IGetMyTweetRes> =>
  await api.post(`${BASE_ROUTE}/getTweets/${params.username}`)

export const addComment =
async (params: IAddCommentParams): Promise<IAddCommentRes> =>
  await api.post(`api/comment/createComment`, params)

export const likeTweet =
async (params: ILikeTweetParams): Promise<ILikeTweetRes> =>
  await api.post(`${BASE_ROUTE}/like`, params)