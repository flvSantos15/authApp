import {Flex, Text} from '@chakra-ui/react'
import {useContext, useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { api } from '../../services/api'

export function Dashboard(){
  //nessa pg preciso receber o usuario
  //pq preciso saber se ele tem permissao e acessar ela
  const { user } = useContext(AuthContext)
  //na 1rst ves não tem nada

  //user.id
  useEffect(() => {
    api.get(`/users/:${user.email}/projects?trackingSessions=true`).then(response => {
      console.log(response.data)
    })
  }, [])

  return(
    <Flex>
      <Text>Dashboard: {user?.email}</Text>
    </Flex>
  )
}

//essa pg só deve ser acessado por user com permissions