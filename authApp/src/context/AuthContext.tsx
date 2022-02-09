import { createContext, ReactNode, useEffect, useState } from "react"
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '../services/api'

type User = {
  email: string
  permissions: string[]
  roles: string[]
}

type SignInCredencials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credenciais: SignInCredencials): Promise<void>
  user: User
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  // useEffect(() => {
  //   const { 'nextauth.token': token } = parseCookies()

  //   //talez eu não tenha um token na app
  //   if(token){
  //     //rota users são todos os users
  //     //quero veirificar apenas um
  //     //must do a knd de map p verify only o user q qr acessar
  //     api.get('/users').then(response => {
  //       //talvez n tnh essas info no data
  //       const { email, permissions, roles } = response.data

  //       setUser({ email, permissions, roles })
  //     })
  //   }
  // }, [])

  async function signIn({ email, password }: SignInCredencials) {
    try {
      // const response = await api.post('sessions', {
      //   email,
      //   password
      // })
      console.log({email, password})
      // const {token, refreshToken, permissions, roles} = response.data

      //nome da aplcc nextauth.token
      // setCookie(undefined, 'nextauth.token', token, {
      //   //qnt tmp quero deixar o token salvo
      //   maxAge: 60 * 60 * 24 * 30, //30 days
      //   //quais caminhos da aplicc vai ter acesso a esse cookie
      //   //se deixar so / qqr pg vai ter acesso
      //   //se deixar /pagina so esse pg t acesso
      //   path: '/'
      // })
      // setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
      //   maxAge: 60 * 60 * 24 * 30,
      //   path: '/'
      // })


      // setUser({
      //   email,
      //   permissions,
      //   roles
      // })
      // api.defaults.headers['Authorization'] = `Bearer ${token}`
      // api.defaults.headers['Authorization'] = `Bearer ${token}`
      
      // Router.push('/dashboard')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
