import { IAddTweetParams } from '@/types/services/post'
import { addTweet, getAllTweet}from '@/services/post'
import { defineStore } from 'pinia'
import axios from 'axios'

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
  },
})
