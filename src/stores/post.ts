import { IAddTweetParams, IAddCommentParams, ILikeTweetParams, IGetTweetParams, IGetHistoryTweetParams} from '@/types/services/post'
import { addTweet, getAllTweet, getMyTweet, getTweet, addComment, likeTweet, getHistoryTweet, reTweet, getMyReTweet, getMyLikeTweet}from '@/services/post'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({}),
  actions: {
    async doAddTweet(params: IAddTweetParams) {
      try {
        const res = await addTweet(params)
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async fetchAllTweet() {
      try {
        const res = await getAllTweet()
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async fetchMyTweet() {
      try {
        const usernsme = localStorage.getItem('username') as string
        const res = await getMyTweet({username: usernsme})
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async fetchTweet(params: IGetTweetParams) {
      try {
        const res = await getTweet(params)
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
      // ✅ 新增：抓某使用者的推文列表
    async fetchUserTweet(username: string) {
      try {
        const res = await getMyTweet({ username })
        console.log('fetchUserTweet res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },

    // ✅ 新增：抓某使用者的轉推列表
    async fetchUserRetweet(username: string) {
      try {
        const res = await getMyReTweet({ username })
        console.log('fetchUserRetweet res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },

    // ✅ 新增：抓某使用者的按讚列表
    async fetchUserLikeTweet(username: string) {
      try {
        const res = await getMyLikeTweet({ username })
        console.log('fetchUserLikeTweet res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async fetchHistoryTweet(params: IGetHistoryTweetParams) {
      try {
        const res = await getHistoryTweet(params)
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async doAddComment(params: IAddCommentParams) {
      try {
        const res = await addComment(params)
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async doLikeTweet(params: ILikeTweetParams) {
      try {
        const res = await likeTweet(params)
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async doRetweet(params: ILikeTweetParams) {
      try {
        const res = await reTweet(params)
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async fetchMyRetweet() {
      try {
        const usernsme = localStorage.getItem('username') as string
        const res = await getMyReTweet({username: usernsme})
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async fetchMyLikeTweet() {
      try {
        const usernsme = localStorage.getItem('username') as string
        const res = await getMyLikeTweet({username: usernsme})
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
  },
})
