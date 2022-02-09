import { createContext, ReactNode, useEffect, useState } from "react"
import { setCookie, parseCookies, destroyCookie } from 'nookies'
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
  user: User | undefined
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    //talez eu não tenha um token na app
    if(token){
      api.get('/me').then(response => {
        const { email, permissions, roles } = response.data

        setUser({ email, permissions, roles })
      })
      .catch(() => {
        signOut()
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredencials) {
    try {
      const response = await api.post('sessions', {
        email,
        password
      })

      const {token, refreshToken, permissions, roles} = response.data

      //nome da aplcc nextauth.token
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        //se deixar so / qqr pg vai ter acesso
        path: '/'
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      Router.push('/Dashboard')
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
