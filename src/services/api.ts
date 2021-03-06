import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../context/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'

let isRefreshing = false
let faileRequestQueue = []

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
  })
  
  api.defaults.headers.common['Authorization'] = `Bearer ${cookies['nextauth.token']}`
  
  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if(error.response?.status === 401){
      if(error.response.data?.code === 'token.expired'){
        //renovar token
        cookies = parseCookies(ctx)
  
        const { 'nextauth.refreshToken': refreshToken } = cookies
        const originalConfig = error.config
        //parei no 5:00 da fila de requisições
  
        if(!isRefreshing){
          isRefreshing = true
  
          api.post('/refresh', {
            refreshToken,
          }).then(response => {
            const { token } = response.data
    
            setCookie(ctx, 'nextauth.token', token, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            })
            setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            })
    
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  
            faileRequestQueue.forEach(request => request.onSuccess(token))
            faileRequestQueue = []
          }).catch(err => {
            faileRequestQueue.forEach(request => request.onFailure(err))
            faileRequestQueue = []
  
            if(process.browser){
              signOut()
            }else{
              return Promise.reject(new AuthTokenError())
            }
          }).finally(() => {
            isRefreshing = false
          })
        }
        return new Promise((resolve, reject) => {
          faileRequestQueue.push({
            onSuccess: (token: string) => {
              if(!originalConfig?.headers){
                return
              }
              originalConfig.headers['Authorization'] = `Bearer ${token}`
              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      }else{
        //deslogar o user
        if(process.browser){
          signOut()
        }
      }
    }
  
    return Promise.reject(error)
  })
  return api
}