import axios, { type AxiosResponse } from 'axios'
// import Cookies from 'js-cookie'
import { errorHandler } from '@/api/errorHandler'
import { successHandler } from '@/api/successHandler'
//import { encrypt, decrypt } from '@/utils/encryption'
// import { useAuthStore } from 'Stores/auth'

const $http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000 * 10,
})

//$http.defaults.headers.post['Content-Type'] = 'text/plain'

$http.interceptors.request.use(
  config => {
    // const token = sessionStorage.getItem('token')
    //const token = 'd1dc8665-af5a-4360-8892-b4599f5fd350'
    //if (token && config.headers) config.headers['X-Auth-Token'] = token

    // config.method === 'post'
    //   ? (config.data = { ...config.data } as string)
    //   : (config.params = { ...config.params })
    // const controller = new AbortController()
    // config.signal = controller.signal

    return config
  },
  error => {
    console.error('Axios request error: ' + error)
    return Promise.reject(error)
  }
)

$http.interceptors.response.use(
  (res: AxiosResponse): any => {
    const url = res.config.url as string
    const data = res.data
    console.log('data', data)
    return data
  },
  error => {
    errorHandler(error.response.data)
    console.error('Axios response error: ' + error)
    return Promise.reject(error)
  }
)
// $http.interceptors.response.use(
//   (res: AxiosResponse): any => {
//     // const authStore = useAuthStore()
//     const url = res.config.url as string
//     const data = res.data
//     console.log('data', data)
//     // if (url === '/ccs/login') {
//     //   const token = res.headers['x-auth-token']
//     //   if (token) {
//     //     sessionStorage.setItem('token', token)
//     //     Cookies.set('token', token, {
//     //       domain: import.meta.env.VITE_DOM,
//     //       expires: 1 / 24,
//     //     })
//     //   }
//     // }

//     const { status } = res

//     if (status) {
//       const statusList = {
//         '200': () => successHandler(data, url),
//         '0000': () => successHandler(data, url),
//         '500': () => errorHandler(data),
//         '1036': () => errorHandler(data),
//         '9999': () => errorHandler(data),
//         // '1005': () => authStore.stateLogout(), // Not Login（需重新登入）
//         // '1013': () => authStore.stateLogout(), // Invalid Token，需重新登入
//       }
//       const data_status = data.status as keyof typeof statusList
//       return statusList[data_status]?.()
//     }

//     return Promise.reject(res)
//   },
//   error => {
//     errorHandler(error.response.data)
//     console.error('Axios response error: ' + error)
//     return Promise.reject(error)
//   }
// )

export default $http
