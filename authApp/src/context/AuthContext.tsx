import { createContext, ReactNode, useEffect, useState } from "react"
import { setCookie, parseCookies } from 'nookies'
//msm cois de useRouter estou chamnd o router se outra forma
import Router from 'next/router'
import { api } from '../services/api'

//tipagem usuario
type User = {
  email: string
  //permissoes q o user possue
  permissions: string[]
  //são os cargos q o user possue
  roles: string[]
}

//interface diz que preciso de emial e senha
//para autenticar
//se eu tiver outr informação imptt clc
type SignInCredencials = {
  email: string;
  password: string;
}

type AuthContextData = {
  //função que irá receber as credenciais do usuario
  //as credenciais são desse tipo
  signIn(credenciais: SignInCredencials): Promise<void>
  user: User
  //pra saber se esta logado ou n
  isAuthenticated: boolean;
}

//interface do children
type AuthProviderProps = {
  //ReactNode me diz q posso receber qqr coisa
  children: ReactNode
}

/*
  aqui digo q meu contexto vai requere o metoo de logar(signIn)
  e saber se ja esta logado ou n
*/
export const AuthContext = createContext({} as AuthContextData)

/*
  esse é o componente 
  e como children recebe td oq tiver dentro dele
*/
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  //se user esta vazio n ta autenticado
  //se tiver algo esta
  const isAuthenticated = !!user

  //preciso validar checar as info do user
  //pra isso faço o useEffect pra verificar alguma mudança no user
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
      /*
        aqui vou chamar a api para user
        ele vai fazer o login se as informações estiverem corretas
      */
      const response = await api.post('sessions', {
        email,
        password
      })
      const {token, refreshToken, permissions, roles} = response.data

      //pra armazenar o token do user
      //sessionStorage - salva por sessão se fecho o nav perco tudo
      //localStorage - salva e msm fchnd e voltnd tenho td salvo mas n tnh acss no back
      //cookies - faz oq os otrs n
      //vou utilizar uma biblioteca pra user  cookkies yarn add nookies
      //undefined pq ta no lado do browser
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


      //coloco as nfo em um stado
      //vou tentar navagar o user p dashboard
      setUser({
        email,
        permissions,
        roles
      })
      console.log(response.data)
      // api.defaults.headers['Authorization'] = `Bearer ${token}`
      // api.defaults.headers['Authorization'] = `Bearer ${token}`
      
      //navego o user p outra pg
      Router.push('/dashboard')
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


/*
coloco o metodo de signIn dentro do contexto
quando preciso dele em toda a aplicação
se eu precisar apenas dentro da pagian de login
não preciso dentro do context
*/