import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

let cookies = parseCookies()

export const api = axios.create({
  //no meu caso vai ser a rota de user
  //tenho q ver como vai ficar duas rotas no api
  baseURL: 'https://api.github.com/orgs/rocketseat/',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
})

api.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => {
  if(error.response?.status === 401){
    if(error.response.data?.code === 'token.expired'){
      //renovar token
      cookies = parseCookies()

      const { 'nextauth.refreshToken': refreshToken } = cookies

      api
    }else{
      //deslogar o user
    }
  }
})