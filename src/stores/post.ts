import { IAddTweetParams, IGetMyTweetParams } from '@/types/services/post'
import { addTweet, getAllTweet, getMyTweet}from '@/services/post'
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
  },
})
