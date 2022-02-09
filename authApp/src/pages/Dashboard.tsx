import {Flex, Text} from '@chakra-ui/react'
import {useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import { api } from '../services/api'

export default function Dashboard(){
  const { user } = useContext(AuthContext)

  //user.id
  // useEffect(() => {
  //   api.get(`/users/:${user.email}/projects?trackingSessions=true`).then(response => {
  //     console.log(response.data)
  //   })
  // }, [])

  return(
    <Flex p='5'>
      <Text fontSize='2xl' fontWeight='bold' color='#fff'>
        Dashboard: {user?.email}
      </Text>
    </Flex>
  )
}

//essa pg só deve ser acessado por user com permissions