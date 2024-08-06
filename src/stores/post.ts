import { IAddTweetParams, IAddCommentParams, ILikeTweetParams, IGetTweetParams, IGetHistoryTweetParams} from '@/types/services/post'
import { addTweet, getAllTweet, getMyTweet, getTweet, addComment, likeTweet, getHistoryTweet}from '@/services/post'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({}),
  actions: {
    async doAddTweet(params: IAddTweetParams) {
      try {
        console.log('params',params)

        //const response = await axios.post('http://localhost:3000/api/post/createPost', params);
        //return response
        const res = await addTweet(params)
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async fetchAllTweet() {
      try {
        // console.log('params',params)
        //const response = await axios.post('http://localhost:3000/api/post/createPost', params);
        //return response
        const res = await getAllTweet()
        console.log('res', res)
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async fetchMyTweet() {
      try {
        // console.log('params',params)
        //const response = await axios.post('http://localhost:3000/api/post/createPost', params);
        //return response
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
  },
})
