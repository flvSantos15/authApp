import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

let cookies = parseCookies()
let isRefreshing = false
let faileRequestQueue = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.defaults.headers.common['Authorization'] = `Bearer ${cookies['nextauth.token']}`

api.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => {
  if(error.response?.status === 401){
    if(error.response.data?.code === 'token.expired'){
      //renovar token
      cookies = parseCookies()

      const { 'nextauth.refreshToken': refreshToken } = cookies
      const originalConfig = error.config
      //parei no 5:00 da fila de requisições

      if(!isRefreshing){
        isRefreshing = true

        api.post('/refresh', {
          refreshToken,
        }).then(response => {
          const { token } = response.data
  
          setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          })
          setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          })
  
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        })
      }
      return new Promise((resolve, reject) => {
        faileRequestQueue.push({
          onSuccess: (token: string) => {

          },
          onFailure: () => {}
        })
      })
    }else{
      //deslogar o user
    }
  }
})