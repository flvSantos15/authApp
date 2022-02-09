import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

let cookies = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.defaults.headers.common['Authorization'] = `Bearer ${cookies['nextauth.token']}`

// api.interceptors.response.use(response => {
//   return response
// }, (error: AxiosError) => {
//   if(error.response?.status === 401){
//     if(error.response.data?.code === 'token.expired'){
//       //renovar token
//       cookies = parseCookies()

//       const { 'nextauth.refreshToken': refreshToken } = cookies

//       api
//     }else{
//       //deslogar o user
//     }
//   }
// })